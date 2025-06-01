import { describe, it, expect, vi } from 'vitest'
import FakeStoryGenerator from '../src/infrastructure/FakeStoryGenerator'

describe('FakeStoryGenerator', () => {
  it('generates a tale using the provided context', async () => {
    vi.useFakeTimers()
    const generator = new FakeStoryGenerator()
    const promise = generator.generate('img', 'context')
    vi.runAllTimers()
    const result = await promise
    expect(result).toBe('Once upon a time, an image inspired a tale. context')
  })
})
