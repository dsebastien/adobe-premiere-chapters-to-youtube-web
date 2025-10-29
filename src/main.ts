import './styles.css';
import { parseMarkerFile } from '@/core/parser';
import { convertToYouTubeFormat, formatChaptersAsText } from '@/core/converter';
import { validateYouTubeChapters } from '@/core/validator';
import { readFileAsUTF16LE, isValidTextFile } from '@/utils/fileReader';
import { copyToClipboard, isClipboardAvailable } from '@/utils/clipboard';
import type { AppState } from '@/types';

// Application state
const state: AppState = {
  file: null,
  markers: [],
  chapters: [],
  validation: null,
  isProcessing: false,
  error: null,
};

// DOM Elements
const elements = {
  dropzone: document.getElementById('dropzone') as HTMLDivElement,
  fileInput: document.getElementById('file-input') as HTMLInputElement,
  browseButton: document.getElementById('browse-button') as HTMLButtonElement,
  uploadContent: document.getElementById('upload-content') as HTMLDivElement,
  loadingState: document.getElementById('loading-state') as HTMLDivElement,
  errorContainer: document.getElementById('error-container') as HTMLDivElement,
  errorMessage: document.getElementById(
    'error-message'
  ) as HTMLParagraphElement,
  warningContainer: document.getElementById(
    'warning-container'
  ) as HTMLDivElement,
  warningList: document.getElementById('warning-list') as HTMLUListElement,
  previewSection: document.getElementById('preview-section') as HTMLElement,
  previewOutput: document.getElementById('preview-output') as HTMLPreElement,
  copyButton: document.getElementById('copy-button') as HTMLButtonElement,
  downloadButton: document.getElementById(
    'download-button'
  ) as HTMLButtonElement,
  resetButton: document.getElementById('reset-button') as HTMLButtonElement,
};

/**
 * Shows error message to user
 */
function showError(message: string): void {
  state.error = message;
  elements.errorMessage.textContent = message;
  elements.errorContainer.classList.remove('hidden');
}

/**
 * Hides error message
 */
function hideError(): void {
  state.error = null;
  elements.errorContainer.classList.add('hidden');
}

/**
 * Shows validation warnings
 */
function showWarnings(warnings: string[]): void {
  elements.warningList.innerHTML = warnings
    .map((warning) => `<li>${warning}</li>`)
    .join('');
  elements.warningContainer.classList.remove('hidden');
}

/**
 * Hides validation warnings
 */
function hideWarnings(): void {
  elements.warningContainer.classList.add('hidden');
}

/**
 * Shows loading state
 */
function showLoading(): void {
  state.isProcessing = true;
  elements.uploadContent.classList.add('hidden');
  elements.loadingState.classList.remove('hidden');
}

/**
 * Hides loading state
 */
function hideLoading(): void {
  state.isProcessing = false;
  elements.loadingState.classList.add('hidden');
  elements.uploadContent.classList.remove('hidden');
}

/**
 * Shows preview section with converted chapters
 */
function showPreview(text: string): void {
  elements.previewOutput.textContent = text;
  elements.previewSection.classList.remove('hidden');

  // Disable copy button if clipboard not available
  if (!isClipboardAvailable()) {
    elements.copyButton.disabled = true;
    elements.copyButton.title = 'Clipboard not available (requires HTTPS)';
  }
}

/**
 * Hides preview section
 */
function hidePreview(): void {
  elements.previewSection.classList.add('hidden');
}

/**
 * Processes the uploaded file
 */
async function processFile(file: File): Promise<void> {
  try {
    // Reset state
    hideError();
    hideWarnings();
    hidePreview();
    showLoading();

    state.file = file;

    // Validate file type
    if (!isValidTextFile(file)) {
      throw new Error(
        'Invalid file type. Please upload a .txt, .tsv, or .csv file.'
      );
    }

    // Read file content
    const content = await readFileAsUTF16LE(file);

    // Parse markers
    state.markers = parseMarkerFile(content);

    if (state.markers.length === 0) {
      throw new Error(
        'No chapter markers found in the file. Please ensure the file was exported from Adobe Premiere Pro.'
      );
    }

    // Convert to YouTube format
    state.chapters = convertToYouTubeFormat(state.markers);

    // Validate
    state.validation = validateYouTubeChapters(state.chapters);

    // Show errors if validation failed
    if (!state.validation.valid) {
      showError(`Validation failed:\n${state.validation.errors.join('\n')}`);
    }

    // Show warnings if any
    if (state.validation.warnings.length > 0) {
      showWarnings(state.validation.warnings);
    }

    // Format and display output
    const formattedText = formatChaptersAsText(state.chapters);
    showPreview(formattedText);
  } catch (error) {
    showError(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  } finally {
    hideLoading();
  }
}

/**
 * Handles file selection from input
 */
function handleFileSelect(event: Event): void {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    processFile(file);
  }
}

/**
 * Handles drag over event
 */
function handleDragOver(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
  elements.dropzone.classList.add('drag-over');
}

/**
 * Handles drag leave event
 */
function handleDragLeave(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
  elements.dropzone.classList.remove('drag-over');
}

/**
 * Handles file drop
 */
function handleDrop(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
  elements.dropzone.classList.remove('drag-over');

  const file = event.dataTransfer?.files[0];
  if (file) {
    processFile(file);
  }
}

/**
 * Handles copy to clipboard
 */
async function handleCopy(): Promise<void> {
  try {
    const text = formatChaptersAsText(state.chapters);
    await copyToClipboard(text);

    // Show success feedback
    const originalText = elements.copyButton.innerHTML;
    elements.copyButton.innerHTML = `
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Copied!
    `;

    setTimeout(() => {
      elements.copyButton.innerHTML = originalText;
    }, 2000);
  } catch (error) {
    showError(
      error instanceof Error ? error.message : 'Failed to copy to clipboard'
    );
  }
}

/**
 * Handles file download
 */
function handleDownload(): void {
  try {
    const text = formatChaptersAsText(state.chapters);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = state.file
      ? `${state.file.name.replace(/\.[^/.]+$/, '')} - YouTube.txt`
      : 'youtube-chapters.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    showError(
      error instanceof Error ? error.message : 'Failed to download file'
    );
  }
}

/**
 * Resets the application to initial state
 */
function handleReset(): void {
  // Reset state
  state.file = null;
  state.markers = [];
  state.chapters = [];
  state.validation = null;
  state.error = null;

  // Reset UI
  hideError();
  hideWarnings();
  hidePreview();
  elements.fileInput.value = '';
}

/**
 * Initialize event listeners
 */
function initEventListeners(): void {
  // File input
  elements.fileInput.addEventListener('change', handleFileSelect);

  // Browse button
  elements.browseButton.addEventListener('click', () => {
    elements.fileInput.click();
  });

  // Drag and drop
  elements.dropzone.addEventListener('dragover', handleDragOver);
  elements.dropzone.addEventListener('dragleave', handleDragLeave);
  elements.dropzone.addEventListener('drop', handleDrop);

  // Make entire dropzone clickable
  elements.dropzone.addEventListener('click', (event) => {
    // Don't trigger if clicking the browse button itself
    if (event.target !== elements.browseButton) {
      elements.fileInput.click();
    }
  });

  // Action buttons
  elements.copyButton.addEventListener('click', handleCopy);
  elements.downloadButton.addEventListener('click', handleDownload);
  elements.resetButton.addEventListener('click', handleReset);
}

/**
 * Initialize the application
 */
function init(): void {
  initEventListeners();
  console.log('Adobe Premiere to YouTube Chapters converter initialized');
}

// Start the application
init();
