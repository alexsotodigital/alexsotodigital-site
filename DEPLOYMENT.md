# Deployment

This site is static-first. The source of truth is `content/site-data.js`; generated output goes to `dist/`.

Production target:

- ENS: `alexsotodigital.eth`
- Gateway verification: `https://alexsotodigital.eth.limo`
- Production content: IPFS CID stored in the ENS `contenthash` record

Do not hardcode a Web2 domain. Use `SITE_URL` when building for a specific public URL.

## Build

Local build:

```sh
npm run build
```

Build with ENS gateway URLs:

```sh
SITE_URL=https://alexsotodigital.eth.limo npm run build
```

Build with a future Web2 domain:

```sh
SITE_URL=https://<future-domain> npm run build
```

`SITE_URL` affects generated metadata such as canonical links, `sitemap.xml`, `robots.txt`, `llms.txt`, and JSON endpoints where applicable.

## Preview Locally

```sh
npm run preview
```

Default local preview:

```text
http://localhost:4173
```

If port `4173` is already in use:

```sh
python3 -m http.server 4174 -d dist
```

## Preview Deployments

For Vercel or Netlify previews, connect the repository and use:

```sh
npm run build
```

Publish directory:

```text
dist
```

Recommended preview environment variable:

```text
SITE_URL=<provider preview URL>
```

If the provider sets a dynamic preview URL, configure `SITE_URL` in that provider's environment settings when available.

## Publish to IPFS

Install an IPFS CLI implementation such as Kubo, then run:

```sh
npm run publish:ipfs
```

This runs:

```sh
npm run build
ipfs add -r --cid-version=1 --quieter dist
```

The final CID printed by the script is the CID for the `dist/` directory.

Recommended production build before publishing:

```sh
SITE_URL=https://alexsotodigital.eth.limo npm run publish:ipfs
```

## Pin the CID

Pin locally:

```sh
ipfs pin add <CID>
```

Also pin with at least one remote pinning service such as Pinata, Fleek, Spheron, or another IPFS pinning provider.

Keep a release log with:

- date
- CID
- source commit or local archive reference
- short release note

## Update ENS Contenthash

Set the ENS `contenthash` record for:

```text
alexsotodigital.eth
```

Target value:

```text
ipfs://<CID>
```

Simple path:

1. Open the ENS manager.
2. Select `alexsotodigital.eth`.
3. Edit the content record.
4. Set it to `ipfs://<CID>`.
5. Confirm the transaction with the controlling wallet.

CLI path depends on the ENS tooling and wallet setup. Regardless of tool, the final contenthash must resolve to:

```text
ipfs://<CID>
```

## Verify

After the ENS transaction confirms, verify:

```text
https://alexsotodigital.eth.limo
```

Check these files:

```text
https://alexsotodigital.eth.limo/
https://alexsotodigital.eth.limo/identity/
https://alexsotodigital.eth.limo/payments.json
https://alexsotodigital.eth.limo/llms.txt
https://alexsotodigital.eth.limo/robots.txt
https://alexsotodigital.eth.limo/sitemap.xml
```

Confirm:

- homepage loads
- identity page shows ENS, wallet, links, and contact methods
- `payments.json` is explicit and readable
- `llms.txt` mentions identity and payment metadata
- no `/payments/` page exists

## Rollback

To roll back:

1. Find the previous known-good CID from the release log.
2. Confirm the CID is still pinned.
3. Update the ENS contenthash back to:

```text
ipfs://<PREVIOUS_CID>
```

4. Verify through:

```text
https://alexsotodigital.eth.limo
```

Rollback does not require rebuilding the site if the previous CID is still pinned and available.

## Notes for AI Agents

- Edit structured content in `content/site-data.js`.
- Run `npm run build`.
- Do not edit generated files in `dist/` manually.
- Do not add server-side dependencies, databases, or CMS logic.
- Keep payment behavior informational only. Do not initiate payments.
