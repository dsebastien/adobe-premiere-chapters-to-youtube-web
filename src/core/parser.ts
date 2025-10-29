import type { Marker } from '@/types';

/**
 * Parses Adobe Premiere Pro marker file content
 * Expected format: Tab-separated values with header row
 * Columns: Name, Description, In, Out, Duration, Marker Type, Comment
 *
 * @param content - UTF-16LE encoded file content
 * @returns Array of parsed markers
 */
export function parseMarkerFile(content: string): Marker[] {
  const lines = content.split('\n');

  // Skip header row (first line contains column names)
  const contentLines = lines.slice(1);

  const markers: Marker[] = [];

  for (const line of contentLines) {
    // Skip empty lines
    if (!line.trim()) {
      continue;
    }

    // Adobe Premiere uses tab-separated values
    const columns = line.split('\t');

    // Extract marker name (column 0) and In timecode (column 2)
    const name = columns[0]?.trim() || '';
    const inTimestamp = columns[2]?.trim() || '';

    // Only add markers that have both name and timestamp
    if (name && inTimestamp) {
      markers.push({
        name,
        inTimestamp,
        description: columns[1]?.trim() || undefined,
      });
    }
  }

  return markers;
}
