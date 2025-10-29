/**
 * Copies text to clipboard using the Clipboard API
 * Note: Requires HTTPS or localhost for security reasons
 *
 * @param text - Text to copy to clipboard
 * @returns Promise that resolves when text is copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  // Check if Clipboard API is available
  if (!navigator.clipboard) {
    throw new Error(
      'Clipboard API not available. Please use HTTPS or localhost.'
    );
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw new Error(
      `Failed to copy to clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Checks if the Clipboard API is available
 *
 * @returns True if clipboard operations are supported
 */
export function isClipboardAvailable(): boolean {
  return !!navigator.clipboard;
}
