#!/bin/bash
# This script deletes merged branches

# Delete fix-github-actions branch
curl -X DELETE -H "Accept: application/vnd.github+json" \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/fix-github-actions

# Delete update-lockfile branch
curl -X DELETE -H "Accept: application/vnd.github+json" \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/update-lockfile

# Delete typescript-refactor branch
curl -X DELETE -H "Accept: application/vnd.github+json" \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/typescript-refactor

# Delete new-dashboard branch
curl -X DELETE -H "Accept: application/vnd.github+json" \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/new-dashboard
