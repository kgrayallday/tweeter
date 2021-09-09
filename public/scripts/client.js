$(() => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

    console.log('what the form looks like: ', $form);
    const data = $form.serialize();

    const rawInput = $(this).find('input').val();
    console.log('raw input ', rawInput);

    if (rawInput.length > 140) {
      alert('You can only do 140 characters');
      return false;
    }
    if (rawInput === '' || rawInput === null){
      alert('you cant submit nothing');
      return false;
    }

    // AJAX
    $.post("/tweets", data, res => {
      console.log(res);
      loadTweets()
    });
  });

  loadTweets()
});