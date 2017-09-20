(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var _, lodash;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/stevezhu_lodash/server.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
_ = lodash = Npm.require('lodash');

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['stevezhu:lodash'] = {}, {
  lodash: lodash,
  _: _
});

})();
