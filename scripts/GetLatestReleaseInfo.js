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
    GetLatestReleaseInfo2(json, ClassName);
  });
}

function GetLatestReleaseInfo2 (json, ClassName) {
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

    $('.release-links-' + ClassName).html(downlink);
    $('.release-links-' + ClassName).fadeIn(0);
  }
}

function GetVersion(Url) {
  $.getJSON(Url).done(function (json) {
    var release = json[0];
    $('#download-url').attr('href', release.assets[0].browser_download_url);
    $('#download-url-x64').attr('href', release.assets[1].browser_download_url);
    $('#version').html(release.tag_name);
    $('#version').fadeIn(0);
  });
}
