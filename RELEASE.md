# Release

Standard CV release process is documented here:
- SCS Bundler: https://github.com/common-voice/common-voice/tree/main/bundler

Releases are built within the Docker container by SCS Bundler. It requires a datasheet.

## CLI usage

### Full Release from scratch
```bash
cd js/cli

# Full release
# node start-dataset-release.js \
#   -t full -u '2026-04-13 23:59:59' \
#   -r pr-corpus-26.0-2026-04-13 \
#   -p pr-corpus-25.0-2025-04-13

# node start-dataset-release.js \
#   -t full \
#   -f '2026-01-01 00:00:00' \
#   -u '2026-04-13 23:59:59' \
#   -l act,drt-MD,drt-NV,drt-ZO,drt-ZW,gos-HO,gos-VE,gos-WE,gos-WO,sdz,stl,twd,vel,urk,spk \
#   -r pr-corpus-26.0-2026-04-13

node start-dataset-release.js \
  -t full \
  -f '2026-01-01 00:00:00' \
  -u '2026-04-13 23:59:59' \
  -r pr-corpus-26.0-2026-04-13
```

### Delta + Full
```bash
cd js/cli

# We already have v26.0 full release until midnight of 2026-04-13
# First generate delta release for v26.1 (e.g. at 2026-06-07)
node start-dataset-release.js \
  -t delta \
  -f "2026-04-14 00:00:00" \
  -u "2026-06-07 23:59:59" \
  -r "pr-corpus-26.1-delta-2026-06-07"

# Then generate full release for v26.1, bootstrapping from v26.0 and using the generated delta
node start-dataset-release.js \
  -t full \
  -u "2026-03-09 23:59:59" \
  -r "pr-corpus-26.1-2026-06-07" \
  -p "pr-corpus-26.0-2026-04-13" \
  -d "datasheets-2026-06-07.json"
```
