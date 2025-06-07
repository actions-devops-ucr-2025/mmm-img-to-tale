import { useState, useEffect } from 'react'
import styles from './TaleGenerator.module.css'
import generateTale from '../../application/generateTale.js'

function isValidUrl(value: string) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

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

  const handleUrlChange = (e: any) => {
    const url = e.target.value
    setStory('')
    setImageUrl(url)
    if (url && !isValidUrl(url)) {
      setError('Please provide a valid URL')
    } else {
      setError('')
    }
  }

  const handleContextChange = (e: any) => {
    const value = e.target.value
    const words = value.trim().split(/\s+/)
    if (words.filter(Boolean).length > 100) {
      setContext(words.slice(0, 100).join(' '))
      setError('Context cannot exceed 100 words')
    } else {
      setError('')
      setContext(value)
    }
  }

  const handleGenerate = async () => {
    if (!imageUrl || !isValidUrl(imageUrl)) {
      setError('Please provide a valid image URL first')
      return
    }
    if (context.trim().split(/\s+/).filter(Boolean).length > 100) {
      setError('Context cannot exceed 100 words')
      return
    }
    setError('')
    setLoading(true)
    setStory('')
    try {
      const result = await generateTale(imageUrl, context)
      if (!result) {
        setError('Failed to generate tale')
      } else {
        setStory(result)
      }
    } catch (error: any) {
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
        className={styles.input}
      />
      {preview && <img src={preview} alt="Preview" className={styles.preview} />}
      <textarea
        placeholder="Tale Context"
        value={context}
        onChange={handleContextChange}
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
