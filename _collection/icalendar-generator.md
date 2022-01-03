---
layout: post
title: Календарь праздников - 2022

post_on_sidebar: true

date: 2021-02-02

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
height=600&amp;wkst=2&amp;hl=ru&amp;bgcolor=%23FFFFFF&amp;src=cgp0er41q5v0k4rpcpl4jjlt4k%40group.calendar.google.com&amp;
color=%23333333&amp;ctz=Europe%2FMoscow" style="border-width:0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>

### Tl;Dr

 Cкопировать календарь праздников с помощью кнопки «**+Google** Календарь» в свой Гугл-аккаунт.

### Чуть подробнее
Сохранить [**ical-favorite-out.ics**]({{ site.baseurl }}/files/iCalendar/ical-favorite-out.ics) с полным описанием каждого праздника, в достаточно популярном формате [iCalendar](https://en.wikipedia.org/wiki/ICalendar) (`iCal`), и делать с ним что угодно, например, импортировать файл в Google Calendar.
Для этого рекомендуется на [calendar.google.com](https://calendar.google.com/) сначала *Cоздать новый календарь* в списке «Мои Календари»,
а затем *Импортировать* в него скачанный `iCal`.



### Подробно

На сайте [calend.ru](http://calend.ru) праздники собраны по категориям.
Можно либо скачать по прямой ссылке один из представленных ниже календарей, либо создать на сайте свой календарь праздников и скачать `iCal`.

 - [Праздники Международные](http://www.calend.ru/ical/ical-wholeworld.ics)
 - [Праздники России](http://www.calend.ru/ical/ical-russtate.ics)
 - [Праздники Беларуси](http://www.calend.ru/ical/ical-belorus.ics)

Однако в этих файлах про каждый праздник написано только одно предложение, хотя
на самом сайте содержится полноценная история и описание каждого праздника.
Следующий python-скрипт заменяет короткое описание праздников в `iCal` на полное описание с сайта, и сохраняет в новый файл.

Скрипт использует [icalendar](http://pypi.python.org/pypi/icalendar) и работает с файлами `iCal` (.ics) через аргумент командной строки.
```
pip install icalendar trafilatura colorama
python proceed.py path/to/.ics
```

<script src="https://gist.github.com/yalov/055e636e6bfc35c7d7b096aa8aa26c0d.js"></script>


Готовая версия:

 - [Избранные праздники с описанием]({{ site.baseurl }}/files/iCalendar/ical-favorite-out.ics)

Именно эту версию можно было скачать ещё по ссылке в начале. В неё включены международные праздники, праздники России, праздники Беларуси, 
различные необычные праздники, и дни независимости различных стран. 
Удалены несколько узких профессиональных праздников сотрудников различных министерств и хозяйств.


 Или как вариант:
 * [Международные праздники с описанием]({{ site.baseurl }}/files/iCalendar/ical-wholeworld-out.ics)
 * [Праздники России с описанием]({{ site.baseurl }}/files/iCalendar/ical-russtate-out.ics)
 * [Праздники Беларуси с описанием]({{ site.baseurl }}/files/iCalendar/ical-belorus-out.ics)


Теперь можно импортировать файл в, например, Google Calendar.
Для этого рекомендуется на [calendar.google.com](https://calendar.google.com/) сначала *Cоздать новый календарь* в списке «Мои Календари»,
а затем *Импортировать* в него ваш сгенерированный `iCal`.
