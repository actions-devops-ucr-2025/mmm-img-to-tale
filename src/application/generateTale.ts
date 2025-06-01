import StoryGenerator from '../domain/StoryGenerator'

export default async function generateTale(
  storyGenerator: StoryGenerator,
  image: string,
  context: string
): Promise<string> {
  if (!storyGenerator) throw new Error('StoryGenerator is required')
  return storyGenerator.generate(image, context)
}
