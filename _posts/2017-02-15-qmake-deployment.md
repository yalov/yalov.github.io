---
layout: post
title: QMake Deployment

post_on_sidebar: false

tag:
  - qt
  - qmake
  - deployment

category:
  - posts

disqus_comments: true
disqus_identifier: c78163f3-b705-a17e-2fda-1c4f7f3f2e41

---

Для автоматической сборки Qt приложений под Windows в папку назначения вместе со всеми нужными библиотеками и необходимыми файлами в QtCreator'е можно использовать qmake-команды в .pro-файле.

Для начала переносим релизный `.exe` в новую папку:

``` qmake
CONFIG(release, debug|release) {
DESTDIR = $$PWD/../AppName
}
```

И наполняем эту папку библиотеками и файлами, которые нужны для выполнения.

Задаём перенос строки aka переменная разделения команд `RETURN`, и затем наполняем `QMAKE_POST_LINK` необходимыми командами:

``` qmake
RETURN = $$escape_expand(\n\t)
QMAKE_POST_LINK += $$RETURN command1
QMAKE_POST_LINK += $$RETURN command2
QMAKE_POST_LINK += $$RETURN command3
export(QMAKE_POST_LINK)
```
<!--more-->
Команда сборки `windeployqt` в qmake будет выглядеть так (сначала используя содержимое переменной `QT` берём модули, которые точно нужны, потом пишем модули которые окажутся лишними):

``` qmake
PACKAGES = "--compiler-runtime"
for(package,QT){
    PACKAGES += "--$${package} "
}

NO_PACKAGES = --no-svg \
    --no-system-d3d-compiler --no-translations --no-opengl-sw --no-angle

QMAKE_POST_LINK += $$RETURN windeployqt $${PACKAGES} $${NO_PACKAGES} $$quote($$shell_path($$DESTDIR))
```  

А дальше идут многочисленные команды копирования и удаления файлов, собирающие все необходимые файлы а папку назначения.

Удалять файлы можно одной командой:

``` qmake
FILES_TO_DEL = \
  $$DESTDIR\imageformats\qicns.dll \
  $$DESTDIR\imageformats\qico.dll \
  $$DESTDIR\imageformats\qtga.dll \
  $$DESTDIR\imageformats\qtiff.dll \
  $$DESTDIR\imageformats\qwbmp.dll \
  $$DESTDIR\imageformats\qwebp.dll
  FILE_TO_DEL ~= s,/,\\,g # replace slashes in paths with backslashes for Windows
  QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_FILE $$FILE_TO_DEL
```
Удалять файлы можно в цикле:

``` qmake
DIROFFILES_TO_DEL = $$shell_path($$DESTDIR/imageformats/)
FILES_TO_DEL = qicns.dll qico.dll qtga.dll qtiff.dll qwbmp.dll qwebp.dll

for(FILE,FILES_TO_DEL){
    QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_FILE $$quote($$DIROFFILES_TO_DEL$$FILE)
}
```

Удалять папку можно рекурсивно:

``` qmake
DIR_TO_DEL = $$shell_path($$DESTDIR\imageformats)
QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_TREE $$quote($$DIR_TO_DEL)
```
Копировать файлы можно полными путями:

``` qmake
OPENSSLFILES = ../../openssl/libeay32.dll \
               ../../openssl/ssleay32.dll
OPENSSLFILES ~= s,/,\\,g
DDIR = $$DESTDIR
DDIR ~= s,/,\\,g
for(FILE,OPENSSLFILES){
    QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY $$quote($$FILE) $$quote($$DDIR)
}
```
Копировать файлы можно по маске `*`:

``` qmake
OPENSSLFILES = $$shell_path(../../openssl/*.dll)
DDIR = $$shell_path($$DESTDIR)
QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY $$quote($$OPENSSLFILES) $$quote($$DDIR)
```
Ещё можно использовать `?`:
  * `?bin?.*` — файл с любым расширением, содержащий `bin`.

Копировать всю папку, необходимо всё равно сперва создав новую папку по месту назначения:

``` qmake
DIRFROM = $$shell_path($$PWD/shifts)
DIRTO = $$shell_path($$DESTDIR/shifts)
QMAKE_POST_LINK += $$RETURN $$sprintf($$QMAKE_MKDIR_CMD, $$DIRTO)
QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY_DIR $$quote($$DIRFROM) $$quote($$DIRTO)
```

Не забываем  возможности создавать функции, и потом их вызывать:

``` qmake
defineTest(show) {
    message($$1)
}

TEXT = "Some Text"
show($$TEXT)
```


Также стоит вспомнить о команде, которая лечит не-баг-а-фичу дерева папок проекта под windows:

```
project\
|__build-Qt_x_y_0_32bit_Debug\
|__|__debug\
|__|__|__...
|__|__release\
|__|__|__...
|__build-Qt_x_y_0_32bit_Release\
|__|__debug\
|__|__|__...
|__|__release\
|__|__|__...
```

Вот она:

``` qmake
CONFIG -= debug_and_release
```

Аккуратно разложить файлы в `build-Qt_x_y_0_32bit_Debug` и `build-Qt_x_y_0_32bit_Release` можно так:

``` qmake
OBJECTS_DIR = $$OUT_PWD/.obj
MOC_DIR     = $$OUT_PWD/.moc
RCC_DIR     = $$OUT_PWD/.qrc
UI_DIR      = $$OUT_PWD/.ui
```

Чтобы быстро включать и выключать такое копирование, можно

``` qmake
CONFIG += DEPLOY # comment/uncomment this

# ...

CONFIG(release, debug|release) {
  DEPLOY {
    # ...
  }
}
```
