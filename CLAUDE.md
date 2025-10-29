# Instructions for Claude Code

Welcome! This project has specific guidelines for AI agents working with the codebase.

## 🚨 Read This First

**Before making any changes or providing assistance with this project, you MUST read the [AGENTS.md](./AGENTS.md) file.**

The AGENTS.md file contains:

- **Project architecture and module organization**
- **Development workflow and required scripts**
- **Strict TypeScript requirements and rules**
- **Code standards and conventions**
- **Testing and validation procedures**
- **Common tasks and examples**

## 🚨 CRITICAL: Start Background Processes First

**Before doing ANY work on this project, you MUST start these background processes:**

```bash
# REQUIRED: Run ALL THREE of these in parallel as background processes
npm run dev         # Background - Live development server
npm run tsc:watch   # Background - Continuous type checking
npm run test:watch  # Background - Continuous test execution
```

Keep these running throughout your entire session for instant feedback on all changes.

## Quick Start

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start background processes (REQUIRED for all development)
npm run dev         # Background - starts at http://localhost:3000
npm run tsc:watch   # Background - watch for type errors
npm run test:watch  # Background - run tests automatically

# 3. After making changes, before committing
npm run test       # Run all tests
npm run format     # Auto-format code
npm run lint       # Verify all checks pass
npm run build      # Ensure production build works
```

## Critical Rules

1. **🚨 ALWAYS Run Background Processes**: Start `npm run dev`, `npm run tsc:watch`, AND `npm run test:watch` in background before coding. This is NON-NEGOTIABLE.

2. **🚨 Write Tests**: All new features and bug fixes require tests. No exceptions.

3. **Ultra-Strict TypeScript**: This project uses the strictest possible TypeScript configuration. No `any`, no type assertions without good reason, explicit types everywhere.

4. **No External Runtime Dependencies**: Only use native Web APIs. Do not add libraries.

5. **Privacy First**: All processing happens client-side. Never add server-side functionality.

6. **Use NPM Scripts**: Always use the scripts defined in `package.json`, never run commands directly.

7. **Format Code**: Always run `npm run format` after making changes.

## Project Type

This is a **web application** (not a Node.js CLI tool). It runs entirely in the browser using:

- TypeScript for type-safe development
- Vite as the build tool
- Tailwind CSS for styling
- Native Web APIs (FileReader, Clipboard, Blob)

## Before Proceeding

👉 **Read [AGENTS.md](./AGENTS.md) now** for complete guidelines, architecture details, and development rules.

Without reading AGENTS.md, you will likely:

- **Forget to start all 3 background processes** (dev server + tsc:watch + test:watch)
- **Forget to write tests** for new features and bug fixes
- Work without instant feedback and waste time on errors
- Violate TypeScript strict mode requirements
- Use incorrect development workflow
- Miss critical architectural patterns
- Make changes that break the build

## Need Help?

- **Architecture questions**: See the "Architecture" section in AGENTS.md
- **TypeScript errors**: See the "TypeScript Requirements" section in AGENTS.md
- **Code standards**: See the "Code Standards" section in AGENTS.md
- **Testing**: See the "Testing & Validation" section in AGENTS.md

---

**Remember**: This document is a pointer. The actual guidelines are in [AGENTS.md](./AGENTS.md).
