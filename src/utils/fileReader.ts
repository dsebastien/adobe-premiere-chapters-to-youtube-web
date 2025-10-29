/**
 * Reads a file as UTF-16LE encoded text
 * Adobe Premiere Pro exports marker files in UTF-16 Little Endian encoding
 *
 * @param file - File object from input or drag-and-drop
 * @returns Promise resolving to file content as string
 */
export function readFileAsUTF16LE(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    // Read as UTF-16LE (Adobe Premiere's default encoding)
    reader.readAsText(file, 'utf-16le');
  });
}

/**
 * Validates that a file is likely a text file based on extension
 *
 * @param file - File object to validate
 * @returns True if file appears to be a text file
 */
export function isValidTextFile(file: File): boolean {
  const validExtensions = ['.txt', '.tsv', '.csv'];
  return validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
}
