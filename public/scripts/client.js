$(() => {

  // Tweet <article> template
  const createTweetElement = (tweet) => {
    const $tweet = 
      `<article>
        <header>
          <div class="user-icon-name">
            <img src="${tweet.user.avatars}" class="fas fa-user-astronaut" />
            <h2>${tweet.user.name}</h2>
          </div>
          <div class="user-tag">
            <h3>${tweet.user.handle}</h3>
          </div>
        </header>
        <div class="post-content">
        <p>${tweet.content.text}</p>
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

  const renderTweets = function(tweets) {
    for (let key in tweets) {
      $('#tweets-container').prepend(createTweetElement(tweets[key]));
    }
  }

  const loadTweets = function () {
    $.get('/tweets', response => {
      renderTweets(response);
    });
  };

  // grabs form data and posts to $tweets

  $('form').submit(function(event) {
    
    event.preventDefault();
    const $form = $(this);
    const data = $form.serialize();
    // AJAX
    $.post("/tweets", data, res => {
      console.log(res);
      loadTweets()
    });
  });



  loadTweets()



});