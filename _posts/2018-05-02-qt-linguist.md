---
layout: post
title: Qt Linguist

project: false
post_on_sidebar: false
fullwidth: true
hidden: false

tag:
  - qt
  - deployment
  - linguist

category:
  - posts

comments: false
language: en
---

How to localize S-app (someone's Qt app)?

1. You need to find `.ts` localization file. Usually it's separate file for every language in the languages folder in the S-app source repository.  
Examples: <!--more-->  
`lang_en.ts`-— source English localization file  
`lang_en.qm` — compiled English localization file (used by working app)

2. `.ts` file is XML, so you can modify it as plain text, but more convenient is using Qt Linguist. It is included in Qt framework, but you can download it as separate app for Windows [here](https://github.com/thurask/Qt-Linguist/releases) (unofficial).

3. Copy `English.ts`, rename to `your_language.ts`, change the language tag in the begining of the file manually using a notepad.

   ```
   <TS version="2.1" language="en_US">
   ```
4. Open both file in the Qt linguist, and make a translation.
5. Save `your_language.ts` file
6. You can test your translation: using Qt Linguist, compile `your_language.ts` to `your_language.qm`, and test it with app package (put to S-app `language/` folder)
7. Send `your_language.ts` to S-app author.


More info [here](http://doc.qt.io/qt-5/linguist-translators.html)
