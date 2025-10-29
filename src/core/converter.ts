import type { Marker, YouTubeChapter } from '@/types';

/**
 * Converts Adobe Premiere timecode (HH:MM:SS:FF) to YouTube format
 * Removes the frame information and formats as MM:SS or HH:MM:SS
 * YouTube format uses MM:SS for videos under 1 hour, HH:MM:SS for videos 1 hour or longer
 *
 * @param premiereTimecode - Timecode in format HH:MM:SS:FF
 * @returns Timecode in format MM:SS or HH:MM:SS
 */
function convertTimecode(premiereTimecode: string): string {
  // Extract HH:MM:SS portion using regex
  const timeMatch = premiereTimecode.match(/(\d{2}):(\d{2}):(\d{2})/);

  if (!timeMatch) {
    return premiereTimecode;
  }

  const hours = timeMatch[1];
  const minutes = timeMatch[2];
  const seconds = timeMatch[3];

  // If hours is 00, return MM:SS format
  if (hours === '00') {
    return `${minutes}:${seconds}`;
  }

  // Otherwise return HH:MM:SS format
  return `${hours}:${minutes}:${seconds}`;
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
 * Format: "MM:SS Chapter Name" or "HH:MM:SS Chapter Name"
 *
 * @param chapters - Array of YouTube chapters
 * @returns Formatted text ready for YouTube description
 */
export function formatChaptersAsText(chapters: YouTubeChapter[]): string {
  return chapters
    .map((chapter) => `${chapter.timestamp} ${chapter.name}`)
    .join('\n');
}
