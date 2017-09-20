(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Log = Package.logging.Log;
var _ = Package.underscore._;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var Boilerplate = Package['boilerplate-generator'].Boilerplate;
var WebAppHashing = Package['webapp-hashing'].WebAppHashing;
var meteorInstall = Package.modules.meteorInstall;
var process = Package.modules.process;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var WebApp, WebAppInternals, main;

var require = meteorInstall({"node_modules":{"meteor":{"webapp":{"webapp_server.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/webapp/webapp_server.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
////////// Requires //////////                                                                                        // 1
var fs = Npm.require("fs");                                                                                           // 3
                                                                                                                      //
var http = Npm.require("http");                                                                                       // 4
                                                                                                                      //
var os = Npm.require("os");                                                                                           // 5
                                                                                                                      //
var path = Npm.require("path");                                                                                       // 6
                                                                                                                      //
var url = Npm.require("url");                                                                                         // 7
                                                                                                                      //
var crypto = Npm.require("crypto");                                                                                   // 8
                                                                                                                      //
var connect = Npm.require('connect');                                                                                 // 10
                                                                                                                      //
var parseurl = Npm.require('parseurl');                                                                               // 11
                                                                                                                      //
var useragent = Npm.require('useragent');                                                                             // 12
                                                                                                                      //
var send = Npm.require('send');                                                                                       // 13
                                                                                                                      //
var Future = Npm.require('fibers/future');                                                                            // 15
                                                                                                                      //
var Fiber = Npm.require('fibers');                                                                                    // 16
                                                                                                                      //
var SHORT_SOCKET_TIMEOUT = 5 * 1000;                                                                                  // 18
var LONG_SOCKET_TIMEOUT = 120 * 1000;                                                                                 // 19
WebApp = {};                                                                                                          // 21
WebAppInternals = {};                                                                                                 // 22
WebAppInternals.NpmModules = {                                                                                        // 24
  connect: {                                                                                                          // 25
    version: Npm.require('connect/package.json').version,                                                             // 26
    module: connect                                                                                                   // 27
  }                                                                                                                   // 25
};                                                                                                                    // 24
WebApp.defaultArch = 'web.browser'; // XXX maps archs to manifests                                                    // 31
                                                                                                                      //
WebApp.clientPrograms = {}; // XXX maps archs to program path on filesystem                                           // 34
                                                                                                                      //
var archPath = {};                                                                                                    // 37
                                                                                                                      //
var bundledJsCssUrlRewriteHook = function (url) {                                                                     // 39
  var bundledPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';                                           // 40
  return bundledPrefix + url;                                                                                         // 42
};                                                                                                                    // 43
                                                                                                                      //
var sha1 = function (contents) {                                                                                      // 45
  var hash = crypto.createHash('sha1');                                                                               // 46
  hash.update(contents);                                                                                              // 47
  return hash.digest('hex');                                                                                          // 48
};                                                                                                                    // 49
                                                                                                                      //
var readUtf8FileSync = function (filename) {                                                                          // 51
  return Meteor.wrapAsync(fs.readFile)(filename, 'utf8');                                                             // 52
}; // #BrowserIdentification                                                                                          // 53
//                                                                                                                    // 56
// We have multiple places that want to identify the browser: the                                                     // 57
// unsupported browser page, the appcache package, and, eventually                                                    // 58
// delivering browser polyfills only as needed.                                                                       // 59
//                                                                                                                    // 60
// To avoid detecting the browser in multiple places ad-hoc, we create a                                              // 61
// Meteor "browser" object. It uses but does not expose the npm                                                       // 62
// useragent module (we could choose a different mechanism to identify                                                // 63
// the browser in the future if we wanted to).  The browser object                                                    // 64
// contains                                                                                                           // 65
//                                                                                                                    // 66
// * `name`: the name of the browser in camel case                                                                    // 67
// * `major`, `minor`, `patch`: integers describing the browser version                                               // 68
//                                                                                                                    // 69
// Also here is an early version of a Meteor `request` object, intended                                               // 70
// to be a high-level description of the request without exposing                                                     // 71
// details of connect's low-level `req`.  Currently it contains:                                                      // 72
//                                                                                                                    // 73
// * `browser`: browser identification object described above                                                         // 74
// * `url`: parsed url, including parsed query params                                                                 // 75
//                                                                                                                    // 76
// As a temporary hack there is a `categorizeRequest` function on WebApp which                                        // 77
// converts a connect `req` to a Meteor `request`. This can go away once smart                                        // 78
// packages such as appcache are being passed a `request` object directly when                                        // 79
// they serve content.                                                                                                // 80
//                                                                                                                    // 81
// This allows `request` to be used uniformly: it is passed to the html                                               // 82
// attributes hook, and the appcache package can use it when deciding                                                 // 83
// whether to generate a 404 for the manifest.                                                                        // 84
//                                                                                                                    // 85
// Real routing / server side rendering will probably refactor this                                                   // 86
// heavily.                                                                                                           // 87
// e.g. "Mobile Safari" => "mobileSafari"                                                                             // 90
                                                                                                                      //
                                                                                                                      //
var camelCase = function (name) {                                                                                     // 91
  var parts = name.split(' ');                                                                                        // 92
  parts[0] = parts[0].toLowerCase();                                                                                  // 93
                                                                                                                      //
  for (var i = 1; i < parts.length; ++i) {                                                                            // 94
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);                                                 // 95
  }                                                                                                                   // 96
                                                                                                                      //
  return parts.join('');                                                                                              // 97
};                                                                                                                    // 98
                                                                                                                      //
var identifyBrowser = function (userAgentString) {                                                                    // 100
  var userAgent = useragent.lookup(userAgentString);                                                                  // 101
  return {                                                                                                            // 102
    name: camelCase(userAgent.family),                                                                                // 103
    major: +userAgent.major,                                                                                          // 104
    minor: +userAgent.minor,                                                                                          // 105
    patch: +userAgent.patch                                                                                           // 106
  };                                                                                                                  // 102
}; // XXX Refactor as part of implementing real routing.                                                              // 108
                                                                                                                      //
                                                                                                                      //
WebAppInternals.identifyBrowser = identifyBrowser;                                                                    // 111
                                                                                                                      //
WebApp.categorizeRequest = function (req) {                                                                           // 113
  return _.extend({                                                                                                   // 114
    browser: identifyBrowser(req.headers['user-agent']),                                                              // 115
    url: url.parse(req.url, true)                                                                                     // 116
  }, _.pick(req, 'dynamicHead', 'dynamicBody'));                                                                      // 114
}; // HTML attribute hooks: functions to be called to determine any attributes to                                     // 118
// be added to the '<html>' tag. Each function is passed a 'request' object (see                                      // 121
// #BrowserIdentification) and should return null or object.                                                          // 122
                                                                                                                      //
                                                                                                                      //
var htmlAttributeHooks = [];                                                                                          // 123
                                                                                                                      //
var getHtmlAttributes = function (request) {                                                                          // 124
  var combinedAttributes = {};                                                                                        // 125
                                                                                                                      //
  _.each(htmlAttributeHooks || [], function (hook) {                                                                  // 126
    var attributes = hook(request);                                                                                   // 127
    if (attributes === null) return;                                                                                  // 128
    if ((typeof attributes === "undefined" ? "undefined" : (0, _typeof3.default)(attributes)) !== 'object') throw Error("HTML attribute hook must return null or object");
                                                                                                                      //
    _.extend(combinedAttributes, attributes);                                                                         // 132
  });                                                                                                                 // 133
                                                                                                                      //
  return combinedAttributes;                                                                                          // 134
};                                                                                                                    // 135
                                                                                                                      //
WebApp.addHtmlAttributeHook = function (hook) {                                                                       // 136
  htmlAttributeHooks.push(hook);                                                                                      // 137
}; // Serve app HTML for this URL?                                                                                    // 138
                                                                                                                      //
                                                                                                                      //
var appUrl = function (url) {                                                                                         // 141
  if (url === '/favicon.ico' || url === '/robots.txt') return false; // NOTE: app.manifest is not a web standard like favicon.ico and
  // robots.txt. It is a file name we have chosen to use for HTML5                                                    // 146
  // appcache URLs. It is included here to prevent using an appcache                                                  // 147
  // then removing it from poisoning an app permanently. Eventually,                                                  // 148
  // once we have server side routing, this won't be needed as                                                        // 149
  // unknown URLs with return a 404 automatically.                                                                    // 150
                                                                                                                      //
  if (url === '/app.manifest') return false; // Avoid serving app HTML for declared routes such as /sockjs/.          // 151
                                                                                                                      //
  if (RoutePolicy.classify(url)) return false; // we currently return app HTML on all URLs by default                 // 155
                                                                                                                      //
  return true;                                                                                                        // 159
}; // We need to calculate the client hash after all packages have loaded                                             // 160
// to give them a chance to populate __meteor_runtime_config__.                                                       // 164
//                                                                                                                    // 165
// Calculating the hash during startup means that packages can only                                                   // 166
// populate __meteor_runtime_config__ during load, not during startup.                                                // 167
//                                                                                                                    // 168
// Calculating instead it at the beginning of main after all startup                                                  // 169
// hooks had run would allow packages to also populate                                                                // 170
// __meteor_runtime_config__ during startup, but that's too late for                                                  // 171
// autoupdate because it needs to have the client hash at startup to                                                  // 172
// insert the auto update version itself into                                                                         // 173
// __meteor_runtime_config__ to get it to the client.                                                                 // 174
//                                                                                                                    // 175
// An alternative would be to give autoupdate a "post-start,                                                          // 176
// pre-listen" hook to allow it to insert the auto update version at                                                  // 177
// the right moment.                                                                                                  // 178
                                                                                                                      //
                                                                                                                      //
Meteor.startup(function () {                                                                                          // 180
  var calculateClientHash = WebAppHashing.calculateClientHash;                                                        // 181
                                                                                                                      //
  WebApp.clientHash = function (archName) {                                                                           // 182
    archName = archName || WebApp.defaultArch;                                                                        // 183
    return calculateClientHash(WebApp.clientPrograms[archName].manifest);                                             // 184
  };                                                                                                                  // 185
                                                                                                                      //
  WebApp.calculateClientHashRefreshable = function (archName) {                                                       // 187
    archName = archName || WebApp.defaultArch;                                                                        // 188
    return calculateClientHash(WebApp.clientPrograms[archName].manifest, function (name) {                            // 189
      return name === "css";                                                                                          // 191
    });                                                                                                               // 192
  };                                                                                                                  // 193
                                                                                                                      //
  WebApp.calculateClientHashNonRefreshable = function (archName) {                                                    // 194
    archName = archName || WebApp.defaultArch;                                                                        // 195
    return calculateClientHash(WebApp.clientPrograms[archName].manifest, function (name) {                            // 196
      return name !== "css";                                                                                          // 198
    });                                                                                                               // 199
  };                                                                                                                  // 200
                                                                                                                      //
  WebApp.calculateClientHashCordova = function () {                                                                   // 201
    var archName = 'web.cordova';                                                                                     // 202
    if (!WebApp.clientPrograms[archName]) return 'none';                                                              // 203
    return calculateClientHash(WebApp.clientPrograms[archName].manifest, null, _.pick(__meteor_runtime_config__, 'PUBLIC_SETTINGS'));
  };                                                                                                                  // 209
}); // When we have a request pending, we want the socket timeout to be long, to                                      // 210
// give ourselves a while to serve it, and to allow sockjs long polls to                                              // 215
// complete.  On the other hand, we want to close idle sockets relatively                                             // 216
// quickly, so that we can shut down relatively promptly but cleanly, without                                         // 217
// cutting off anyone's response.                                                                                     // 218
                                                                                                                      //
WebApp._timeoutAdjustmentRequestCallback = function (req, res) {                                                      // 219
  // this is really just req.socket.setTimeout(LONG_SOCKET_TIMEOUT);                                                  // 220
  req.setTimeout(LONG_SOCKET_TIMEOUT); // Insert our new finish listener to run BEFORE the existing one which removes
  // the response from the socket.                                                                                    // 223
                                                                                                                      //
  var finishListeners = res.listeners('finish'); // XXX Apparently in Node 0.12 this event was called 'prefinish'.    // 224
  // https://github.com/joyent/node/commit/7c9b6070                                                                   // 226
  // But it has switched back to 'finish' in Node v4:                                                                 // 227
  // https://github.com/nodejs/node/pull/1411                                                                         // 228
                                                                                                                      //
  res.removeAllListeners('finish');                                                                                   // 229
  res.on('finish', function () {                                                                                      // 230
    res.setTimeout(SHORT_SOCKET_TIMEOUT);                                                                             // 231
  });                                                                                                                 // 232
                                                                                                                      //
  _.each(finishListeners, function (l) {                                                                              // 233
    res.on('finish', l);                                                                                              // 233
  });                                                                                                                 // 233
}; // Will be updated by main before we listen.                                                                       // 234
// Map from client arch to boilerplate object.                                                                        // 238
// Boilerplate object has:                                                                                            // 239
//   - func: XXX                                                                                                      // 240
//   - baseData: XXX                                                                                                  // 241
                                                                                                                      //
                                                                                                                      //
var boilerplateByArch = {}; // Given a request (as returned from `categorizeRequest`), return the                     // 242
// boilerplate HTML to serve for that request.                                                                        // 245
//                                                                                                                    // 246
// If a previous connect middleware has rendered content for the head or body,                                        // 247
// returns the boilerplate with that content patched in otherwise                                                     // 248
// memoizes on HTML attributes (used by, eg, appcache) and whether inline                                             // 249
// scripts are currently allowed.                                                                                     // 250
// XXX so far this function is always called with arch === 'web.browser'                                              // 251
                                                                                                                      //
var memoizedBoilerplate = {};                                                                                         // 252
                                                                                                                      //
var getBoilerplate = function (request, arch) {                                                                       // 253
  var useMemoized = !(request.dynamicHead || request.dynamicBody);                                                    // 254
  var htmlAttributes = getHtmlAttributes(request);                                                                    // 255
                                                                                                                      //
  if (useMemoized) {                                                                                                  // 257
    // The only thing that changes from request to request (unless extra                                              // 258
    // content is added to the head or body) are the HTML attributes                                                  // 259
    // (used by, eg, appcache) and whether inline scripts are allowed, so we                                          // 260
    // can memoize based on that.                                                                                     // 261
    var memHash = JSON.stringify({                                                                                    // 262
      inlineScriptsAllowed: inlineScriptsAllowed,                                                                     // 263
      htmlAttributes: htmlAttributes,                                                                                 // 264
      arch: arch                                                                                                      // 265
    });                                                                                                               // 262
                                                                                                                      //
    if (!memoizedBoilerplate[memHash]) {                                                                              // 268
      memoizedBoilerplate[memHash] = boilerplateByArch[arch].toHTML({                                                 // 269
        htmlAttributes: htmlAttributes                                                                                // 270
      });                                                                                                             // 269
    }                                                                                                                 // 272
                                                                                                                      //
    return memoizedBoilerplate[memHash];                                                                              // 273
  }                                                                                                                   // 274
                                                                                                                      //
  var boilerplateOptions = _.extend({                                                                                 // 276
    htmlAttributes: htmlAttributes                                                                                    // 277
  }, _.pick(request, 'dynamicHead', 'dynamicBody'));                                                                  // 276
                                                                                                                      //
  return boilerplateByArch[arch].toHTML(boilerplateOptions);                                                          // 280
};                                                                                                                    // 281
                                                                                                                      //
WebAppInternals.generateBoilerplateInstance = function (arch, manifest, additionalOptions) {                          // 283
  additionalOptions = additionalOptions || {};                                                                        // 286
                                                                                                                      //
  var runtimeConfig = _.extend(_.clone(__meteor_runtime_config__), additionalOptions.runtimeConfigOverrides || {});   // 288
                                                                                                                      //
  return new Boilerplate(arch, manifest, _.extend({                                                                   // 292
    pathMapper: function (itemPath) {                                                                                 // 294
      return path.join(archPath[arch], itemPath);                                                                     // 295
    },                                                                                                                // 295
    baseDataExtension: {                                                                                              // 296
      additionalStaticJs: _.map(additionalStaticJs || [], function (contents, pathname) {                             // 297
        return {                                                                                                      // 300
          pathname: pathname,                                                                                         // 301
          contents: contents                                                                                          // 302
        };                                                                                                            // 300
      }),                                                                                                             // 304
      // Convert to a JSON string, then get rid of most weird characters, then                                        // 306
      // wrap in double quotes. (The outermost JSON.stringify really ought to                                         // 307
      // just be "wrap in double quotes" but we use it to be safe.) This might                                        // 308
      // end up inside a <script> tag so we need to be careful to not include                                         // 309
      // "</script>", but normal {{spacebars}} escaping escapes too much! See                                         // 310
      // https://github.com/meteor/meteor/issues/3730                                                                 // 311
      meteorRuntimeConfig: JSON.stringify(encodeURIComponent(JSON.stringify(runtimeConfig))),                         // 312
      rootUrlPathPrefix: __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '',                                        // 314
      bundledJsCssUrlRewriteHook: bundledJsCssUrlRewriteHook,                                                         // 315
      inlineScriptsAllowed: WebAppInternals.inlineScriptsAllowed(),                                                   // 316
      inline: additionalOptions.inline                                                                                // 317
    }                                                                                                                 // 296
  }, additionalOptions));                                                                                             // 293
}; // A mapping from url path to "info". Where "info" has the following fields:                                       // 321
// - type: the type of file to be served                                                                              // 324
// - cacheable: optionally, whether the file should be cached or not                                                  // 325
// - sourceMapUrl: optionally, the url of the source map                                                              // 326
//                                                                                                                    // 327
// Info also contains one of the following:                                                                           // 328
// - content: the stringified content that should be served at this path                                              // 329
// - absolutePath: the absolute path on disk to the file                                                              // 330
                                                                                                                      //
                                                                                                                      //
var staticFiles; // Serve static files from the manifest or added with                                                // 332
// `addStaticJs`. Exported for tests.                                                                                 // 335
                                                                                                                      //
WebAppInternals.staticFilesMiddleware = function (staticFiles, req, res, next) {                                      // 336
  if ('GET' != req.method && 'HEAD' != req.method && 'OPTIONS' != req.method) {                                       // 337
    next();                                                                                                           // 338
    return;                                                                                                           // 339
  }                                                                                                                   // 340
                                                                                                                      //
  var pathname = parseurl(req).pathname;                                                                              // 341
                                                                                                                      //
  try {                                                                                                               // 342
    pathname = decodeURIComponent(pathname);                                                                          // 343
  } catch (e) {                                                                                                       // 344
    next();                                                                                                           // 345
    return;                                                                                                           // 346
  }                                                                                                                   // 347
                                                                                                                      //
  var serveStaticJs = function (s) {                                                                                  // 349
    res.writeHead(200, {                                                                                              // 350
      'Content-type': 'application/javascript; charset=UTF-8'                                                         // 351
    });                                                                                                               // 350
    res.write(s);                                                                                                     // 353
    res.end();                                                                                                        // 354
  };                                                                                                                  // 355
                                                                                                                      //
  if (pathname === "/meteor_runtime_config.js" && !WebAppInternals.inlineScriptsAllowed()) {                          // 357
    serveStaticJs("__meteor_runtime_config__ = " + JSON.stringify(__meteor_runtime_config__) + ";");                  // 359
    return;                                                                                                           // 361
  } else if (_.has(additionalStaticJs, pathname) && !WebAppInternals.inlineScriptsAllowed()) {                        // 362
    serveStaticJs(additionalStaticJs[pathname]);                                                                      // 364
    return;                                                                                                           // 365
  }                                                                                                                   // 366
                                                                                                                      //
  if (!_.has(staticFiles, pathname)) {                                                                                // 368
    next();                                                                                                           // 369
    return;                                                                                                           // 370
  } // We don't need to call pause because, unlike 'static', once we call into                                        // 371
  // 'send' and yield to the event loop, we never call another handler with                                           // 374
  // 'next'.                                                                                                          // 375
                                                                                                                      //
                                                                                                                      //
  var info = staticFiles[pathname]; // Cacheable files are files that should never change. Typically                  // 377
  // named by their hash (eg meteor bundled js and css files).                                                        // 380
  // We cache them ~forever (1yr).                                                                                    // 381
                                                                                                                      //
  var maxAge = info.cacheable ? 1000 * 60 * 60 * 24 * 365 : 0; // Set the X-SourceMap header, which current Chrome, FireFox, and Safari
  // understand.  (The SourceMap header is slightly more spec-correct but FF                                          // 387
  // doesn't understand it.)                                                                                          // 388
  //                                                                                                                  // 389
  // You may also need to enable source maps in Chrome: open dev tools, click                                         // 390
  // the gear in the bottom right corner, and select "enable source maps".                                            // 391
                                                                                                                      //
  if (info.sourceMapUrl) {                                                                                            // 392
    res.setHeader('X-SourceMap', __meteor_runtime_config__.ROOT_URL_PATH_PREFIX + info.sourceMapUrl);                 // 393
  }                                                                                                                   // 396
                                                                                                                      //
  if (info.type === "js" || info.type === "dynamic js") {                                                             // 398
    res.setHeader("Content-Type", "application/javascript; charset=UTF-8");                                           // 400
  } else if (info.type === "css") {                                                                                   // 401
    res.setHeader("Content-Type", "text/css; charset=UTF-8");                                                         // 402
  } else if (info.type === "json") {                                                                                  // 403
    res.setHeader("Content-Type", "application/json; charset=UTF-8");                                                 // 404
  }                                                                                                                   // 405
                                                                                                                      //
  if (info.hash) {                                                                                                    // 407
    res.setHeader('ETag', '"' + info.hash + '"');                                                                     // 408
  }                                                                                                                   // 409
                                                                                                                      //
  if (info.content) {                                                                                                 // 411
    res.write(info.content);                                                                                          // 412
    res.end();                                                                                                        // 413
  } else {                                                                                                            // 414
    send(req, info.absolutePath, {                                                                                    // 415
      maxage: maxAge,                                                                                                 // 416
      dotfiles: 'allow',                                                                                              // 417
      // if we specified a dotfile in the manifest, serve it                                                          // 417
      lastModified: false // don't set last-modified based on the file date                                           // 418
                                                                                                                      //
    }).on('error', function (err) {                                                                                   // 415
      Log.error("Error serving static file " + err);                                                                  // 420
      res.writeHead(500);                                                                                             // 421
      res.end();                                                                                                      // 422
    }).on('directory', function () {                                                                                  // 423
      Log.error("Unexpected directory " + info.absolutePath);                                                         // 425
      res.writeHead(500);                                                                                             // 426
      res.end();                                                                                                      // 427
    }).pipe(res);                                                                                                     // 428
  }                                                                                                                   // 430
};                                                                                                                    // 431
                                                                                                                      //
var getUrlPrefixForArch = function (arch) {                                                                           // 433
  // XXX we rely on the fact that arch names don't contain slashes                                                    // 434
  // in that case we would need to uri escape it                                                                      // 435
  // We add '__' to the beginning of non-standard archs to "scope" the url                                            // 437
  // to Meteor internals.                                                                                             // 438
  return arch === WebApp.defaultArch ? '' : '/' + '__' + arch.replace(/^web\./, '');                                  // 439
}; // parse port to see if its a Windows Server style named pipe. If so, return as-is (String), otherwise return as Int
                                                                                                                      //
                                                                                                                      //
WebAppInternals.parsePort = function (port) {                                                                         // 444
  if (/\\\\?.+\\pipe\\?.+/.test(port)) {                                                                              // 445
    return port;                                                                                                      // 446
  }                                                                                                                   // 447
                                                                                                                      //
  return parseInt(port);                                                                                              // 449
};                                                                                                                    // 450
                                                                                                                      //
var runWebAppServer = function () {                                                                                   // 452
  var shuttingDown = false;                                                                                           // 453
  var syncQueue = new Meteor._SynchronousQueue();                                                                     // 454
                                                                                                                      //
  var getItemPathname = function (itemUrl) {                                                                          // 456
    return decodeURIComponent(url.parse(itemUrl).pathname);                                                           // 457
  };                                                                                                                  // 458
                                                                                                                      //
  WebAppInternals.reloadClientPrograms = function () {                                                                // 460
    syncQueue.runTask(function () {                                                                                   // 461
      staticFiles = {};                                                                                               // 462
                                                                                                                      //
      var generateClientProgram = function (clientPath, arch) {                                                       // 463
        // read the control for the client we'll be serving up                                                        // 464
        var clientJsonPath = path.join(__meteor_bootstrap__.serverDir, clientPath);                                   // 465
        var clientDir = path.dirname(clientJsonPath);                                                                 // 467
        var clientJson = JSON.parse(readUtf8FileSync(clientJsonPath));                                                // 468
        if (clientJson.format !== "web-program-pre1") throw new Error("Unsupported format for client assets: " + JSON.stringify(clientJson.format));
        if (!clientJsonPath || !clientDir || !clientJson) throw new Error("Client config file not parsed.");          // 473
        var urlPrefix = getUrlPrefixForArch(arch);                                                                    // 476
        var manifest = clientJson.manifest;                                                                           // 478
                                                                                                                      //
        _.each(manifest, function (item) {                                                                            // 479
          if (item.url && item.where === "client") {                                                                  // 480
            staticFiles[urlPrefix + getItemPathname(item.url)] = {                                                    // 481
              absolutePath: path.join(clientDir, item.path),                                                          // 482
              cacheable: item.cacheable,                                                                              // 483
              hash: item.hash,                                                                                        // 484
              // Link from source to its map                                                                          // 485
              sourceMapUrl: item.sourceMapUrl,                                                                        // 486
              type: item.type                                                                                         // 487
            };                                                                                                        // 481
                                                                                                                      //
            if (item.sourceMap) {                                                                                     // 490
              // Serve the source map too, under the specified URL. We assume all                                     // 491
              // source maps are cacheable.                                                                           // 492
              staticFiles[urlPrefix + getItemPathname(item.sourceMapUrl)] = {                                         // 493
                absolutePath: path.join(clientDir, item.sourceMap),                                                   // 494
                cacheable: true                                                                                       // 495
              };                                                                                                      // 493
            }                                                                                                         // 497
          }                                                                                                           // 498
        });                                                                                                           // 499
                                                                                                                      //
        var program = {                                                                                               // 501
          format: "web-program-pre1",                                                                                 // 502
          manifest: manifest,                                                                                         // 503
          version: process.env.AUTOUPDATE_VERSION || WebAppHashing.calculateClientHash(manifest, null, _.pick(__meteor_runtime_config__, "PUBLIC_SETTINGS")),
          cordovaCompatibilityVersions: clientJson.cordovaCompatibilityVersions,                                      // 510
          PUBLIC_SETTINGS: __meteor_runtime_config__.PUBLIC_SETTINGS                                                  // 511
        };                                                                                                            // 501
        WebApp.clientPrograms[arch] = program; // Serve the program as a string at /foo/<arch>/manifest.json          // 514
        // XXX change manifest.json -> program.json                                                                   // 517
                                                                                                                      //
        staticFiles[urlPrefix + getItemPathname('/manifest.json')] = {                                                // 518
          content: JSON.stringify(program),                                                                           // 519
          cacheable: false,                                                                                           // 520
          hash: program.version,                                                                                      // 521
          type: "json"                                                                                                // 522
        };                                                                                                            // 518
      };                                                                                                              // 524
                                                                                                                      //
      try {                                                                                                           // 526
        var clientPaths = __meteor_bootstrap__.configJson.clientPaths;                                                // 527
                                                                                                                      //
        _.each(clientPaths, function (clientPath, arch) {                                                             // 528
          archPath[arch] = path.dirname(clientPath);                                                                  // 529
          generateClientProgram(clientPath, arch);                                                                    // 530
        }); // Exported for tests.                                                                                    // 531
                                                                                                                      //
                                                                                                                      //
        WebAppInternals.staticFiles = staticFiles;                                                                    // 534
      } catch (e) {                                                                                                   // 535
        Log.error("Error reloading the client program: " + e.stack);                                                  // 536
        process.exit(1);                                                                                              // 537
      }                                                                                                               // 538
    });                                                                                                               // 539
  };                                                                                                                  // 540
                                                                                                                      //
  WebAppInternals.generateBoilerplate = function () {                                                                 // 542
    // This boilerplate will be served to the mobile devices when used with                                           // 543
    // Meteor/Cordova for the Hot-Code Push and since the file will be served by                                      // 544
    // the device's server, it is important to set the DDP url to the actual                                          // 545
    // Meteor server accepting DDP connections and not the device's file server.                                      // 546
    var defaultOptionsForArch = {                                                                                     // 547
      'web.cordova': {                                                                                                // 548
        runtimeConfigOverrides: {                                                                                     // 549
          // XXX We use absoluteUrl() here so that we serve https://                                                  // 550
          // URLs to cordova clients if force-ssl is in use. If we were                                               // 551
          // to use __meteor_runtime_config__.ROOT_URL instead of                                                     // 552
          // absoluteUrl(), then Cordova clients would immediately get a                                              // 553
          // HCP setting their DDP_DEFAULT_CONNECTION_URL to                                                          // 554
          // http://example.meteor.com. This breaks the app, because                                                  // 555
          // force-ssl doesn't serve CORS headers on 302                                                              // 556
          // redirects. (Plus it's undesirable to have clients                                                        // 557
          // connecting to http://example.meteor.com when force-ssl is                                                // 558
          // in use.)                                                                                                 // 559
          DDP_DEFAULT_CONNECTION_URL: process.env.MOBILE_DDP_URL || Meteor.absoluteUrl(),                             // 560
          ROOT_URL: process.env.MOBILE_ROOT_URL || Meteor.absoluteUrl()                                               // 562
        }                                                                                                             // 549
      }                                                                                                               // 548
    };                                                                                                                // 547
    syncQueue.runTask(function () {                                                                                   // 568
      _.each(WebApp.clientPrograms, function (program, archName) {                                                    // 569
        boilerplateByArch[archName] = WebAppInternals.generateBoilerplateInstance(archName, program.manifest, defaultOptionsForArch[archName]);
      }); // Clear the memoized boilerplate cache.                                                                    // 574
                                                                                                                      //
                                                                                                                      //
      memoizedBoilerplate = {}; // Configure CSS injection for the default arch                                       // 577
      // XXX implement the CSS injection for all archs?                                                               // 580
                                                                                                                      //
      var cssFiles = boilerplateByArch[WebApp.defaultArch].baseData.css; // Rewrite all CSS files (which are written directly to <style> tags)
      // by autoupdate_client to use the CDN prefix/etc                                                               // 583
                                                                                                                      //
      var allCss = _.map(cssFiles, function (cssFile) {                                                               // 584
        return {                                                                                                      // 585
          url: bundledJsCssUrlRewriteHook(cssFile.url)                                                                // 585
        };                                                                                                            // 585
      });                                                                                                             // 586
                                                                                                                      //
      WebAppInternals.refreshableAssets = {                                                                           // 587
        allCss: allCss                                                                                                // 587
      };                                                                                                              // 587
    });                                                                                                               // 588
  };                                                                                                                  // 589
                                                                                                                      //
  WebAppInternals.reloadClientPrograms(); // webserver                                                                // 591
                                                                                                                      //
  var app = connect(); // Packages and apps can add handlers that run before any other Meteor                         // 594
  // handlers via WebApp.rawConnectHandlers.                                                                          // 597
                                                                                                                      //
  var rawConnectHandlers = connect();                                                                                 // 598
  app.use(rawConnectHandlers); // Auto-compress any json, javascript, or text.                                        // 599
                                                                                                                      //
  app.use(connect.compress()); // We're not a proxy; reject (without crashing) attempts to treat us like              // 602
  // one. (See #1212.)                                                                                                // 605
                                                                                                                      //
  app.use(function (req, res, next) {                                                                                 // 606
    if (RoutePolicy.isValidUrl(req.url)) {                                                                            // 607
      next();                                                                                                         // 608
      return;                                                                                                         // 609
    }                                                                                                                 // 610
                                                                                                                      //
    res.writeHead(400);                                                                                               // 611
    res.write("Not a proxy");                                                                                         // 612
    res.end();                                                                                                        // 613
  }); // Strip off the path prefix, if it exists.                                                                     // 614
                                                                                                                      //
  app.use(function (request, response, next) {                                                                        // 617
    var pathPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;                                                  // 618
                                                                                                                      //
    var url = Npm.require('url').parse(request.url);                                                                  // 619
                                                                                                                      //
    var pathname = url.pathname; // check if the path in the url starts with the path prefix (and the part            // 620
    // after the path prefix must start with a / if it exists.)                                                       // 622
                                                                                                                      //
    if (pathPrefix && pathname.substring(0, pathPrefix.length) === pathPrefix && (pathname.length == pathPrefix.length || pathname.substring(pathPrefix.length, pathPrefix.length + 1) === "/")) {
      request.url = request.url.substring(pathPrefix.length);                                                         // 626
      next();                                                                                                         // 627
    } else if (pathname === "/favicon.ico" || pathname === "/robots.txt") {                                           // 628
      next();                                                                                                         // 629
    } else if (pathPrefix) {                                                                                          // 630
      response.writeHead(404);                                                                                        // 631
      response.write("Unknown path");                                                                                 // 632
      response.end();                                                                                                 // 633
    } else {                                                                                                          // 634
      next();                                                                                                         // 635
    }                                                                                                                 // 636
  }); // Parse the query string into res.query. Used by oauth_server, but it's                                        // 637
  // generally pretty handy..                                                                                         // 640
                                                                                                                      //
  app.use(connect.query()); // Serve static files from the manifest.                                                  // 641
  // This is inspired by the 'static' middleware.                                                                     // 644
                                                                                                                      //
  app.use(function (req, res, next) {                                                                                 // 645
    Fiber(function () {                                                                                               // 646
      WebAppInternals.staticFilesMiddleware(staticFiles, req, res, next);                                             // 647
    }).run();                                                                                                         // 648
  }); // Packages and apps can add handlers to this via WebApp.connectHandlers.                                       // 649
  // They are inserted before our default handler.                                                                    // 652
                                                                                                                      //
  var packageAndAppHandlers = connect();                                                                              // 653
  app.use(packageAndAppHandlers);                                                                                     // 654
  var suppressConnectErrors = false; // connect knows it is an error handler because it has 4 arguments instead of    // 656
  // 3. go figure.  (It is not smart enough to find such a thing if it's hidden                                       // 658
  // inside packageAndAppHandlers.)                                                                                   // 659
                                                                                                                      //
  app.use(function (err, req, res, next) {                                                                            // 660
    if (!err || !suppressConnectErrors || !req.headers['x-suppress-error']) {                                         // 661
      next(err);                                                                                                      // 662
      return;                                                                                                         // 663
    }                                                                                                                 // 664
                                                                                                                      //
    res.writeHead(err.status, {                                                                                       // 665
      'Content-Type': 'text/plain'                                                                                    // 665
    });                                                                                                               // 665
    res.end("An error message");                                                                                      // 666
  });                                                                                                                 // 667
  app.use(function (req, res, next) {                                                                                 // 669
    Fiber(function () {                                                                                               // 670
      if (!appUrl(req.url)) return next();                                                                            // 671
      var headers = {                                                                                                 // 674
        'Content-Type': 'text/html; charset=utf-8'                                                                    // 675
      };                                                                                                              // 674
      if (shuttingDown) headers['Connection'] = 'Close';                                                              // 677
      var request = WebApp.categorizeRequest(req);                                                                    // 680
                                                                                                                      //
      if (request.url.query && request.url.query['meteor_css_resource']) {                                            // 682
        // In this case, we're requesting a CSS resource in the meteor-specific                                       // 683
        // way, but we don't have it.  Serve a static css file that indicates that                                    // 684
        // we didn't have it, so we can detect that and refresh.  Make sure                                           // 685
        // that any proxies or CDNs don't cache this error!  (Normally proxies                                        // 686
        // or CDNs are smart enough not to cache error pages, but in order to                                         // 687
        // make this hack work, we need to return the CSS file as a 200, which                                        // 688
        // would otherwise be cached.)                                                                                // 689
        headers['Content-Type'] = 'text/css; charset=utf-8';                                                          // 690
        headers['Cache-Control'] = 'no-cache';                                                                        // 691
        res.writeHead(200, headers);                                                                                  // 692
        res.write(".meteor-css-not-found-error { width: 0px;}");                                                      // 693
        res.end();                                                                                                    // 694
        return undefined;                                                                                             // 695
      }                                                                                                               // 696
                                                                                                                      //
      if (request.url.query && request.url.query['meteor_js_resource']) {                                             // 698
        // Similarly, we're requesting a JS resource that we don't have.                                              // 699
        // Serve an uncached 404. (We can't use the same hack we use for CSS,                                         // 700
        // because actually acting on that hack requires us to have the JS                                            // 701
        // already!)                                                                                                  // 702
        headers['Cache-Control'] = 'no-cache';                                                                        // 703
        res.writeHead(404, headers);                                                                                  // 704
        res.end("404 Not Found");                                                                                     // 705
        return undefined;                                                                                             // 706
      }                                                                                                               // 707
                                                                                                                      //
      if (request.url.query && request.url.query['meteor_dont_serve_index']) {                                        // 709
        // When downloading files during a Cordova hot code push, we need                                             // 710
        // to detect if a file is not available instead of inadvertently                                              // 711
        // downloading the default index page.                                                                        // 712
        // So similar to the situation above, we serve an uncached 404.                                               // 713
        headers['Cache-Control'] = 'no-cache';                                                                        // 714
        res.writeHead(404, headers);                                                                                  // 715
        res.end("404 Not Found");                                                                                     // 716
        return undefined;                                                                                             // 717
      } // /packages/asdfsad ... /__cordova/dafsdf.js                                                                 // 718
                                                                                                                      //
                                                                                                                      //
      var pathname = parseurl(req).pathname;                                                                          // 721
      var archKey = pathname.split('/')[1];                                                                           // 722
      var archKeyCleaned = 'web.' + archKey.replace(/^__/, '');                                                       // 723
                                                                                                                      //
      if (!/^__/.test(archKey) || !_.has(archPath, archKeyCleaned)) {                                                 // 725
        archKey = WebApp.defaultArch;                                                                                 // 726
      } else {                                                                                                        // 727
        archKey = archKeyCleaned;                                                                                     // 728
      }                                                                                                               // 729
                                                                                                                      //
      var boilerplate;                                                                                                // 731
                                                                                                                      //
      try {                                                                                                           // 732
        boilerplate = getBoilerplate(request, archKey);                                                               // 733
      } catch (e) {                                                                                                   // 734
        Log.error("Error running template: " + e.stack);                                                              // 735
        res.writeHead(500, headers);                                                                                  // 736
        res.end();                                                                                                    // 737
        return undefined;                                                                                             // 738
      }                                                                                                               // 739
                                                                                                                      //
      var statusCode = res.statusCode ? res.statusCode : 200;                                                         // 741
      res.writeHead(statusCode, headers);                                                                             // 742
      res.write(boilerplate);                                                                                         // 743
      res.end();                                                                                                      // 744
      return undefined;                                                                                               // 745
    }).run();                                                                                                         // 746
  }); // Return 404 by default, if no other handlers serve this URL.                                                  // 747
                                                                                                                      //
  app.use(function (req, res) {                                                                                       // 750
    res.writeHead(404);                                                                                               // 751
    res.end();                                                                                                        // 752
  });                                                                                                                 // 753
  var httpServer = http.createServer(app);                                                                            // 756
  var onListeningCallbacks = []; // After 5 seconds w/o data on a socket, kill it.  On the other hand, if             // 757
  // there's an outstanding request, give it a higher timeout instead (to avoid                                       // 760
  // killing long-polling requests)                                                                                   // 761
                                                                                                                      //
  httpServer.setTimeout(SHORT_SOCKET_TIMEOUT); // Do this here, and then also in livedata/stream_server.js, because   // 762
  // stream_server.js kills all the current request handlers when installing its                                      // 765
  // own.                                                                                                             // 766
                                                                                                                      //
  httpServer.on('request', WebApp._timeoutAdjustmentRequestCallback); // If the client gave us a bad request, tell it instead of just closing the
  // socket. This lets load balancers in front of us differentiate between "a                                         // 770
  // server is randomly closing sockets for no reason" and "client sent a bad                                         // 771
  // request".                                                                                                        // 772
  //                                                                                                                  // 773
  // This will only work on Node 6; Node 4 destroys the socket before calling                                         // 774
  // this event. See https://github.com/nodejs/node/pull/4557/ for details.                                           // 775
                                                                                                                      //
  httpServer.on('clientError', function (err, socket) {                                                               // 776
    // Pre-Node-6, do nothing.                                                                                        // 777
    if (socket.destroyed) {                                                                                           // 778
      return;                                                                                                         // 779
    }                                                                                                                 // 780
                                                                                                                      //
    if (err.message === 'Parse Error') {                                                                              // 782
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');                                                                 // 783
    } else {                                                                                                          // 784
      // For other errors, use the default behavior as if we had no clientError                                       // 785
      // handler.                                                                                                     // 786
      socket.destroy(err);                                                                                            // 787
    }                                                                                                                 // 788
  }); // start up app                                                                                                 // 789
                                                                                                                      //
  _.extend(WebApp, {                                                                                                  // 792
    connectHandlers: packageAndAppHandlers,                                                                           // 793
    rawConnectHandlers: rawConnectHandlers,                                                                           // 794
    httpServer: httpServer,                                                                                           // 795
    connectApp: app,                                                                                                  // 796
    // For testing.                                                                                                   // 797
    suppressConnectErrors: function () {                                                                              // 798
      suppressConnectErrors = true;                                                                                   // 799
    },                                                                                                                // 800
    onListening: function (f) {                                                                                       // 801
      if (onListeningCallbacks) onListeningCallbacks.push(f);else f();                                                // 802
    }                                                                                                                 // 806
  }); // Let the rest of the packages (and Meteor.startup hooks) insert connect                                       // 792
  // middlewares and update __meteor_runtime_config__, then keep going to set up                                      // 810
  // actually serving HTML.                                                                                           // 811
                                                                                                                      //
                                                                                                                      //
  main = function (argv) {                                                                                            // 812
    WebAppInternals.generateBoilerplate(); // only start listening after all the startup code has run.                // 813
                                                                                                                      //
    var localPort = WebAppInternals.parsePort(process.env.PORT) || 0;                                                 // 816
    var host = process.env.BIND_IP;                                                                                   // 817
    var localIp = host || '0.0.0.0';                                                                                  // 818
    httpServer.listen(localPort, localIp, Meteor.bindEnvironment(function () {                                        // 819
      if (process.env.METEOR_PRINT_ON_LISTEN) console.log("LISTENING"); // must match run-app.js                      // 820
                                                                                                                      //
      var callbacks = onListeningCallbacks;                                                                           // 823
      onListeningCallbacks = null;                                                                                    // 824
                                                                                                                      //
      _.each(callbacks, function (x) {                                                                                // 825
        x();                                                                                                          // 825
      });                                                                                                             // 825
    }, function (e) {                                                                                                 // 827
      console.error("Error listening:", e);                                                                           // 828
      console.error(e && e.stack);                                                                                    // 829
    }));                                                                                                              // 830
    return 'DAEMON';                                                                                                  // 832
  };                                                                                                                  // 833
};                                                                                                                    // 834
                                                                                                                      //
runWebAppServer();                                                                                                    // 837
var inlineScriptsAllowed = true;                                                                                      // 840
                                                                                                                      //
WebAppInternals.inlineScriptsAllowed = function () {                                                                  // 842
  return inlineScriptsAllowed;                                                                                        // 843
};                                                                                                                    // 844
                                                                                                                      //
WebAppInternals.setInlineScriptsAllowed = function (value) {                                                          // 846
  inlineScriptsAllowed = value;                                                                                       // 847
  WebAppInternals.generateBoilerplate();                                                                              // 848
};                                                                                                                    // 849
                                                                                                                      //
WebAppInternals.setBundledJsCssUrlRewriteHook = function (hookFn) {                                                   // 852
  bundledJsCssUrlRewriteHook = hookFn;                                                                                // 853
  WebAppInternals.generateBoilerplate();                                                                              // 854
};                                                                                                                    // 855
                                                                                                                      //
WebAppInternals.setBundledJsCssPrefix = function (prefix) {                                                           // 857
  var self = this;                                                                                                    // 858
  self.setBundledJsCssUrlRewriteHook(function (url) {                                                                 // 859
    return prefix + url;                                                                                              // 861
  });                                                                                                                 // 862
}; // Packages can call `WebAppInternals.addStaticJs` to specify static                                               // 863
// JavaScript to be included in the app. This static JS will be inlined,                                              // 866
// unless inline scripts have been disabled, in which case it will be                                                 // 867
// served under `/<sha1 of contents>`.                                                                                // 868
                                                                                                                      //
                                                                                                                      //
var additionalStaticJs = {};                                                                                          // 869
                                                                                                                      //
WebAppInternals.addStaticJs = function (contents) {                                                                   // 870
  additionalStaticJs["/" + sha1(contents) + ".js"] = contents;                                                        // 871
}; // Exported for tests                                                                                              // 872
                                                                                                                      //
                                                                                                                      //
WebAppInternals.getBoilerplate = getBoilerplate;                                                                      // 875
WebAppInternals.additionalStaticJs = additionalStaticJs;                                                              // 876
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/webapp/webapp_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.webapp = {}, {
  WebApp: WebApp,
  main: main,
  WebAppInternals: WebAppInternals
});

})();

//# sourceMappingURL=webapp.js.map
