const express = require('express')
const app = express()

const cors = require('cors')
require('dotenv').config();

var twit = require('twit');

const Twitter = new twit({
  consumer_key:         process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret:      process.env.REACT_APP_CONSUMER_TOKEN,
  access_token:         process.env.REACT_APP_ACCESS_TOKEN,
  access_token_secret:  process.env.REACT_APP_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

app.use(cors())
app.get('/twitter-search', async function (req, res) {
    const {q, count= 10} = req.query
    // make sure user will hit the search button without input any term
    if(q) {

        Twitter.get('search/tweets', { q: q, count: count }, function(err, data, response) {
           if (err) {
                console.log("Error: " + err.message);
                res.status(500).send(JSON.stringify(err.message))
            }

            res.status(200).send(JSON.stringify(data.statuses))
          })
    }
    else {
        res.status(500).send(JSON.stringify('No Search Term received'))
    }
})

app.listen(8080, function() {
    console.log('Server is listening on port 8080')
});