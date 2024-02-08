//https://forums.meteor.com/t/cors-on-meteor-2-3/56608
import helmet from "helmet";
//https://guide.meteor.com/security

Meteor.startup(function () {
  WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));
  WebApp.connectHandlers.use(helmet.frameguard());  // defaults to sameorigin
  WebApp.connectHandlers.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"], //scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ['*'],
        imgSrc: ["'self'", 'https://*.qlik.com', 'https://user-images.githubusercontent.com', 'https://lucidchart.com', 'https://github.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://*.qlik.com', 'https://fonts.googleapis.com/css'],
        frameSrc: ['https://integrationdemo1.qlik.com', 'https://integrationdemo2.qlik.com', 'https://integrationdemo3.qlik.com', 'https://*.qlik.com']
      }
    }),

    // crossOriginResourcePolicy: { policy: "cross-origin" },
    // crossOriginEmbedderPolicy: false,
  );

  // https://guide.meteor.com/security#csp.
  //https://docs.meteor.com/packages/browser-policy
  BrowserPolicy.content.disallowInlineScripts();
  BrowserPolicy.framing.disallow();

  WebApp.rawConnectHandlers.use((_, res, next) => {
    // Cache control
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
    // Prevent Adobe stuff loading content on our site
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    // Frameguard - https://helmetjs.github.io/docs/frameguard/
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // X-XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');


    // Expect CT
    res.setHeader('Expect-CT', 'enforce, max-age=604800');


    var domain = 'integration.qlik.com'

    // res.setHeader('Content-Security-Policy', 'frame-ancestors', 'self');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
    res.setHeader('Access-Control-Allow-Origin', domain);
    res.setHeader('Access-Control-Allow-Origin', 'https://saasdemo.qlik.com');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    return next();
  });



});



// WebApp.rawConnectHandlers.use((_, res, next) => {
//     res.setHeader('Content-Security-Policy', 'default-src https:');
//     res.setHeader('Strict-Transport-Security', 'max-age=63072000');
//     res.setHeader('X-Content-Type-Options', 'nosniff');
//     res.setHeader('Content-Security-Policy','frame-ancestors', 'self');
//     res.setHeader('X-Frame-Options', 'SAMEORIGIN');
//     res.setHeader('X-XSS-Protection', '0');
//     // res.setHeader('', '');
//     // res.setHeader('', '');
//     // res.setHeader('', '');
//     // res.setHeader('', '');

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
//     res.setHeader('Access-Control-Allow-Origin', 'https://integration.qlik.com');
//     res.setHeader('Access-Control-Allow-Origin', 'https://saasdemo.qlik.com');
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
//     return next();
//   });