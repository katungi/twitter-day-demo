const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// give the client read/write permissions

const rwClient = client.readWrite;

module.exports = rwClient;
