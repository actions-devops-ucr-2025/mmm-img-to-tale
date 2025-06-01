import { describe, it, expect, vi } from 'vitest'
import generateTale from '../src/application/generateTale'

describe('generateTale', () => {
  it('throws an error when storyGenerator is missing', async () => {
    await expect(generateTale()).rejects.toThrow('StoryGenerator is required')
  })

  it('calls storyGenerator.generate and returns its result', async () => {
    const mockGenerator = { generate: vi.fn().mockResolvedValue('my tale') }
    const result = await generateTale(mockGenerator, 'image', 'context')
    expect(mockGenerator.generate).toHaveBeenCalledWith('image', 'context')
    expect(result).toBe('my tale')
  })
})
