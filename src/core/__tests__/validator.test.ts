import { describe, it, expect } from 'vitest';
import { validateYouTubeChapters } from '../validator';
import type { YouTubeChapter } from '@/types';

describe('validateYouTubeChapters', () => {
  it('should validate correct chapters', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Main Content', timestamp: '00:01:30' },
      { name: 'Conclusion', timestamp: '00:05:45' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('should error when less than 3 chapters', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Main Content', timestamp: '00:01:30' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'YouTube requires at least 3 chapters. You have 2 chapters.'
    );
  });

  it('should error when first chapter does not start at 00:00:00', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:10' },
      { name: 'Main Content', timestamp: '00:01:30' },
      { name: 'Conclusion', timestamp: '00:05:45' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'First chapter must start at 00:00:00. Your first chapter starts at 00:00:10.'
    );
  });

  it('should error when chapters are not in ascending order', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Main Content', timestamp: '00:05:45' },
      { name: 'Conclusion', timestamp: '00:01:30' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('ascending order');
  });

  it('should error when chapters have same timestamp', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Main Content', timestamp: '00:01:30' },
      { name: 'More Content', timestamp: '00:01:30' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should warn when chapters are less than 10 seconds apart', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Quick Chapter', timestamp: '00:00:05' },
      { name: 'Main Content', timestamp: '00:01:30' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('5 seconds');
  });

  it('should handle empty chapters array', () => {
    const chapters: YouTubeChapter[] = [];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('No chapters found in the file');
  });

  it('should handle single chapter', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Only Chapter', timestamp: '00:00:00' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'YouTube requires at least 3 chapters. You have 1 chapter.'
    );
  });

  it('should validate chapters with proper 10+ second gaps', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Main Content', timestamp: '00:00:10' },
      { name: 'Conclusion', timestamp: '00:00:20' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it('should handle hour-long videos correctly', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:00' },
      { name: 'Main Content', timestamp: '01:15:30' },
      { name: 'Conclusion', timestamp: '02:45:15' },
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should provide multiple errors for multiple violations', () => {
    const chapters: YouTubeChapter[] = [
      { name: 'Introduction', timestamp: '00:00:10' }, // Wrong start
      { name: 'Main Content', timestamp: '00:00:15' }, // Only 1 chapter in array < 3
    ];

    const result = validateYouTubeChapters(chapters);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});
