const rwClient = require('./client.js');

const tweet = async () => {
  try {
    await rwClient.v1.tweet('A backwards poet writes inverse.');
  } catch (e) {
    console.error(e);
  }
};

tweet();
