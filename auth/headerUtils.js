const { readFile } = require('../fileReadWriteUtils');

const getBearerToken = (bearerHeader = '') => bearerHeader.split(' ')[1];
const validTokens = readFile('./auth/tokens.json');

const isAdmin = (bearerHeader) => {
  return validTokens.admin ? validTokens.admin === getBearerToken(bearerHeader) : false;
}

const isUser = (bearerHeader) => {
  return validTokens.user ? validTokens.user === getBearerToken(bearerHeader) : false;
}

module.exports = { getBearerToken, isAdmin, isUser };
