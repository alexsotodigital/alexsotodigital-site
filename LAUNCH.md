# v1.0 - ENS soft launch

## Launch Record

- Launch name: v1.0 - ENS soft launch
- Launch date: 2026-06-18
- Live URL: https://alexsotodigital.eth.limo/
- AI-readable entry point: https://alexsotodigital.eth.limo/llms.txt
- Verified CID: bafybeibtirilhjv4c5ez73ihxhhms5fqv44n54ppfwl4cizkpl6fphbjii
- ENS contenthash: ipfs://bafybeibtirilhjv4c5ez73ihxhhms5fqv44n54ppfwl4cizkpl6fphbjii
- GitHub Actions run: https://github.com/alexsotodigital/alexsotodigital-site/actions/runs/27730705667
- Launch commit: 5923a62649719c54535df0fc1ca65e49113026f1

## Verification Summary

- `/` returned 200.
- `/identity/` returned 200.
- `/llms.txt` returned 200.
- `/about.json` returned valid JSON.
- `/services.json` returned valid JSON.
- `/projects.json` returned valid JSON.
- `/faq.json` returned valid JSON.
- `/links.json` returned valid JSON.
- `/payments.json` returned valid JSON.
- `/sitemap.xml` returned valid sitemap content.

## Gateway Notes

- `eth.limo` serves the expected CID.
- `dweb.link` verified successfully during pre-ENS checks.
- Pinata is used as the pinning backend.
- Pinata public gateway serves machine-readable endpoints but does not serve HTML routes on the current plan.

## Maintenance Policy

- Code and content changes may be committed and pushed to `main`.
- GitHub Actions will build the static site and generate a new CID.
- ENS should not be updated automatically.
- ENS updates require explicit human approval after gateway verification.
