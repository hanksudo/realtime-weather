# Deployment Guide

This project is set up to automatically deploy to GitHub Pages when changes are pushed to the main branch.

## Automatic Deployment

The project uses GitHub Actions for continuous deployment. The workflow is defined in `.github/workflows/deploy.yml`. 

When code is pushed to the main branch, the following happens automatically:
1. The code is checked out
2. Node.js and pnpm are set up
3. Dependencies are installed
4. The project is built
5. The built files are deployed to GitHub Pages

## Environment Variables

For the weather API to work in production, you need to add the API key as a repository secret:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Click on "Secrets and variables" → "Actions"
4. Click on "New repository secret"
5. Add a secret with the name `VITE_WEATHER_API_KEY` and your API key as the value
6. Click "Add secret"

## Manual Deployment

If you need to trigger the deployment manually:

1. Go to your repository on GitHub
2. Click on "Actions"
3. Select the "Deploy to GitHub Pages" workflow
4. Click "Run workflow"
5. Select the branch (usually "main")
6. Click "Run workflow"

## Accessing the Deployed Site

After successful deployment, the application will be available at:
`https://[your-github-username].github.io/vue-login-demo/`

## Troubleshooting

If the deployment fails, check:
1. The GitHub Actions logs for specific errors
2. Ensure the repository has GitHub Pages enabled in Settings → Pages
3. Verify that the API key is correctly set as a repository secret
4. Make sure the base URL in `vite.config.js` matches your repository name
