// Print all of the news items on hackernews
var jsdom = require('jsdom');

jsdom.env('http://news.ycombinator.com/', [
  'http://code.jquery.com/jquery-1.5.min.js'
], function(errors, window) {
  var $ = window.$;

  console.log('HN Links');
  $('td.title:not(:last) a').each(function() {
    console.log(' -', $(this).text());
  });
});

