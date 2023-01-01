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

Cтандартные календари праздников от Google недостаточно полны, и здесь можно найти расширенный календарь праздников.<!--more-->

<iframe src="https://calendar.google.com/calendar/embed?showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;
height=600&amp;wkst=2&amp;hl=ru&amp;bgcolor=%23FFFFFF&amp;src=ac10bada85f6bedeabfc818c11d156a200c298efad6c3c0150c6515b52c0bc3c%40group.calendar.google.com&amp;
color=%23333333&amp;ctz=Europe%2FMoscow" style="border-width:0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>

### Tl;Dr

Cкопировать календарь праздников с помощью кнопки «**+Google** Календарь» в свой Гугл-аккаунт.

### Чуть подробнее

Сохранить [**ical-favorite-out.ics**]({{ site.baseurl }}/files/iCalendar/ical-favorite-out.ics) с полным описанием каждого праздника, в достаточно популярном формате [iCalendar](https://en.wikipedia.org/wiki/ICalendar) (`iCal`), и делать с ним что угодно, например, импортировать файл в Google Calendar.
Для этого рекомендуется на [calendar.google.com](https://calendar.google.com/) сначала *Cоздать новый календарь* в настройках, в списке «Мои Календари»,
а затем *Импортировать* в него скачанный `iCal`.

### Подробно

На сайте [calend.ru](http://calend.ru) праздники собраны по категориям.
Можно либо скачать по прямой ссылке один из представленных ниже календарей, либо создать на сайте свой календарь праздников и скачать `iCal`.

- [Праздники Международные](http://www.calend.ru/ical/ical-wholeworld.ics)
- [Праздники Еврейские](http://www.calend.ru/ical/ical-jew.ics)
- [Праздники Беларуси](http://www.calend.ru/ical/ical-belorus.ics)
- [Праздники России](http://www.calend.ru/ical/ical-russtate.ics)
- [Праздники Украины](http://www.calend.ru/ical/ical-ukraine.ics)


Однако в этих файлах про каждый праздник написано только одно предложение, хотя
на самом сайте содержится полноценная история и описание каждого праздника.
Следующий python-скрипт заменяет короткое описание праздников в `iCal` на полное описание с сайта, и сохраняет в новый файл.

Скрипт использует [icalendar](http://pypi.python.org/pypi/icalendar) и работает с файлами `iCal` (.ics) через аргумент командной строки.

```bash
pip install icalendar trafilatura colorama
python proceed.py path/to/.ics
```

{% gist 055e636e6bfc35c7d7b096aa8aa26c0d %}

Готовая версия:

- [Избранные праздники с описанием]({{ site.baseurl }}/files/iCalendar/ical-favorite-out.ics)

Именно эту версию можно было скачать ещё по ссылке в начале. В неё включены международные праздники, праздники Беларуси, и различные необычные праздники других стран. 
Удалены несколько узких профессиональных праздников сотрудников различных министерств и хозяйств.

Или, как вариант, можно собрать комбинацию отсюда:

- [Международные праздники с описанием]({{ site.baseurl }}/files/iCalendar/ical-wholeworld-out.ics)
- [Праздники Еврейские с описанием]({{ site.baseurl }}/files/iCalendar/ical-jew-out.ics)
- [Праздники Беларуси с описанием]({{ site.baseurl }}/files/iCalendar/ical-belorus-out.ics)
- [Праздники России с описанием]({{ site.baseurl }}/files/iCalendar/ical-russtate-out.ics)
- [Праздники Украины с описанием]({{ site.baseurl }}/files/iCalendar/ical-ukraine-out.ics)


И, наконец, импортировать файл(ы) в, например, Google Calendar.
Для этого рекомендуется на [calendar.google.com](https://calendar.google.com/) сначала *Cоздать новый календарь* для каждого файла в списке «Мои Календари» в настройках, а затем *Импортировать* в него ваш сгенерированный `iCal`.
