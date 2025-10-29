import { describe, it, expect } from 'vitest';
import { parseMarkerFile } from '../parser';
import { convertToYouTubeFormat, formatChaptersAsText } from '../converter';
import { validateYouTubeChapters } from '../validator';
import * as fs from 'fs';
import * as path from 'path';

describe('Integration Tests', () => {
  it('should process real Adobe Premiere marker file correctly', () => {
    // Read the example input file
    const exampleFilePath = path.join(
      __dirname,
      '../../../example-input/example-input.csv'
    );
    const fileContent = fs.readFileSync(exampleFilePath, 'utf16le');

    // Parse the markers
    const markers = parseMarkerFile(fileContent);

    // Should have 144 chapters (last line in file is empty)
    expect(markers.length).toBe(144);

    // Convert to YouTube format
    const chapters = convertToYouTubeFormat(markers);

    // Validate the chapters
    const validation = validateYouTubeChapters(chapters);
    expect(validation.valid).toBe(true);
    expect(validation.warnings).toHaveLength(0);

    // Format as text
    const output = formatChaptersAsText(chapters);

    // Verify first chapter starts at 00:00
    expect(output).toMatch(/^00:00 Why Obsidian/);

    // Verify timestamps under 1 hour use MM:SS format
    expect(output).toContain('07:20 Obsidian Vaults');
    expect(output).toContain('08:09 Knowledge Management features');
    expect(output).toContain('59:04 Base formulas');

    // Verify timestamps 1 hour or longer use HH:MM:SS format
    expect(output).toContain('01:00:26 Card Views in Bases');
    expect(output).toContain(
      '01:01:06 Showing/Hiding information in the Cards view'
    );
    expect(output).toContain('02:21:05 Obsidian Starter Kit Systems');
    expect(output).toContain(
      '02:21:40 Obsidian Starter Kit Automated Note Filing'
    );

    // Verify format is "Timestamp Name" not "Name Timestamp"
    const lines = output.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      // Each line should start with a timestamp (digits and colons)
      expect(line).toMatch(/^\d{1,2}:\d{2}/);
    }

    // Verify we have all 144 chapters in output
    expect(lines.filter((l) => l.trim()).length).toBe(144);
  });

  it('should handle timestamps crossing 1 hour boundary', () => {
    // Test chapters before, at, and after 1 hour mark
    const testMarkers = [
      { name: 'Chapter 1', inTimestamp: '00:59:59:00' }, // Last second before 1 hour
      { name: 'Chapter 2', inTimestamp: '01:00:00:00' }, // Exactly 1 hour
      { name: 'Chapter 3', inTimestamp: '01:00:01:00' }, // First second after 1 hour
    ];

    const chapters = convertToYouTubeFormat(testMarkers);
    const output = formatChaptersAsText(chapters);

    expect(output).toBe(
      '59:59 Chapter 1\n01:00:00 Chapter 2\n01:00:01 Chapter 3'
    );
  });
});
