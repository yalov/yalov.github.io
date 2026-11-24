---
layout: post
title: Календарь праздников - 2023

post_on_sidebar: true

date: 2023-01-01

tag:
  - праздник
  - календарь
  - iCal

category:
  - tools

comments: true
language: ru
---

Здесь собраны ссылки на календари праздников в формате iCalendar (`.ics`) на calend.ru и скрипт, который добавляет к праздникам полные описания. Файлы календарей скачиваются напрямую с calend.ru; подготовленные файлы на этом сайте не размещаются.<!--more-->

### Tl;Dr

Скачайте календарь по одной из ссылок calend.ru ниже. Чтобы добавить к праздникам полные описания, обработайте скачанный файл скриптом.

### Календари на calend.ru

Скачайте нужный календарь напрямую с calend.ru:

- [Праздники Международные](http://www.calend.ru/ical/ical-wholeworld.ics)
- [Праздники Еврейские](http://www.calend.ru/ical/ical-jew.ics)
- [Праздники Беларуси](http://www.calend.ru/ical/ical-belorus.ics)
- [Праздники России](http://www.calend.ru/ical/ical-russtate.ics)
- [Праздники Украины](http://www.calend.ru/ical/ical-ukraine.ics)


Скрипт заменяет короткие описания праздников в скачанном `iCal` на полные описания с сайта и сохраняет результат в новый файл. Исходный файл не изменяется.

Скрипт использует пакет [icalendar](https://pypi.org/project/icalendar/) и работает с файлами `iCal` (.ics) через аргумент командной строки.

```bash
pip install icalendar trafilatura colorama
python proceed.py path/to/.ics
```

{% gist 055e636e6bfc35c7d7b096aa8aa26c0d %}
