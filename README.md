# Adobe Premiere Chapters to YouTube

A web application that converts Adobe Premiere Pro chapter markers to YouTube's chapter timestamp format instantly in your browser. No installation, no command line, no uploads to servers—everything happens client-side.

## Features

- **Drag & Drop Interface**: Simply drag your Premiere marker file onto the page
- **Instant Conversion**: Real-time processing with immediate preview
- **Validation**: Automatic checking against YouTube's chapter requirements
- **Privacy First**: All processing happens in your browser—files never leave your computer
- **Multiple Export Options**: Copy to clipboard or download as text file
- **Dark Mode Support**: Automatic dark/light theme based on system preferences
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Usage

### Quick Start

1. **Export Markers from Adobe Premiere Pro**
   - Open your project in Adobe Premiere Pro
   - Go to **Markers Panel** (Window > Markers)
   - Add chapter markers at desired timestamps
   - Right-click in the Markers panel and select **Export**
   - Save the file (e.g., `MyVideo_markers.txt`)

2. **Convert to YouTube Format**
   - Visit the application in your browser
   - Drag and drop your marker file onto the upload area, or click to browse
   - Review the converted chapters and validation feedback
   - Copy to clipboard or download the result

3. **Add Chapters to YouTube**
   - Paste the chapters into your YouTube video description
   - YouTube will automatically detect and create chapters

## YouTube Chapter Requirements

For chapters to work on YouTube, your timestamps must meet these criteria:

- ✅ **First chapter must start at 00:00:00**
- ✅ **Minimum 3 chapters required**
- ✅ **Each chapter must be at least 10 seconds long**
- ✅ **Timestamps must be in ascending order**

The application automatically validates your chapters and provides warnings if any requirements aren't met.

## Technology Stack

- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Native Web APIs**: FileReader, Clipboard, Blob (no external runtime dependencies)
- **Vitest**: Comprehensive unit testing

## Technical Details

### UTF-16LE Encoding

Adobe Premiere Pro exports marker files in UTF-16 Little Endian encoding by default (not UTF-8). This application correctly handles this encoding to support international characters and special symbols in marker names.

### What Gets Converted

- **Marker Name** (Column 0): Becomes the chapter title
- **In Timecode** (Column 2): Becomes the chapter timestamp
- **Frame Information**: Automatically removed (Premiere uses `HH:MM:SS:FF`, YouTube needs `HH:MM:SS`)

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with FileReader and Clipboard API support

**Note**: Clipboard functionality requires HTTPS or localhost for security reasons.

## Deployment

The application is a static site and can be deployed to any static hosting service:

- **GitHub Pages**: Ideal for personal projects
- **Netlify**: Automatic deployments from Git
- **Vercel**: Zero-configuration deployment
- **Cloudflare Pages**: Fast global CDN
- **Any Static Host**: Just upload the `dist/` folder

### Build Command

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Troubleshooting

**Chapters not appearing on YouTube:**

- Verify your first chapter starts at 00:00:00
- Ensure you have at least 3 chapters
- Check that chapters are at least 10 seconds apart
- Confirm timestamps are in ascending order

**"Clipboard not available" error:**

- Ensure you're using HTTPS or localhost
- Try the download button instead

**Encoding errors when reading the file:**

- Ensure the file was exported directly from Adobe Premiere Pro
- Do not open/save the file in text editors that might change the encoding

**File not recognized:**

- Verify the file has a `.txt`, `.tsv`, or `.csv` extension
- Ensure the file contains the standard Premiere marker export format

## Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

**👉 Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:**

- Setting up your development environment
- Code standards and TypeScript requirements
- Testing requirements (all features need tests!)
- Pull request process
- Project architecture and best practices

### Quick Start for Contributors

```bash
# 1. Fork and clone the repository
git clone https://github.com/yourusername/adobe-premiere-chapters-to-youtube-gui.git
cd adobe-premiere-chapters-to-youtube-gui

# 2. Install dependencies
npm install

# 3. Start development (run all three in separate terminals)
npm run dev         # Development server
npm run tsc:watch   # Type checking
npm run test:watch  # Test runner

# 4. Before submitting PR
npm run test        # All tests must pass
npm run format      # Format code
npm run lint        # Check code quality
npm run build       # Ensure build succeeds
```

### Reporting Issues

Found a bug? Have a feature request? [Open an issue](https://github.com/yourusername/adobe-premiere-chapters-to-youtube-gui/issues) on GitHub.

## License

This project is licensed under the MIT License.

## Author

Created to streamline the workflow from Adobe Premiere Pro to YouTube chapter timestamps.

---

**Privacy Note**: This application processes all files locally in your browser. No data is transmitted to any server. Your files and chapter information remain completely private.
