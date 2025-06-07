import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaleGenerator from '../TaleGenerator';
import { vi, describe, beforeEach, test, expect } from 'vitest';

// Use vi.mock instead of jest.mock
vi.mock('../../../application/generateTale.js', () => ({
  default: vi.fn()
}));

// Import after mocking
import generateTale from '../../../application/generateTale.js';

// Use Vitest's typing for mocked function
const mockedGenerateTale = generateTale as ReturnType<typeof vi.fn>;

describe('TaleGenerator component', () => {
  beforeEach(() => {
    mockedGenerateTale.mockReset();
  });

  test('shows error for invalid URL', () => {
    render(<TaleGenerator />);
    const urlInput = screen.getByPlaceholderText('Image URL');
    fireEvent.change(urlInput, { target: { value: 'invalid-url' } });
    expect(screen.getByText('Please provide a valid URL')).toBeInTheDocument();
  });

  test('calls generateTale and displays story', async () => {
    mockedGenerateTale.mockResolvedValue('A great story');
    render(<TaleGenerator />);
    fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: 'http://example.com/img.jpg' } });
    fireEvent.change(screen.getByPlaceholderText('Tale Context'), { target: { value: 'Once upon a time' } });
    fireEvent.click(screen.getByText('Generate Tale'));
    await waitFor(() =>
      expect(mockedGenerateTale).toHaveBeenCalledWith('http://example.com/img.jpg', 'Once upon a time')
    );
    expect(screen.getByDisplayValue('A great story')).toBeInTheDocument();
  });
});
