#!/bin/sh
set -eu

if ! command -v ipfs >/dev/null 2>&1; then
  echo "IPFS CLI is not installed or not available in PATH."
  echo "Install Kubo/IPFS CLI, then run: npm run publish:ipfs"
  exit 1
fi

if [ ! -d "dist" ]; then
  echo "dist/ does not exist. Run npm run build first."
  exit 1
fi

echo "Publishing dist/ to IPFS with CIDv1..."
CID="$(ipfs add -r --cid-version=1 --quieter dist | tail -n 1)"

if [ -z "$CID" ]; then
  echo "IPFS publish failed: no CID was returned."
  exit 1
fi

echo ""
echo "Published CID:"
echo "$CID"
echo ""
echo "Recommended next steps:"
echo "1. Pin the CID: ipfs pin add $CID"
echo "2. Update ENS contenthash for alexsotodigital.eth to ipfs://$CID"
echo "3. Verify through: https://alexsotodigital.eth.limo"
