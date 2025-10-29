/**
 * Represents a chapter marker from Adobe Premiere Pro
 */
export interface Marker {
  name: string;
  inTimestamp: string; // HH:MM:SS:FF format from Premiere
  description?: string;
}

/**
 * Represents a YouTube-formatted chapter
 */
export interface YouTubeChapter {
  name: string;
  timestamp: string; // HH:MM:SS format for YouTube
}

/**
 * Result of validating chapters against YouTube requirements
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Application state
 */
export interface AppState {
  file: File | null;
  markers: Marker[];
  chapters: YouTubeChapter[];
  validation: ValidationResult | null;
  isProcessing: boolean;
  error: string | null;
}
