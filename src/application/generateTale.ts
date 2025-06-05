import {ICaptionGenerator} from '../domain/ICaptionGenerator'
import { ITaleGenerator } from '../domain/ITaleGenerator'
import CaptionGenerator from '../infrastructure/CaptionGenerator'
import { TaleGenerator } from '../infrastructure/TaleGenerator'

export default async function generateTale(
  image: string,
  context: string,
  captionGenerator: ICaptionGenerator = new CaptionGenerator(),
  taleGenerator: ITaleGenerator = new TaleGenerator()
): Promise<string> {
  if (!captionGenerator) throw new Error('captionGenerator is required')
  if (!image) throw new Error('image is required')
  if (!context) throw new Error('context is required')
  const caption = await captionGenerator.generate(image)
  const tale = await taleGenerator.generate(caption, context)
  return tale;
}
