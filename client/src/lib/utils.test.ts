import { describe, it, expect } from 'vitest';
import { formatSlug } from './utils';

describe('formatSlug', () => {
  it('should format a simple slug correctly', () => {
    expect(formatSlug('hello-world')).toBe('Hello World');
  });

  it('should handle an empty string', () => {
    expect(formatSlug('')).toBe('');
  });

  it('should handle a slug with no hyphens', () => {
    expect(formatSlug('helloworld')).toBe('Helloworld');
  });

  it('should handle multiple hyphens', () => {
    expect(formatSlug('a-b-c')).toBe('A B C');
  });

  it('should handle slugs with numbers', () => {
    expect(formatSlug('collection-2024')).toBe('Collection 2024');
  });
});
