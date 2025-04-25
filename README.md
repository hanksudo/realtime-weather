# Realtime Weather

A real-time weather dashboard application built with Vue.js and TypeScript that displays current conditions and forecasts.

## Features

- Dashboard showing weather for major Japanese cities
- 5-day weather forecast
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/hanksudo/realtime-weather.git
cd realtime-weather

# Install dependencies with pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Development

```bash
# Start the development server
pnpm dev

# Or using npm
npm run dev
```

The application will be available at http://localhost:3000/

### Building for Production

```bash
# Build for production
pnpm build

# Or using npm
npm run build
```

## Testing

This project uses Vitest for unit testing. Tests are located in `__tests__` directories alongside the components and utilities they test.

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Project Structure

```
.
├── public/               # Public static assets
├── src/                  # Source code
│   ├── components/       # Vue components
│   │   └── __tests__/    # Component tests
│   ├── utils/            # Utility functions
│   │   └── __tests__/    # Utility tests
│   ├── types/            # TypeScript type definitions
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── .github/workflows/    # GitHub Actions workflows
├── tests/                # Global test setup
├── .npmrc                # PNPM configuration
├── pnpm-workspace.yaml   # PNPM workspace configuration
├── index.html            # HTML entry point
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── vitest.config.ts      # Vitest configuration
```

## Continuous Integration

This project uses GitHub Actions for CI/CD. The pipeline:

1. Runs on push to main and pull requests
2. Installs dependencies
3. Performs type checking
4. Runs tests
5. Builds the application
6. Reports test coverage

## License

MIT
