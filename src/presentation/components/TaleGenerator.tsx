import { useState, useEffect } from 'react'
import styles from './TaleGenerator.module.css'
import generateTale from '../../application/generateTale.js'
import StoryGenerator from '../../domain/StoryGenerator.js'

const storyGenerator = new StoryGenerator()

export default function TaleGenerator() {
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState('')
  const [context, setContext] = useState('')
  const [story, setStory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!imageUrl) {
      setPreview('')
      return
    }
    setPreview(imageUrl)
  }, [imageUrl])

  const handleUrlChange = (e) => {
    const url = e.target.value
    setStory('')
    setImageUrl(url)
  }

  const handleGenerate = async () => {
    if (!imageUrl) {
      setError('Please provide an image URL first')
      return
    }
    setError('')
    setLoading(true)
    setStory('')
    try {
      const result = await generateTale(storyGenerator, imageUrl, context)
      if (!result) {
        setError('Failed to generate tale')
      } else {
        setStory(result)
      }
    } catch (error) {
      setError(`Error generating tale: ${error.message}`)
      console.error('Error generating tale:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!story) return
    try {
      await navigator.clipboard.writeText(story)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Failed to copy tale')
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={handleUrlChange}
        className={styles.textarea}
      />
      {preview && <img src={preview} alt="Preview" className={styles.preview} />}
      <textarea
        placeholder="Tale Context"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleGenerate} className={styles.button}>
        {loading ? 'Generating...' : 'Generate Tale'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {story && (
        <div className={styles.outputWrapper}>
          <textarea
            readOnly
            value={story}
            className={styles.story}
          />
          <button onClick={handleCopy} className={styles.copyButton}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}
