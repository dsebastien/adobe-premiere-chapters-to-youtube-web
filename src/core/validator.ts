import type { YouTubeChapter, ValidationResult } from '@/types';

/**
 * Converts timestamp string (HH:MM:SS) to total seconds
 *
 * @param timestamp - Time in format HH:MM:SS
 * @returns Total seconds
 */
function timestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(':').map((part) => parseInt(part, 10));
  if (parts.length !== 3) {
    return 0;
  }
  const [hours, minutes, seconds] = parts;
  return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
}

/**
 * Validates YouTube chapters against platform requirements:
 * - First chapter must start at 00:00:00
 * - Minimum 3 chapters required
 * - Each chapter must be at least 10 seconds long
 * - Timestamps must be in ascending order
 *
 * @param chapters - Array of YouTube chapters to validate
 * @returns Validation result with errors and warnings
 */
export function validateYouTubeChapters(
  chapters: YouTubeChapter[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check minimum number of chapters
  if (chapters.length === 0) {
    errors.push('No chapters found in the file');
    return { valid: false, errors, warnings };
  }

  if (chapters.length < 3) {
    errors.push(
      `YouTube requires at least 3 chapters. You have ${chapters.length} chapter${chapters.length === 1 ? '' : 's'}.`
    );
  }

  // Check first chapter starts at 00:00:00
  const firstTimestamp = chapters[0]?.timestamp;
  if (firstTimestamp !== '00:00:00') {
    errors.push(
      `First chapter must start at 00:00:00. Your first chapter starts at ${firstTimestamp}.`
    );
  }

  // Validate timestamps are in ascending order and have minimum 10 second gaps
  for (let i = 0; i < chapters.length - 1; i++) {
    const currentChapter = chapters[i];
    const nextChapter = chapters[i + 1];

    if (!currentChapter || !nextChapter) {
      continue;
    }

    const currentSeconds = timestampToSeconds(currentChapter.timestamp);
    const nextSeconds = timestampToSeconds(nextChapter.timestamp);

    // Check ascending order
    if (nextSeconds <= currentSeconds) {
      errors.push(
        `Chapters must be in ascending order. "${currentChapter.name}" (${currentChapter.timestamp}) comes after or at the same time as "${nextChapter.name}" (${nextChapter.timestamp}).`
      );
    }

    // Check minimum 10 second gap
    const gap = nextSeconds - currentSeconds;
    if (gap < 10) {
      warnings.push(
        `Chapter "${currentChapter.name}" is only ${gap} seconds long. YouTube requires chapters to be at least 10 seconds.`
      );
    }
  }

  const valid = errors.length === 0;

  return { valid, errors, warnings };
}
