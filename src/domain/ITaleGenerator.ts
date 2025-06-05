export abstract class ITaleGenerator {
  // eslint-disable-next-line no-unused-vars
  abstract generate(caption: string, context: string): Promise<string>;
  abstract getClient(): any;
}