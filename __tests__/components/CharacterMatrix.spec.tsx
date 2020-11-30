import React from 'react';
import { render } from '@testing-library/react';
import { charactersAPI } from '../../src/api';

import CharacterMatrix from '../../src/components/CharacterMatrix';

jest.mock('../../src/api', () => ({
  charactersAPI: {
    getByPage: jest.fn(() => Promise.resolve()),
  },
}));

describe('CharacterMatrix component', () => {
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

  const charactersAPIMock = charactersAPI as jest.Mocked<typeof charactersAPI>;

  charactersAPIMock.getByPage.mockResolvedValue({
    info: {
      count: 0,
      pages: 0,
      next: 'http://fake-url',
      prev: null,
    },
    results: [],
  });

  it('should render the component correctly', () => {
    const { container } = render(<CharacterMatrix loading={false} />);

    expect(container.querySelector('#character-matrix')).toBeDefined();

    expect(charactersAPIMock.getByPage).toHaveBeenCalledTimes(1);
  });
});
