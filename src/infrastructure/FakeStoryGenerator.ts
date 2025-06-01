import StoryGenerator from '../domain/StoryGenerator.js'

export default class FakeStoryGenerator extends StoryGenerator {
  async generate(image, context) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Once upon a time, an image inspired a tale. ${context}`.trim())
      }, 1500)
    })
  }
}
