/* global moment, $ */
function GetLatestReleaseInfo (Url, ClassName) {
  $.getJSON(Url).done(function (json) {
    var totalDownloadCount = 0

    for (var i1 = 0; i1 < json.length; i1++) {
      if (json[i1].assets.length !== 0) {
        var count = 0
        for (var i2 = 0; i2 < json[i1].assets.length; i2++) {
          count += json[i1].assets[i2].download_count
        }
        totalDownloadCount += count
      }
    }

    var release = json[0]
    var downlink = ''
    for (var i = 0; i < release.assets.length; i++) {
      var size = release.assets[i].size
      var sizeb = ''
      if (size < 800) {
        sizeb = ' B'
      } else {
        size /= 1024
        if (size < 800) {
          sizeb = ' KiB'
        } else {
          size /= 1024
          sizeb = ' MiB'
        }
      }

      if      (size >= 100) { size = size.toFixed(0) }
      else if (size >= 10)  { size = size.toFixed(1) }
      else                  { size = size.toFixed(2) }

      downlink += '<nobr><a href = "' + release.assets[i].browser_download_url + '">' + 'Download.' + release.assets[i].name.split('.').pop() + '</a> ' + '(' + size.toLocaleString() + sizeb + ')</nobr><br>'

      if (i !== release.assets.length - 1) downlink += '\n'
    }
    // release.name
    var oneHour = 60 * 60 * 1000
    var oneDay = 24 * oneHour
    var dateDiff = new Date() - new Date(release.published_at)
    var timeAgo
    if (dateDiff < oneDay) {
      timeAgo = (dateDiff / oneHour).toFixed(1) + ' hours ago'
    } else {
      timeAgo = (dateDiff / oneDay).toFixed(1) + ' days ago'
    }

    // updated_at += 'r_created ' + moment(release.created_at).format('YYYY-MM-DD HH:mm:ss') + '<br>';
    // moment(release.published_at).format('YYYY-MM-DD HH:mm:ss')
    var publishedAt = '<nobr>Released ' + timeAgo + '</nobr>'
    if (publishedAt) {
      publishedAt = '(' + publishedAt + ')'
    }

    $('.version-' + ClassName).html(release.tag_name)
    $('.version-' + ClassName).fadeIn(0)

    $('.update-' + ClassName).html(publishedAt)
    $('.update-' + ClassName).fadeIn(0)

    $('.release-links-' + ClassName).html(downlink)
    $('.release-links-' + ClassName).fadeIn(0)

    $('.download-count-' + ClassName).html(totalDownloadCount.toLocaleString())
    $('.download-count-' + ClassName).fadeIn(0)
  })
}
