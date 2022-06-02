import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

function getUrls(req) {
  const host = req.headers['host'];
  const protocol = process.env.VERCEL_URL ? 'https' : 'http';
  const redirectUri = `${protocol}://${host}/api/auth/callback`;
  const returnTo = `${protocol}://${host}/profile`;
  const audience = process.env.AUTH0_AUDIENCE;
  const scope = process.env.AUTH0_SCOPE;

  return {
    redirectUri,
    returnTo,
    audience,
    scope
  };
}

export default handleAuth({
  async login(req, res) {
    try {
      const { redirectUri, returnTo, audience, scope } = getUrls(req);

      await handleLogin(req, res, {
        authorizationParams: {
          audience: audience,
          scope: scope,
          redirect_uri: redirectUri
        },
        returnTo: returnTo
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },
});
