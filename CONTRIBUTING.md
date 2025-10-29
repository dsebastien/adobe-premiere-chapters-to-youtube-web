# Contributing to Adobe Premiere to YouTube Chapters

Thank you for your interest in contributing! This document provides guidelines for contributors.

## Quick Links

- **For AI Agents**: See [CLAUDE.md](./CLAUDE.md) and [AGENTS.md](./AGENTS.md) for detailed development guidelines
- **Project README**: See [README.md](./README.md) for project overview and usage
- **Report Issues**: [GitHub Issues](https://github.com/yourusername/adobe-premiere-chapters-to-youtube-gui/issues)

## How to Contribute

We welcome contributions of all kinds:

- 🐛 Bug reports and fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ✅ Test coverage improvements

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Basic knowledge of TypeScript
- Familiarity with modern web development (Vite, Tailwind)

### Setup

1. **Fork and clone the repository**:

   ```bash
   git clone https://github.com/yourusername/adobe-premiere-chapters-to-youtube-gui.git
   cd adobe-premiere-chapters-to-youtube-gui
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development environment** (IMPORTANT - run all three):

   ```bash
   # In separate terminals or as background processes
   npm run dev         # Development server at http://localhost:3000
   npm run tsc:watch   # TypeScript type checking
   npm run test:watch  # Continuous test runner
   ```

4. **Make your changes** and test thoroughly

5. **Before committing**:
   ```bash
   npm run test        # Ensure all tests pass
   npm run format      # Auto-format code
   npm run lint        # Check code quality
   npm run build       # Verify production build
   ```

## Development Guidelines

### Code Standards

- **TypeScript**: This project uses ultra-strict TypeScript configuration
  - No `any` types allowed
  - All functions must have explicit type annotations
  - Handle null/undefined explicitly

- **Testing**: All new features and bug fixes require tests
  - Write tests for core logic (`src/core/`)
  - Aim for 90%+ coverage on new code
  - Use TDD approach when possible

- **Code Style**: Enforced by Prettier and TypeScript
  - Single quotes
  - 2-space indentation
  - Semicolons required
  - Run `npm run format` before committing

### Project Architecture

```
src/
├── core/              # Core business logic (pure functions)
│   ├── parser.ts      # Parse Premiere marker files
│   ├── converter.ts   # Convert to YouTube format
│   ├── validator.ts   # Validate YouTube requirements
│   └── __tests__/     # Unit tests for core modules
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
└── main.ts            # Application entry point
```

**Module Guidelines**:

- `src/core/`: Pure functions only, no side effects, fully tested
- `src/utils/`: Browser API wrappers, error-safe
- `src/main.ts`: DOM manipulation and event handling
- Tests: Located in `__tests__/` directories

### Writing Tests

Tests are **required** for:

- ✅ All new features in `src/core/` or `src/utils/`
- ✅ All bug fixes (add regression test)
- ✅ Any refactoring of core logic

Example test structure:

```typescript
import { describe, it, expect } from 'vitest';
import { functionToTest } from '../module';

describe('functionToTest', () => {
  it('should handle normal case', () => {
    const result = functionToTest('input');
    expect(result).toBe('expected output');
  });

  it('should handle edge case', () => {
    const result = functionToTest('');
    expect(result).toBe('');
  });
});
```

Run tests:

```bash
npm run test          # Run once
npm run test:watch    # Watch mode (recommended during development)
npm run test:ui       # Interactive UI
npm run test:coverage # With coverage report
```

### Commit Guidelines

1. **Keep commits focused**: One logical change per commit
2. **Write clear commit messages**:

   ```
   Add validation for minimum chapter length

   - Ensure chapters are at least 10 seconds apart
   - Add warning message for short chapters
   - Add tests for new validation logic
   ```

3. **Test before committing**: All tests must pass
4. **Format before committing**: Run `npm run format`

### Pull Request Process

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow code standards
   - Add tests
   - Update documentation if needed

3. **Verify everything passes**:

   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Push and create PR**:
   - Provide clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

5. **Respond to feedback**:
   - Address review comments
   - Update tests if needed
   - Keep PR focused (avoid scope creep)

## What We're Looking For

### Priority Areas

- 🐛 **Bug Fixes**: Always welcome
- ✅ **Test Coverage**: Improve coverage for existing code
- 📝 **Documentation**: Clarify usage, add examples
- 🎨 **Accessibility**: Improve keyboard navigation, screen reader support
- 🌐 **Internationalization**: Support for non-English marker names

### Feature Requests

Before implementing a new feature:

1. Open an issue to discuss the feature
2. Wait for approval from maintainers
3. Ensure it aligns with project goals

**Project Goals**:

- ✅ Privacy-first (client-side only)
- ✅ Zero runtime dependencies (use native Web APIs)
- ✅ Minimal bundle size
- ✅ Simple and focused functionality

## Code of Conduct

### Be Respectful

- Use welcoming and inclusive language
- Respect differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the project

### Be Professional

- Keep discussions on-topic
- Provide constructive feedback
- Help others learn and grow

## Need Help?

- **Technical questions**: Open a GitHub issue
- **Development setup**: See [AGENTS.md](./AGENTS.md) for detailed guidelines
- **Architecture questions**: Check [AGENTS.md](./AGENTS.md) architecture section

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

---

Thank you for contributing to Adobe Premiere to YouTube Chapters! 🎉
