import type { Marker, YouTubeChapter } from '@/types';

/**
 * Converts Adobe Premiere timecode (HH:MM:SS:FF) to YouTube format (HH:MM:SS)
 * Removes the frame information (last segment after final colon)
 *
 * @param premiereTimecode - Timecode in format HH:MM:SS:FF
 * @returns Timecode in format HH:MM:SS
 */
function convertTimecode(premiereTimecode: string): string {
  // Extract HH:MM:SS portion using regex
  const timeMatch = premiereTimecode.match(/\d{2}:\d{2}:\d{2}/);
  return timeMatch ? timeMatch[0] : premiereTimecode;
}

/**
 * Converts array of Premiere markers to YouTube chapter format
 *
 * @param markers - Array of parsed Premiere markers
 * @returns Array of YouTube-formatted chapters
 */
export function convertToYouTubeFormat(markers: Marker[]): YouTubeChapter[] {
  return markers.map((marker) => ({
    name: marker.name,
    timestamp: convertTimecode(marker.inTimestamp),
  }));
}

/**
 * Formats YouTube chapters as text string
 * Format: "Chapter Name HH:MM:SS"
 *
 * @param chapters - Array of YouTube chapters
 * @returns Formatted text ready for YouTube description
 */
export function formatChaptersAsText(chapters: YouTubeChapter[]): string {
  return chapters
    .map((chapter) => `${chapter.name} ${chapter.timestamp}`)
    .join('\n');
}
