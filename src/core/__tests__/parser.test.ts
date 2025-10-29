import { describe, it, expect } from 'vitest';
import { parseMarkerFile } from '../parser';

describe('parseMarkerFile', () => {
  it('should parse valid marker file with multiple chapters', () => {
    const input = `Name\tDescription\tIn\tOut\tDuration\tMarker Type\tComment
Introduction\t\t00:00:00:00\t00:00:00:00\t00:00:00:00\tChapter\t
Main Content\t\t00:01:30:15\t00:01:30:15\t00:00:00:00\tChapter\t
Conclusion\t\t00:05:45:00\t00:05:45:00\t00:00:00:00\tChapter\t`;

    const result = parseMarkerFile(input);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      name: 'Introduction',
      inTimestamp: '00:00:00:00',
      description: undefined,
    });
    expect(result[1]).toEqual({
      name: 'Main Content',
      inTimestamp: '00:01:30:15',
      description: undefined,
    });
    expect(result[2]).toEqual({
      name: 'Conclusion',
      inTimestamp: '00:05:45:00',
      description: undefined,
    });
  });

  it('should handle markers with descriptions', () => {
    const input = `Name\tDescription\tIn\tOut\tDuration\tMarker Type\tComment
Chapter 1\tIntro section\t00:00:00:00\t00:00:00:00\t00:00:00:00\tChapter\t`;

    const result = parseMarkerFile(input);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      name: 'Chapter 1',
      inTimestamp: '00:00:00:00',
      description: 'Intro section',
    });
  });

  it('should skip empty lines', () => {
    const input = `Name\tDescription\tIn\tOut\tDuration\tMarker Type\tComment
Chapter 1\t\t00:00:00:00\t00:00:00:00\t00:00:00:00\tChapter\t

Chapter 2\t\t00:01:00:00\t00:01:00:00\t00:00:00:00\tChapter\t`;

    const result = parseMarkerFile(input);

    expect(result).toHaveLength(2);
  });

  it('should handle file with only header', () => {
    const input = `Name\tDescription\tIn\tOut\tDuration\tMarker Type\tComment`;

    const result = parseMarkerFile(input);

    expect(result).toHaveLength(0);
  });

  it('should skip lines with missing name or timestamp', () => {
    const input = `Name\tDescription\tIn\tOut\tDuration\tMarker Type\tComment
\t\t00:00:00:00\t00:00:00:00\t00:00:00:00\tChapter\t
Valid Chapter\t\t00:01:00:00\t00:01:00:00\t00:00:00:00\tChapter\t
Another Chapter\t\t\t00:02:00:00\t00:00:00:00\tChapter\t`;

    const result = parseMarkerFile(input);

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Valid Chapter');
  });

  it('should trim whitespace from names and timestamps', () => {
    const input = `Name\tDescription\tIn\tOut\tDuration\tMarker Type\tComment
  Spaced Chapter  \t\t  00:00:00:00  \t00:00:00:00\t00:00:00:00\tChapter\t`;

    const result = parseMarkerFile(input);

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Spaced Chapter');
    expect(result[0]?.inTimestamp).toBe('00:00:00:00');
  });

  it('should handle empty file', () => {
    const input = '';

    const result = parseMarkerFile(input);

    expect(result).toHaveLength(0);
  });

  it('should handle malformed data gracefully', () => {
    const input = `Name\tDescription\tIn\tOut\tDuration\tMarker Type\tComment
Chapter 1
InvalidLine
Chapter 2\t\t00:01:00:00\t00:01:00:00\t00:00:00:00\tChapter\t`;

    const result = parseMarkerFile(input);

    // Should only parse the valid line
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Chapter 2');
  });
});
