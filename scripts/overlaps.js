var overlaps = (function () {
  function getPositions (elem) {
    var pos, width, height;
    pos = $(elem).position();
    width = $(elem).width();
    height = $(elem).height();
    return [
      [pos.left, pos.left + width],
      [pos.top, pos.top + height]
    ];
  }

  function comparePositions (p1, p2) {
    var r1, r2;
    r1 = p1[0] < p2[0] ? p1 : p2;
    r2 = p1[0] < p2[0] ? p2 : p1;
    return r1[1] > r2[0] || r1[0] === r2[0];
  }

  return function (a, b) {
    var pos1 = getPositions(a);
    var pos2 = getPositions(b);
    return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
  };
})();

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

function check () {
  var top = document.getElementsByClassName('container')[0];
  var bottom = document.getElementsByClassName('container sidebar-sticky')[0];
  var sidebar = document.getElementsByClassName('sidebar')[0];

  if (overlaps(top, bottom)) {
    sidebar.innerHTML = sidebar.innerHTML.replace(new RegExp('</div>\\s+<div class="container sidebar-sticky">', 'm'), '<br><!--overlaps-->');
  } else {
    sidebar.innerHTML = sidebar.innerHTML.replace(new RegExp('<br><!--overlaps-->', 'g'), '</div>\\n<div class="container sidebar-sticky">');
  }
}

check();
$(window).resize(function () { waitForFinalEvent(check, 70, 'some unique string'); });
