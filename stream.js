const { TwitterApi, ETwitterStreamEvent } = require('twitter-api-v2');
require('dotenv').config();

const twitterClient = new TwitterApi('Ligma');

const client = twitterClient.readWrite;

async function stream() {
  const rules = await client.v2.streamRules();

  // get and delete old rules if any
  if (rules.data?.length) {
    await client.v2.updateStreamRules({
      // for safety, delete all rules
      delete: { ids: rules.data.map((rule) => rule.id) },
    });
  }

  // add our new rules
  await client.v2.updateStreamRules({
    add: [{ value: 'Javascript' }, { value: 'NodeJs' }],
  });

  const stream = await client.v2.searchStream({
    'tweet.fields': ['referenced_tweets', 'author_id'],
    expansions: ['referenced_tweets.id'],
  });

  // since it's a stream, we want it to keep running and auto-reconnect
  stream.autoReconnect = true;

  // do something with the stream data
  stream.on(ETwitterStreamEvent.Data, async (tweet) => {
    console.log(tweet);
    // client.v2.bookmark(tweet.id);
  });
}

stream();
