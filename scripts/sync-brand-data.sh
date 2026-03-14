#!/usr/bin/env bash
# Sync brand data from brand-tokens into plugin's companies/ directory.
# Run from plugin root. Requires brand-tokens to be accessible.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"

# Find brand-tokens
BT="${BRAND_TOKENS_PATH:-$PLUGIN_ROOT/../../../brand-tokens}"
if [ ! -d "$BT/clients" ]; then
    echo "Error: brand-tokens not found at $BT"
    echo "Set BRAND_TOKENS_PATH or run from stromy-org workspace."
    exit 1
fi

SRC="$BT/clients/dukestrategies"
DEST="$PLUGIN_ROOT/companies/dukestrategies/brand"
echo "Syncing $SRC -> $DEST"
mkdir -p "$DEST"
rsync -av --delete --exclude='*.schema.json' "$SRC/" "$DEST/"

SOURCE_COMMIT=$(cd "$BT" && git rev-parse --short HEAD 2>/dev/null || echo "unknown")
cat > "$DEST/.brand-sync-version.json" <<EOF
{
  "source": "brand-tokens",
  "source_commit": "$SOURCE_COMMIT",
  "sync_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
echo "Brand data synced from brand-tokens ($SOURCE_COMMIT)"
