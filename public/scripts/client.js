$(() => {

  // Tweet <article> template
  const createTweetElement = (tweet) => {
    const $tweet = 
      `<article>
        <header>
          <div class="user-icon-name">
            <img src="${escape(tweet.user.avatars)}" class="fas fa-user-astronaut" />
            <h2>${escape(tweet.user.name)}</h2>
          </div>
          <div class="user-tag">
            <h3>${escape(tweet.user.handle)}</h3>
          </div>
        </header>
        <div class="post-content">
        <p>${escape(tweet.content.text)}</p>
        </div>
        <div class="div-line"></div>
        <footer class="article-footer">
          <div class="post-age">
            <h6>${timeago.format(tweet.created_at)}</h6>
          </div>
          <div class="spacer"></div>
          <div class="interact">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <!-- <i class="fas fa-recycle"></i> -->
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`;
    return $tweet;
  }

  // auto size textarea input
  $('#tweet-text').on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // (re)draws tweet article to tweet container div
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty()
    for (let tweet in tweets) {
      $('#tweets-container').prepend(createTweetElement(tweets[tweet]));
    }
  }

  // queries the db for tweets
  const loadTweets = function () {
    $.get('/tweets', response => {
      renderTweets(response);
    });
  };


  // on submit posts tweet and reloads tweets
  $('form').submit(function(event) {
    event.preventDefault();
    const $form = $(this);
    const data = $form.serialize();
    const rawInput = $(this).find('textarea').val();
  
    if (rawInput && !rawInput.trim()) {
      $('.error-msg')
      .html("<p> You cannot post whitespace only </p>")
      .slideDown(700, function() {
        $('.error-msg').delay(6000).slideUp(700);
      });
      $(this).trigger('reset');
      return false;
    }

    if (rawInput.length > 140) {
      $('.error-msg')
        .html("<p> Post must be under <u>140</u> characters.</p>")
        .slideDown(700, function() {
          $('.error-msg').delay(6000).slideUp(700);
        });
        $(this).trigger('reset');
      return false;
    }

    if (rawInput === '' || rawInput === null){
      $('.error-msg')
        .html("<p>you have to post <em>something!<em></p>")
        .slideDown(700, function() {
          $('.error-msg').delay(6000).slideUp(700);
        });
        $(this).trigger('reset');
      return false;
    }

    // AJAX POST
    $.post("/tweets", data, res => {
      $('.error-msg').slideUp();
      $(this).trigger('reset');
      loadTweets();
    });
  });
  loadTweets()
});

// prevent XSS / INJECTION
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
