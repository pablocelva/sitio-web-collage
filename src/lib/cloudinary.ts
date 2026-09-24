/**
 * Cloudinary Helper & Utility for optimized responsive images.
 */

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
}

export function getOptimizedImageUrl(
  imagePath: string,
  options: CloudinaryOptions = {}
): string {
  if (!imagePath) {
    return '/placeholder-collage-1.webp';
  }

  // If it's a local static asset or SVG data URI, return as-is
  if (imagePath.startsWith('/') || imagePath.startsWith('data:') || imagePath.startsWith('blob:')) {
    return imagePath;
  }

  const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

  // If it's already a full Cloudinary URL
  if (imagePath.includes('res.cloudinary.com')) {
    return applyCloudinaryTransformations(imagePath, options);
  }

  // If it's a standard HTTP URL from another origin, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Otherwise, construct Cloudinary URL from public_id
  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;
  const transformations: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  const transformString = transformations.join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${imagePath}`;
}

function applyCloudinaryTransformations(url: string, options: CloudinaryOptions): string {
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;
  const transformations: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  const transformString = transformations.join(',');
  return `${parts[0]}/upload/${transformString}/${parts[1]}`;
}

