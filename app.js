const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken')
const appUsers = require('./auth/appUsers');
const { getBearerToken, isAdmin, isUser } = require('./auth/headerUtils');
const { readFile, writeToFile } = require('./fileReadWriteUtils');

const app = new Koa(),
  router = new Router();

// Body parser middleware
app.use(bodyParser());

router.post('/login', (ctx) => {
  const { request: { body: { username, pwd } } } = ctx;

  if (appUsers[username] && appUsers[username] === pwd) {
    const token = jwt.sign({ user: username }, pwd);

    // typically stored in a database, but added to tokens.json file here to use for future auth
    const currentTokens = readFile('./auth/tokens.json');
    const updatedTokens = { ...currentTokens, [username]: token };
    writeToFile('./auth/tokens.json', updatedTokens);

    ctx.body = {
      authToken: token
    };
  } else {
    ctx.throw(401, 'Invalid credentials');
  }
})

router.post('/logout', (ctx) => {
  const { request: { headers } } = ctx;

  const authHeader = headers.authorization;
  const token = getBearerToken(authHeader);

  // remove token from tokens.json file
  const currentTokens = readFile('./auth/tokens.json');
  for (let key in currentTokens) {
    if (currentTokens[key] === token) {
      delete currentTokens[key];
    }
  }

  writeToFile('./auth/tokens.json', currentTokens);
  ctx.status = 200;
})

router.post('/message', (ctx) => {
  const { request: { body, headers } } = ctx;

  const authHeader = headers.authorization;
  if (!isAdmin(authHeader) && !isUser(authHeader)) {
    ctx.status = 403;
  } else {
    const currentMessageStats = readFile('./messageStats.json');
    const updatedNumOfMessageCalls = ++currentMessageStats.numberOfCalls;
    const updatedMessageStats = {
      lastMessage: {
        from: body.from,
        to: body.to,
        message: body.message
      },
      numberOfCalls: updatedNumOfMessageCalls
    };

    writeToFile('./messageStats.json', updatedMessageStats);
    ctx.status = 204;
  }
})

router.get('/stats', (ctx) => {
  const { request: { headers } } = ctx;

  const authHeader = headers.authorization;
  if (!isAdmin(authHeader)) {
    ctx.status = 403;
  } else {
    const messageStats = readFile('./messageStats.json');
    ctx.body = messageStats;
  }
});

// Router middleware 
app.use(router.routes());

app.listen(3000, () => console.log('Server started on port 3000...'));