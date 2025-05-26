import { useState, useEffect } from 'react'
import styles from './TaleGenerator.module.css'

// fake async function to simulate backend call
export const fakeGenerateStory = (image, context) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Once upon a time, an image inspired a tale. ${context}`.trim())
    }, 1500)
  })

export default function TaleGenerator() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [context, setContext] = useState('')
  const [story, setStory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0]
    setStory('')
    if (!selected) return
    if (!['image/jpeg', 'image/png'].includes(selected.type)) {
      setError('Only JPG and PNG files are allowed')
      e.target.value = ''
      return
    }
    setError('')
    setFile(selected)
  }

  const handleGenerate = async () => {
    if (!file) {
      setError('Please upload an image first')
      return
    }
    setError('')
    setLoading(true)
    setStory('')
    try {
      const result = await fakeGenerateStory(file, context)
      if (!result) {
        setError('Failed to generate tale')
      } else {
        setStory(result)
      }
    } catch {
      setError('An unexpected error occurred')
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
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
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
