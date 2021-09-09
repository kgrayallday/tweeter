$(document).ready(function() {
  // --- our code goes here ---

  const $tweetText = $('#tweet-text');
  

  $tweetText.on('keyup', function (event) {
    
    const myInput = $(this)[0].value;
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