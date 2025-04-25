# Deleting Merged Branches

To delete merged branches, you can use the GitHub API with the following commands:

```bash
# Delete fix-github-actions branch
curl -X DELETE https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/fix-github-actions

# Delete update-lockfile branch
curl -X DELETE https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/update-lockfile

# Delete typescript-refactor branch
curl -X DELETE https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/typescript-refactor

# Delete new-dashboard branch
curl -X DELETE https://api.github.com/repos/hanksudo/realtime-weather/git/refs/heads/new-dashboard
```

Alternatively, you can use the GitHub web interface to delete branches:

1. Go to https://github.com/hanksudo/realtime-weather/branches
2. Find the branch you want to delete
3. Click the trash icon on the right side of the branch name
