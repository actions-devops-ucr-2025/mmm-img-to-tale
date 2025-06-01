export abstract class IStoryGenerator{
  abstract generate(imageUrl: string): Promise<string>;
  abstract getClient(): any;
}
