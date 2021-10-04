const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'Tt5cxQBjWFZrpg6SGKolODuJd',
  consumer_key: 'l0PYbiy1rS1fuCOMAwyZ222bLOyi1kGdjOltn5ljnvJIRG53EZ',
  access_token_key: '1239741750983319552-eEVpOtzQFdK3X6oueOGs5Kg1vyyQ0Z',
  access_token_secret: 'VJ8WdBwU9NtIuF0ZI1Z8yHNAz1zQLIgRRJa7TnznXYOnv',
  bearer_token:
    'AAAAAAAAAAAAAAAAAAAAAJWXUAEAAAAAjERZ0Ew0PnAMTz0lDkc9vm8L7Ls%3DoNUAYyhKxgZL30fU5RA5emPTu2F8795498TAJ2Sjp5yS6qqjnN',
});

// twitter list ids accroding to categories
const categories = {
  crypto: '875371355570487296',
  programming: '1324307536300761088',
  thinkers: '1311718915249254401',
};

//getting tweets with respect to twitter list_ids
router.get('/tweets', async (req, res, next) => {
  try {
    const { q } = req.query;
    let params = {
      list_id: categories[q],
      count: 1,
      include_rts: false,
    };
    const tweetInfo = await client.get('lists/statuses.json', params);
    let arr = [];

    tweetInfo.forEach((t) => {
      arr.push(t.text);
    });
    res.send(arr);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
