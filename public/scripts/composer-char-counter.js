$(document).ready(function() {

  const $tweetText = $('#tweet-text');

  $tweetText.on('keyup', function (event) {
    const $charCounter = $(this).parent().find('output');
    const chars = event.target.value.length;
    const maxChars = 140;
    $charCounter.val(maxChars - chars);

    if (chars > maxChars) {
      $charCounter.css('color', 'red');
    }

    if (chars < maxChars) {
      $charCounter.css('color', 'blue');
    }
  });
});