import StoryGenerator from '../domain/IStoryGenerator'

export default async function generateTale(
  storyGenerator: StoryGenerator,
  image: string
): Promise<string> {
  if (!storyGenerator) throw new Error('StoryGenerator is required')
  return storyGenerator.generate(image)
}
