const { readFile } = require('../fileReadWriteUtils');

const getBearerToken = (bearerHeader = '') => bearerHeader.split(' ')[1];
const validTokens = readFile('./auth/tokens.json');

const isAdmin = (bearerHeader) => {
  return validTokens.admin === getBearerToken(bearerHeader);
}

const isUser = (bearerHeader) => {
  return validTokens.user === getBearerToken(bearerHeader);
}

module.exports = { getBearerToken, isAdmin, isUser };