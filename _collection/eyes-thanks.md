---
layout: post
title: "Eyes’ Thanks"

post_on_sidebar: true

date: 2017-07-22
tag:
  - qt
  - С++

category:
  - projects

sidebar: true

version: 1.3.2

comments: true
disqus_comments: true
disqus_identifier: fde3ee99-1e9a-4781-8568-9d36d1ac76ca

summary: "<a class=lightbox-image-link-left href='/images/eyesthanks-2monitors.jpg' data-lightbox='EyesThanks' title='fullscreen image at different-size monitors system'>
<img class='lightbox-image' style= 'width: 10rem;' src='/images/eyesthanks-2monitors.jpg' alt='fullscreen image at different-size monitors system'></a>
The app frequently alerts you to take rest breaks by showing fullscreen image (random image from the folder). It supports multiple monitors system and wide image for all monitors."

#lightbox2:
imgfolder: /images/
images:
  - name:  eyesthanks-2monitors.jpg
    text:  Notebook + monitor

  - name:  eyesthanks-3monitors.jpg
    thumb: eyesthanks-3monitors-prev.jpg
    text:  3 monitors

  - name:  eyesthanks-dialog-en1.png
    text:  setting dialog tab1 (English)

  - name:  eyesthanks-dialog-en2.png
    text:  setting dialog tab2 (English)

  #- name:  eyesthanks-dialog-ru1.png
  #  text:  setting dialog tab1 (Russian)

  #- name:  eyesthanks-dialog-ru2.png
  #  text:  setting dialog tab2 (Russian)

  - name:  eyesthanks-tray-en.png
    text:  tray (English)

  #- name:  eyesthanks-tray-ru.png
  #  text:  tray (Russian)
---

Staring at a computer screen for hours is not good for your eyes, so Eyes’ Thanks protect them: the app displays a full-screen image on your desktop at regular intervals,
along with an optional message, reminding you to take a break.


{% include lightbox.html height='5rem'%}

<br>

### Download Eyes’ Thanks v{{page.version}} for Windows 7–10 (x86, portable) — [.7z](https://github.com/yalov/eyes-thanks/releases/download/{{page.version}}/EyesThanks_v{{page.version}}.7z)
See [changelog](https://github.com/yalov/eyes-thanks/releases).
<br>

#### Background images
While some cool backgrounds can be generated on-the-fly, you can provide a more extensive gallery stored locally.
One of the images in the user-defined folder will be displayed in full-screen mode for the configured duration,
but you can cancel the break if you just can’t afford to interrupt your current activity.
Also you can delete displayed image from folder with `delete` key on the keyboard.

#### Multiple monitors system
It supports multiple monitors system, making it possible to display wide pictures across all your monitors.

#### Works with any monitor setup
If you sometimes switch between two displays (or even two sets of many displays) with different aspect ratios,
you can set up an alternative pictures folder that the program should use whenever aspect ratios changed.  
<small><small>For example if sometimes you disconnect your FullHD notebook from your FullHD monitor, put 2FHD (3860×1080) pictures to “pictures folder” and FullHD (1920×1080)
pictures to “alternative pictures folder”.  
So, a laptop is connected to a monitor — the app uses 2FHD folder, a laptop isn’t connected anywhere — the app uses FullHD folder.</small></small>

#### Unobtrusive, portable break reminder
The application runs in the system tray, and you can pause the timer easily by just middle-clicking the notification area icon.
It is also worth mentioning that the program does not require installation, and user configurations are only stored in the root folder, making it possible to use the app on the go.


<br>

<small><small>
[<img class='lightbox-image-right' style= 'width: 4rem;' src='/images/gpl3.svg' alt='GPLv3'>](https://www.gnu.org/licenses/gpl-3.0.html)
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
</small></small>
<small><small>
[<img class='lightbox-image-right' style= 'width: 4rem;' src='/images/softpedia100free.png' alt='Softpedia Labs 100% Free Mark'>](http://www.softpedia.com/get/Desktop-Enhancements/Clocks-Time-Management/Eyes-Thanks.shtml#status)
This product was tested in the Softpedia Labs. Softpedia [guarantees](http://www.softpedia.com/get/Desktop-Enhancements/Clocks-Time-Management/Eyes-Thanks.shtml#status)
that Eyes’ Thanks is 100% Free, which means it does not contain any form of malware, including but not limited to: spyware, viruses, trojans and backdoors.
This software product was tested thoroughly and was found absolutely clean; therefore, it can be installed with no concern by any computer user.
</small></small>
