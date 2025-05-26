import { fakeGenerateStory } from '../TaleGenerator.jsx';

jest.useFakeTimers();

test('fakeGenerateStory resolves with context appended', async () => {
  const promise = fakeGenerateStory('image', 'context');
  jest.advanceTimersByTime(1500);
  await expect(promise).resolves.toBe('Once upon a time, an image inspired a tale. context');
});
