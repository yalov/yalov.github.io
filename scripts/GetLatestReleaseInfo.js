function TimeAgo (date1, date2) {
  var oneHour = 60 * 60 * 1000;
  var oneDay = 24 * oneHour;
  var dateDiff = date2 - date1;
  var timeAgo;
  if (dateDiff < oneDay) {
    var hours = dateDiff / oneHour;
    timeAgo = hours.toFixed(1) + ' hours ago';
  } else {
    var days = dateDiff / oneDay;
    if (days < 100) {
      timeAgo = (days).toFixed(1) + ' days ago';
    } else {
      timeAgo = (days).toFixed(0) + ' days ago';
    }
  }
  return timeAgo;
}

function ToLongString (date) {
  var monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  var day = ('0' + date.getDate()).slice(-2);
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function GetRepo (Url, ClassName) {
  $.getJSON(Url).done(function (json) {
    var date = new Date(json.pushed_at);

    $('.last-push-' + ClassName).html(ToLongString(date));
    $('.last-push-' + ClassName).fadeIn(0);
  });
}

function GetLatestReleaseInfo (Url, ClassName) {
  $.getJSON(Url).done(function (json) {
    var totalDownloadCount = 0;
    if (json.length !== 0) {
      for (var i1 = 0; i1 < json.length; i1++) {
        var count = 0;
        for (var i2 = 0; i2 < json[i1].assets.length; i2++) {
          count += json[i1].assets[i2].download_count;
        }
        totalDownloadCount += count;
      }

      var release = json[0];
      var downlink = '';
      if (release.assets) {
        for (var i = 0; i < release.assets.length; i++) {
          var size = release.assets[i].size;
          var sizeb = '';
          if (size < 800) {
            sizeb = ' B';
          } else {
            size /= 1024;
            if (size < 800) {
              sizeb = ' KiB';
            } else {
              size /= 1024;
              sizeb = ' MiB';
            }
          }

          if (size >= 100) {
            size = size.toFixed(0);
          } else if (size >= 10) {
            size = size.toFixed(1);
          } else {
            size = size.toFixed(2);
          }

          downlink += '<nobr><a href = "' + release.assets[i].browser_download_url + '">' + 'Download.' + release.assets[i].name.split('.').pop() + '</a> ' + '(' + size.toString() + sizeb + ')</nobr><br>';

          if (i !== release.assets.length - 1) downlink += '\n';
        }
      }

      $('.version-' + ClassName).html(release.tag_name);
      $('.version-' + ClassName).fadeIn(0);

      $('.download-count-' + ClassName).html(totalDownloadCount.toString());
      $('.download-count-' + ClassName).fadeIn(0);

      if (downlink) {
        $('.release-links-' + ClassName).html(downlink);
        $('.release-links-' + ClassName).fadeIn(0);

        var timeAgo = TimeAgo(new Date(release.published_at), new Date());
        $('.release-date-' + ClassName).html('<nobr>(Released ' + timeAgo + ')</nobr>');
        $('.release-date-' + ClassName).fadeIn(0);
      }
    }
  });
}
