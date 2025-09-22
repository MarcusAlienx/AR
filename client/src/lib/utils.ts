import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper para formatear el slug para títulos (ej. 'fashion-week' -> 'Fashion Week')
export const formatSlug = (slug: string = '') => {
  if (!slug) return '';
  return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};
