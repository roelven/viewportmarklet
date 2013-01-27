/*-------------------------------------------------------------------- 
 * Viewportmarklet / a bookmarklet to see the current viewport size
 * by Roel van der Ven (hello@roelvanderven.com), http://roelvanderven.com
 * 
 * You can load this javascript in your webpage as a helpful tool,
 * or minify it and add it as a bookmarklet to your browser.
--------------------------------------------------------------------*/

var attemptCount = 0;

// Load jQuery protocol agnostic if it hasen't happened yet.
if (typeof jQuery == 'undefined') {
  (function(d,t){var q=d.createElement(t),s=d.getElementsByTagName(t)[0];
  q.src=location.protocol+'//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
  s.parentNode.insertBefore(q,s)}(document,'script'));
}

// Actual jQuery code goes here
function init() {
  if (arguments.callee.done) return;

  var j = jQuery.noConflict();

  // toEm() loosely inspired after https://github.com/arasbm/jQuery-Pixel-Em-Converter
  function toEm(value) {
    var that = parseInt(value,10),
      scopeTest = j('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo('body'),
    scopeVal = scopeTest.height();
    scopeTest.remove();
    return (that / scopeVal).toFixed(2) + 'em';
  };

  // Add div to <body>
  j('body').append('<div style="position:fixed;top:5px;left:5px;margin-right:5px;font-family:courier,monospace;font-size:12px;color:#fff;border:1px solid #f89406;background:#f89406;padding: 2px 6px;" id="viewportwidth"></div>');
  j(window).resize(function() {
    j('#viewportwidth').html(j(window).width() + 'px / ' + toEm(j(window).width()));
  });
  j(window).resize();

}

// This code is taken from http://neighborhood.org/core/sample/jquery/append-to-head.htm
function waitForJQuery() {
  attemptCount++;
  if (typeof jQuery != 'undefined') {
    init();
    return;
  }
  if (attemptCount < 100) {
    setTimeout(waitForJQuery, 100);
  }
  return;
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', init, false);
} else if (document.attachEvent) {
  waitForJQuery();
}

waitForJQuery();

window.onload = init;