---
layout: post
title: Что такое Jekyll?
tag:
  - sidebar
  - jekyll

---

[Jekyll](http://jekyllrb.com) это простой генератор статических сайтов, прекрасно подходящий для использования в качестве быстрой и легкой платформы для ведения блога.<!--more-->

Механизм его работы прост: каталог с текстовыми файлами пропускается через конвертер соответствующего формата (Markdown или Textile), рендерер [Liquid](https://github.com/Shopify/liquid/wiki) и на выходе получается готовый к публикации статический сайт, который может работать на любом сервере. Также Jekyll является движком [GitHub Pages](http://pages.github.com/), а это значит, что вы можете размещать свой сайт или блог на серверах Github бесплатно.

Тема сайта основана на [Hyde](https://github.com/poole/hyde) Марка Отто.


### Windows:

  * **Установка**:
    * cmd.exe c правами администратора:  
    `@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`
    * переоткрыть cmd,  
     `choco install ruby -y`
    * переоткрыть cmd,  
    `gem install github-pages`

  * **Fix github warning**:  
  добавить переменную окружения: `JEKYLL_GITHUB_TOKEN = {{token_value}}`

  * **Fix ssl error**:  
  добавить переменную окружения: `SSL_CERT_FILE = path\to\cacert.pem`  
  Не нужно устанавливать последнюю версию OpenSSL!  
  Перезагрузиться!

  * **Использование:**
    * `[bundle install]`
    * `[bundle exec] jekyll serve [--port=4000]`
