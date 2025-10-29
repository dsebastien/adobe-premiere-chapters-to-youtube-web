import { describe, it, expect } from 'vitest';
import { convertToYouTubeFormat, formatChaptersAsText } from '../converter';
import type { Marker } from '@/types';

describe('convertToYouTubeFormat', () => {
  it('should convert Premiere markers to YouTube format', () => {
    const markers: Marker[] = [
      { name: 'Introduction', inTimestamp: '00:00:00:00' },
      { name: 'Main Content', inTimestamp: '00:01:30:15' },
      { name: 'Conclusion', inTimestamp: '00:05:45:22' },
    ];

    const result = convertToYouTubeFormat(markers);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      name: 'Introduction',
      timestamp: '00:00:00',
    });
    expect(result[1]).toEqual({
      name: 'Main Content',
      timestamp: '00:01:30',
    });
    expect(result[2]).toEqual({
      name: 'Conclusion',
      timestamp: '00:05:45',
    });
  });

  it('should strip frame information from timestamps', () => {
    const markers: Marker[] = [
      { name: 'Chapter 1', inTimestamp: '00:00:00:29' },
      { name: 'Chapter 2', inTimestamp: '01:23:45:15' },
    ];

    const result = convertToYouTubeFormat(markers);

    expect(result[0]?.timestamp).toBe('00:00:00');
    expect(result[1]?.timestamp).toBe('01:23:45');
  });

  it('should handle empty marker array', () => {
    const markers: Marker[] = [];

    const result = convertToYouTubeFormat(markers);

    expect(result).toHaveLength(0);
  });

  it('should preserve marker names exactly', () => {
    const markers: Marker[] = [
      { name: 'Chapter with Special Chars: @#$', inTimestamp: '00:00:00:00' },
      { name: '第一章 - Japanese Chapter', inTimestamp: '00:01:00:00' },
    ];

    const result = convertToYouTubeFormat(markers);

    expect(result[0]?.name).toBe('Chapter with Special Chars: @#$');
    expect(result[1]?.name).toBe('第一章 - Japanese Chapter');
  });

  it('should handle timestamps without frame info', () => {
    const markers: Marker[] = [{ name: 'Chapter 1', inTimestamp: '00:00:00' }];

    const result = convertToYouTubeFormat(markers);

    expect(result[0]?.timestamp).toBe('00:00:00');
  });
});

describe('formatChaptersAsText', () => {
  it('should format chapters as YouTube description text', () => {
    const chapters = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Main Content', timestamp: '00:01:30' },
      { name: 'Conclusion', timestamp: '00:05:45' },
    ];

    const result = formatChaptersAsText(chapters);

    expect(result).toBe(
      'Introduction 00:00:00\nMain Content 00:01:30\nConclusion 00:05:45'
    );
  });

  it('should handle single chapter', () => {
    const chapters = [{ name: 'Only Chapter', timestamp: '00:00:00' }];

    const result = formatChaptersAsText(chapters);

    expect(result).toBe('Only Chapter 00:00:00');
  });

  it('should handle empty array', () => {
    const chapters: Array<{ name: string; timestamp: string }> = [];

    const result = formatChaptersAsText(chapters);

    expect(result).toBe('');
  });

  it('should preserve chapter name formatting', () => {
    const chapters = [
      { name: 'Chapter: Special (Part 1)', timestamp: '00:00:00' },
    ];

    const result = formatChaptersAsText(chapters);

    expect(result).toBe('Chapter: Special (Part 1) 00:00:00');
  });
});
