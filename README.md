# 🎭 Automated QA Framework for Demoblaze

This repository contains a Playwright-based End-to-End (E2E) automated testing project for the Demoblaze e-commerce website.

It is designed for:
- functional smoke and regression testing
- Playwright test automation
- QA documentation and scenario planning
- portfolio-ready GitHub presentation

## Tech Stack

- Playwright Test
- TypeScript
- Node.js
- GitHub Actions / Copilot setup files

## Project Structure

- .github/ — agent and workflow configuration
- specs/ — test plans and QA checklist documents
- tests/ — Playwright test files
- pages/ — page object or helper files
- playwright.config.ts — Playwright configuration

## Documentation

- [specs/README.md](specs/README.md) — test docs index
- [specs/demoblaze-test-checklist.md](specs/demoblaze-test-checklist.md) — detailed Demoblaze checklist

## Quick Start

1. Install dependencies:
   npm install
2. Run tests:
   npx playwright test
3. Run with UI mode:
   npx playwright test --ui
