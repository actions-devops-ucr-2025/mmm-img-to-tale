export abstract class IStoryGenerator{
  abstract generate(imageUrl: string, context: string): Promise<string>;
  abstract getClient(): any;
}
