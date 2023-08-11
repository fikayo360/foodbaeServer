import { createJWT, isTokenValid } from './jwt';
import createTokenUser from './createTokenUser'; // Use the "import = require()" syntax for CommonJS

//import { checkPermissions } from './checkPermissions'; // ES module import

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser
};
