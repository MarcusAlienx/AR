import { CloudinaryImage } from '@/types/gallery';

export const fetchImagesByFolder = async (slug: string): Promise<CloudinaryImage[]> => {
  const response = await fetch(`/api/gallery/${slug}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
