export abstract class ICaptionGenerator{
  // eslint-disable-next-line no-unused-vars
  abstract generate(imageUrl: string): Promise<string>;
  abstract getClient(): any;
}
