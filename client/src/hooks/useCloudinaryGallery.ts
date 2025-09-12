import { useQuery } from '@tanstack/react-query';
import type { CloudinaryImage } from '@/types/gallery';

const fetchGalleryByFolder = async (folderName: string): Promise<CloudinaryImage[]> => {
  const response = await fetch(`/api/gallery/${folderName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch gallery from folder: ${folderName}`);
  }
  const data = await response.json();
  // The backend might return an object with an 'images' property or the array directly
  return data.images || data;
};

export const useCloudinaryGallery = (folderName: string | null) => {
  return useQuery<CloudinaryImage[], Error>({
    queryKey: ['cloudinaryGallery', folderName],
    queryFn: () => {
      if (!folderName) {
        return Promise.resolve([]); // Return empty array if no folder is specified
      }
      return fetchGalleryByFolder(folderName);
    },
    enabled: !!folderName, // Only run the query if a folderName is provided
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};
