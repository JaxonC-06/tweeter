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
    const tweetFromUser = tweet.content.text;
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src=${tweet.user.avatars}>
            <p>${tweet.user.name}</p>
          </div>
          <h4 class="user-handle">${tweet.user.handle}</h4>
        </header>
        <p>${escapeText(tweetFromUser)}</p>
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

  // Slide #new-tweet down when the button is clicked
  $('.fa-angles-down').on('click', function() {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
    $(this).toggleClass('end-animation');
  });

  // Automatically grow the textarea when a user needs multiple lines
  $('#tweet-text').on('input', function() {
    this.style.height = '35px';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // Form submission w/ jQuery
  $('form').on('submit', function(event) {
    if (isTweetValid()) {
      $.ajax({
        url: "/api/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: () => {
          this.reset();
          $('.counter').text(140);
          loadTweets();
        }
      });
    }

    event.preventDefault();
  });

  // Display the back-to-top button if the user has scrolled down
  $(document).on('scroll', function() {
    if ($(document).scrollTop() > 0) {
      $('#back-to-top').show('slow');
    } else {
      $('#back-to-top').hide('slow');
    }
  });

  // Scroll to top if the user clicks back-to-top button
  $('#back-to-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
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
    $('.error-message').empty();
    let $error = (`
      <p class="error-message bounce">Your tweet is empty!</p>
    `);
    $('.error-message').slideDown();
    $('.new-tweet').prepend($error);
    return false;
  } else if (tweetLength > 140) {
    $('.error-message').empty();
    let $error = (`
      <p class="error-message bounce">Your tweet exceeds the maximum tweet size!</p>
    `);
    $('.new-tweet').prepend($error);
    return false;
  } else {
    $('.error-message').slideUp();
    return true;
  }
};

const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};