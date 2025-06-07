import generateTale from '../generateTale';
import { ICaptionGenerator } from '../../domain/ICaptionGenerator';
import { ITaleGenerator } from '../../domain/ITaleGenerator';

class MockCaption implements ICaptionGenerator {
  async generate(_image: string): Promise<string> {
    return 'caption';
  }
  getClient() { return {}; }
}

class MockTale implements ITaleGenerator {
  async generate(caption: string, context: string): Promise<string> {
    return `tale:${caption}:${context}`;
  }
  getClient() { return {}; }
}

describe('generateTale', () => {
  test('uses provided services to generate tale', async () => {
    const result = await generateTale('img', 'ctx', new MockCaption(), new MockTale());
    expect(result).toBe('tale:caption:ctx');
  });
});
