/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  /**
 * Returns <article> element with structured HTML
 * @param {Object} tweet - Tweet data and content
 * @returns {string} - The tweet formatted in HTML
 */
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <i class="fa-solid fa-user-check"></i>
            <p>${tweet.user.name}</p>
          </div>
          <h4 class="user-handle">${tweet.user.handle}</h4>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <p>${tweet.created_at}</p>
          <div>
            <i class="fa-solid fa-flag tweet-reactions"></i>
            <i class="fa-solid fa-retweet tweet-reactions"></i>
            <i class="fa-solid fa-heart tweet-reactions"></i>
          </div>
        </footer>
      </article>
    `);
  
    return $tweet;
  };

  // Append each tweet to the existing html
  const renderTweets = function(tweetArray) {
    for (const tweet of tweetArray) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }

  // Hard-coded initial-tweets data
  const tweetsData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(tweetsData);
});