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

language: ru
---

Календари праздников можно скачать на calend.ru и дополнить полными описаниями с помощью Python-скрипта.<!--more-->

### Скачать календарь

На сайте [calend.ru](http://calend.ru) праздники собраны по категориям.
Можно либо скачать по прямой ссылке один из представленных ниже календарей, либо создать на сайте свой календарь праздников и скачать `iCal`.

- [Праздники Международные](http://www.calend.ru/ical/ical-wholeworld.ics)
- [Праздники Еврейские](http://www.calend.ru/ical/ical-jew.ics)
- [Праздники Беларуси](http://www.calend.ru/ical/ical-belorus.ics)
- [Праздники России](http://www.calend.ru/ical/ical-russtate.ics)
- [Праздники Украины](http://www.calend.ru/ical/ical-ukraine.ics)

### Добавить описания

Однако в этих файлах про каждый праздник написано только одно предложение, хотя
на самом сайте содержится полноценная история и описание каждого праздника.
Следующий python-скрипт заменяет короткое описание праздников в `iCal` на полное описание с сайта, и сохраняет в новый файл.

Скрипт использует [icalendar](http://pypi.python.org/pypi/icalendar) и работает с файлами `iCal` (.ics) через аргумент командной строки.

```bash
pip install icalendar trafilatura colorama
python proceed.py path/to/.ics
```

{% gist 055e636e6bfc35c7d7b096aa8aa26c0d %}
