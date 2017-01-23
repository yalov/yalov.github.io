---
layout: post
title: Календарь праздников iCal
tag:
  - sidebar
  - праздники
  - календарь

disqus_comments: true
disqus_identifier: 9da4a7ae-5379-4f2f-a7b3-0a0cc8c19200
---

Скачать с сайта [calend.ru](https://calend.ru) календарь с нужными праздниками в формате `.iCal`.
Некоторые можно скачать по следующим ссылкам: 

 - [Праздники Международные](http://www.calend.ru/ical/ical-wholeworld.ics)
 - [Праздники ООН](http://www.calend.ru/ical/ical-un.ics)
 - [Праздники России](http://www.calend.ru/ical/ical-russtate.ics)
 - [Праздники Беларуси](http://www.calend.ru/ical/ical-belorus.ics)
 - [Избранные праздники](http://www.calend.ru/user/flart?ics=1)


Чтобы добавить полное описание праздников в файле .ics, можно использовать python-скрипт<!--more-->:

```python
# -*- coding: utf-8 -*-
"""Created on Fri Jan 20 21:55:59 2017. @author: yalov."""

import re
import sys
import urllib.request
from icalendar import Calendar

# Recomended Python=3.6                #
# Set source_path and destination_path #

name = "ical-unusual"
source_path = name + ".ics"
destination_path = name + "-out3.ics"
# ------------------------------------ #


def summary(url):
    """Get holiday page from calend.ru, return the cleaned summary."""
    req = urllib.request.Request(url)
    resp = urllib.request.urlopen(req)
    respdata = resp.read().decode(resp.headers.get_content_charset())

    all_divs = re.findall('<div class="text" itemprop=\"articleBody\">.+<link rel="stylesheet" href="/css/social-likes_flat.css">', str(respdata), re.DOTALL)

    if len(all_divs) != 1:
        print("\nAHTUNG!!! paragraphs.count = ", len(all_divs))

    _summary = ""

    for raw_div in all_divs:
        cleantext0 = re.sub('\s+', ' ', raw_div)   # all spacing to space
        pattern1 = re.compile(
            '(<div class="imagebig" style="width:240px;">.*?</div>)|'
            '(<p class="data">.*?</p>)|'
            '(<script type="text/javascript">.*?</script>)|'
            '(<table style=.*?>.*?</table>)', re.DOTALL)
        cleantext1 = re.sub(pattern1, '', cleantext0)  # skip images, data, scripts,tables

        pattern2 = re.compile('<(?!br).*?>')
        cleantext2 = re.sub(pattern2, '', cleantext1)  # skip non br tag

        pattern3 = re.compile('(( )*<br.*?>( )*)+')
        cleantext3 = re.sub(pattern3, '\n    ', cleantext2)  # br's to new line

        _summary += cleantext3.replace('&nbsp;', ' ').strip()

    return _summary


print(sys.version)

#  open source iCalendar
g = open(source_path, 'rb')
gcal = Calendar.from_ical(g.read())

# change Name and Desc. of Calendar, and summary of holiday
count = len(gcal.walk()) - 1
i = 0
for component in gcal.walk():
    if component.name == "VCALENDAR":
        m = component['X-WR-CALNAME'].split('-')
        component['X-WR-CALNAME'] = m[0].strip()
        component['X-WR-CALDESC'] = m[1].strip() + '\'' + m[2].strip()
        print('Name = ', component['X-WR-CALNAME'])
        print('Desc = ', component['X-WR-CALDESC'])

    if component.name == "VEVENT":
        try:
            print('({0}/{1}) {2}'.format(i, count, component['SUMMARY']))
        except:
            print('({0}/{1})'.format(i, count))  # for python <3.6
        url = component['COMMENT']
        component['DESCRIPTION'] = url + '\n' + summary(url)
    i += 1

g.close()

f = open(destination_path, 'wb')
f.write(gcal.to_ical())
f.close()

print("Done.")
```


Готовая версия:

 - [Избранные праздники с описанием](#)

Теперь можно импортировать файл в, например, Google Calendar.