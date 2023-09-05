//https://forums.meteor.com/t/cors-on-meteor-2-3/56608

WebApp.rawConnectHandlers.use((_, res, next) => {
    res.setHeader('Content-Security-Policy', 'default-src https:');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy','frame-ancestors', 'self');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '0');
    // res.setHeader('', '');
    // res.setHeader('', '');
    // res.setHeader('', '');
    // res.setHeader('', '');

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
    res.setHeader('Access-Control-Allow-Origin', 'https://integration.qlik.com');
    res.setHeader('Access-Control-Allow-Origin', 'https://saasdemo.qlik.com');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    return next();
  });