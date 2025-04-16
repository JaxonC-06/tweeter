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
    const tweetDate = timeago.format(tweet.created_at);
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src=${tweet.user.avatars}>
            <p>${tweet.user.name}</p>
          </div>
          <h4 class="user-handle">${tweet.user.handle}</h4>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <p>${tweetDate}</p>
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
      $('#tweets-container').prepend($tweet);
    }
  };

  // Form submission w/ jQuery
  $('form').on('submit', function(event) {
    if (isTweetValid()) {
      $.ajax({
        url: "/api/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: (response) => {
          const newTweetElement = createTweetElement(response);
          $('#tweets-container').prepend(newTweetElement);
        }
      });
    }

    event.preventDefault();
  });

  // Fetching tweets w/ AJAX
  const loadTweets = function() {
    $.ajax({
      url: "/api/tweets",
      success: (data) => {
        renderTweets(data);
      }
    })
    .fail(() => {
      alert("There was an error loading the requested page");
    });
  };

  loadTweets();
});

const isTweetValid = function() {
  const tweetLength = $('textarea').val().trim().length;
    if (tweetLength === 0) {
      alert("Your tweet is empty!");
    } else if (tweetLength > 140) {
      alert("Your tweet exceeds the maximum character size!");
    } else {
      return true;
    }
}