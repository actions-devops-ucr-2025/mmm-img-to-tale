import {IStoryGenerator} from '../domain/IStoryGenerator'

export default async function generateTale(
  storyGenerator: IStoryGenerator,
  image: string
): Promise<string> {
  if (!storyGenerator) throw new Error('StoryGenerator is required')
  return storyGenerator.generate(image)
}
