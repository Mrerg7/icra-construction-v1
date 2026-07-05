const CANONICAL_HOST = 'icra.construction';
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

interface Env {
  ASSETS: Fetcher;
}

function permanentRedirect(location: string): Response {
  return new Response(null, {
    status: 301,
    headers: {
      Location: location,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return permanentRedirect(url.toString());
    }

    if (url.pathname === '/index.html' || url.pathname === '/index.html/') {
      return permanentRedirect(`${CANONICAL_ORIGIN}/`);
    }

    return env.ASSETS.fetch(request);
  },
};
