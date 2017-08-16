---
layout: post
title: Календарь праздников

post_on_sidebar: true

date: 2017-01-23

tag:
  - праздник
  - календарь
  - iCal

category:
  - tools

comments: true
#disqus_comments: true
#disqus_identifier: 9da4a7ae-5379-4f2f-a7b3-0a0cc8c19200
language: ru
---

Многие знают, что стандартные календари праздников, встроенные в google-календарь недостаточно хороши.
Праздники Беларуси вообще написаны по-английски, что выглядит довольно странно:
«New Year's Eve», «Defender of the Fatherland Day», «Labour Day».
Поэтому я решил интегрировать свой календарь праздников в google-календарь, чтобы заходить в google-календарь и видеть там свои календари. Больше, больше календарей!<!--more-->


<iframe src="https://calendar.google.com/calendar/embed?showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;
height=600&amp;wkst=2&amp;hl=ru&amp;bgcolor=%23FFFFFF&amp;src=eeof4665qu4h3lr0ajvera1vjo%40group.calendar.google.com&amp;
color=%23333333&amp;ctz=Europe%2FMoscow" style="border-width:0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>

### Tl;Dr

Можно скопировать с помощью кнопки «**+Google** Календарь», в нижнем правом углу календаря.
Можно сохранить [файл]({{ site.baseurl }}/files/iCalendar/ical-favorite-out.ics) с полным описанием каждого праздника, в достаточно популярном формате `iCal`, и делать с ним что угодно.

### Как самому сделать?

На сайте [calend.ru](http://calend.ru) праздники собраны по категориям.
Можно скачать один из представленных ниже календарей, и импортировать куда нужно.

 - [Праздники Международные](http://www.calend.ru/ical/ical-wholeworld.ics)
 - [Праздники России](http://www.calend.ru/ical/ical-russtate.ics)
 - [Праздники Беларуси](http://www.calend.ru/ical/ical-belorus.ics)

А можно создать на сайте свой общий календарь праздников из вышеперечисленных, что-то добавить, что-то удалить, скачать в формате `iCal`, и импортировать куда нужно.

Однако, в этих файлах про каждый праздник написано только одно предложение, хотя
на самом сайте содержится полноценная история и описание каждого праздника.
Следующий python-скрипт заменяет короткое описание праздников в `iCal` на полное описание с сайта, и сохраняет в новый файл.

Для запуска желательно использовать >=python3.6, и необходимо установить [icalendar](http://pypi.python.org/pypi/icalendar) — `pip install icalendar`.
Не забудьте указать `source_path` и `destination_path` в скрипте.


<script src="https://gist.github.com/yalov/055e636e6bfc35c7d7b096aa8aa26c0d.js"></script>

Готовая версия (на 2017 год):

 - [Избранные праздники с описанием]({{ site.baseurl }}/files/iCalendar/ical-favorite-out.ics)

Именно эту версию можно было скачать ещё по ссылке в Tl;Dr. В неё включены международные праздники, праздники России, праздники Беларуси и Необычные праздники, и
удалены несколько профессиональных праздников сотрудников различных министерств и хозяйств, например удалены
«День образования подразделений экономической безопасности в системе МВД России»,
«День работников бытового обслуживания населения и жилищно-коммунального хозяйства Беларуси» и т.п.


 Или как вариант:
[Праздники Беларуси с описанием]({{ site.baseurl }}/files/iCalendar/ical-belarus-out.ics),
[Праздники России с описанием]({{ site.baseurl }}/files/iCalendar/ical-russtate-out.ics),
[Необычные праздники с описанием]({{ site.baseurl }}/files/iCalendar/ical-unusual-out.ics),
[Международные праздники с описанием]({{ site.baseurl }}/files/iCalendar/ical-wholeworld-out.ics).

Теперь можно импортировать файл в, например, Google Calendar.
Для этого рекомендуется на [https://calendar.google.com/](https://calendar.google.com/) сначала создать новый календарь в списке «Мои Календари»,
а затем «Импортировать календарь» из меню «Другие календари».
