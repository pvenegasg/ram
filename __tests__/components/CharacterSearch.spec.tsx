import React from 'react';
import CharacterSearch from '../../src/components/CharacterSearch';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.useFakeTimers();

describe('CharacterSearch', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const onSearchFn = jest.fn();

  it('should render correctly', async () => {
    const { container, rerender } = render(
      <CharacterSearch loading={false} onSearch={onSearchFn} />
    );

    expect(container.querySelector('#character-search')).toBeDefined();
    expect(screen.getByText('Search')).toBeDefined();

    rerender(<CharacterSearch loading={true} onSearch={onSearchFn} />);

    expect(screen.getByText('...')).toBeDefined();
  });

  it('should handle the click', async () => {
    const { rerender } = render(
      <CharacterSearch loading={false} onSearch={onSearchFn} />
    );

    fireEvent.click(screen.getByText('Search'));

    rerender(<CharacterSearch loading={true} onSearch={onSearchFn} />);

    expect(screen.getByText('...')).toBeDefined();

    await waitFor(() => {
      jest.runAllTimers();

      expect(onSearchFn).toHaveBeenCalledTimes(2);
    });
  });
});
