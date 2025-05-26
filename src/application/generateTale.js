export default async function generateTale(storyGenerator, image, context) {
  if (!storyGenerator) throw new Error('StoryGenerator is required')
  return storyGenerator.generate(image, context)
}
