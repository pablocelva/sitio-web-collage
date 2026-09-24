import { describe, it, expect } from 'vitest';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

describe('Cloudinary Helper Utility', () => {
  it('returns default fallback placeholder when image path is empty', () => {
    expect(getOptimizedImageUrl('')).toBe('/placeholder-collage-1.webp');
  });

  it('returns local relative paths as-is', () => {
    expect(getOptimizedImageUrl('/placeholder-collage-2.svg')).toBe('/placeholder-collage-2.svg');
  });

  it('returns data URIs as-is', () => {
    const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    expect(getOptimizedImageUrl(dataUri)).toBe(dataUri);
  });

  it('returns standard non-Cloudinary HTTP URLs as-is', () => {
    const url = 'https://example.com/image.jpg';
    expect(getOptimizedImageUrl(url)).toBe(url);
  });

  it('constructs Cloudinary URL from public_id with transformations', () => {
    const result = getOptimizedImageUrl('artwork-1', {
      width: 400,
      height: 500,
      crop: 'fill',
    });
    expect(result).toContain('https://res.cloudinary.com/');
    expect(result).toContain('f_auto,q_auto,w_400,h_500,c_fill');
    expect(result).toContain('/artwork-1');
  });

  it('applies transformations to existing Cloudinary URL', () => {
    const existing = 'https://res.cloudinary.com/demo/image/upload/v123456/artwork-2.jpg';
    const result = getOptimizedImageUrl(existing, { width: 300 });
    expect(result).toContain('/upload/f_auto,q_auto,w_300,c_fill/');
  });

  it('returns un-transformable Cloudinary URL gracefully if missing upload segment', () => {
    const malformed = 'https://res.cloudinary.com/demo/no-upload-path/artwork.jpg';
    expect(getOptimizedImageUrl(malformed, { width: 200 })).toBe(malformed);
  });
});

