import { request } from 'node:https';

// Server-only: runs in the Astro frontmatter at build time, never shipped to the client.
// Keeps the hero's version/size in sync with the actual latest GitHub release instead
// of a hand-typed, easily-stale value.
//
// Uses node:https (not fetch/undici) and destroys the socket once the response is read —
// on Windows, an undici keep-alive socket still open when Astro's build process exits can
// crash the process with a libuv assertion in src/win/async.c. This sidesteps it.
const RELEASE_API_HOST = 'api.github.com';
const RELEASE_API_PATH = '/repos/Group-Active-IA/active-stack/releases/latest';
const WINDOWS_ASSET_NAME = 'ActiveStack-Setup.exe';

function fetchJson(host, path) {
  return new Promise((resolve, reject) => {
    const req = request(
      {
        host,
        path,
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'active-stack-landing-build',
        },
        timeout: 8000,
      },
      (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          res.resume();
          req.destroy();
          reject(new Error(`GitHub API responded ${res.statusCode}`));
          return;
        }
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          req.destroy();
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on('timeout', () => req.destroy(new Error('GitHub API request timed out')));
    req.on('error', reject);
    req.end();
  });
}

export async function getLatestRelease() {
  try {
    const data = await fetchJson(RELEASE_API_HOST, RELEASE_API_PATH);
    const windowsAsset = data.assets?.find((asset) => asset.name === WINDOWS_ASSET_NAME);

    return {
      version: data.tag_name ?? null,
      sizeLabel: windowsAsset ? `${(windowsAsset.size / 1024 / 1024).toFixed(1)} MB` : null,
    };
  } catch (err) {
    console.warn(`[release] Could not fetch the latest GitHub release, hiding version/size: ${err.message}`);
    return { version: null, sizeLabel: null };
  }
}
