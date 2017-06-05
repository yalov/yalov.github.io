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

Для автоматической сборки Qt приложений под Windows в папку назначения вместе со всеми нужными библиотеками в QtCreator'е можно использовать qmake-команды в .pro-файле.

Для начала переносим `.exe` в новую папку:

```
DESTDIR = ../package
```

Задаём перенос строки aka переменная разделения команд:

``` qmake
RETURN = $$escape_expand(\n\t)
```
<!--more-->
Команда сборки `windeployqt` в qmake будет выглядеть так:

``` qmake
QMAKE_POST_LINK += $$RETURN windeployqt --compiler-runtime \
    --no-svg --no-system-d3d-compiler --no-translations --no-opengl-sw --no-angle \"$$DESTDIR\"  
```

А дальше идут многочисленные команды копирования и удаления файлов, собирающие все необходимые файлы а папку назначения.

Удалять файлы можно так:

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
А можно так:

``` qmake
DIROFFILES_TO_DEL = $$shell_path($$DESTDIR/imageformats/)
FILES_TO_DEL = qicns.dll qico.dll qtga.dll qtiff.dll qwbmp.dll qwebp.dll

for(FILE,FILES_TO_DEL){
    QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_FILE $$quote($$DIROFFILES_TO_DEL$$FILE)
}
```

Или, может быть нужно удалить папку со всем содержимым:

``` qmake
DIR_TO_DEL = $$shell_path($$DESTDIR\imageformats)
QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_TREE $$quote($$DIR_TO_DEL)
```
Копировать файлы можно так:

``` qmake
OPENSSLFILES = ../../bin_openssl_1.0.2h/libeay32.dll \
               ../../bin_openssl_1.0.2h/ssleay32.dll
OPENSSLFILES ~= s,/,\\,g
DDIR = $$DESTDIR
DDIR ~= s,/,\\,g
for(FILE,OPENSSLFILES){
    QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY $$quote($$FILE) $$quote($$DDIR)
}
```
А можно так:

``` qmake
OPENSSLFILES = $$shell_path(../../bin_openssl_1.0.2h/*.dll)
DDIR = $$shell_path($$DESTDIR)
QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY $$quote($$OPENSSLFILES) $$quote($$DDIR)
```
Ещё можно использовать `?`:
  * `?bin?.*` — файл с любым расширением, содержащий `bin`.

А можно всю папку, но всё равно её нужно сначала создать:

``` qmake
DIRFROM = $$shell_path($$PWD/shifts)
DIRTO = $$shell_path($$DESTDIR/shifts)
QMAKE_POST_LINK += $$RETURN $$sprintf($$QMAKE_MKDIR_CMD, $$DIRTO)
QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY_DIR $$quote($$DIRFROM) $$quote($$DIRTO)
```

Не забываем  возможности создавать функции, и потом их вызывать:

``` qmake
defineTest(copyToDestdir) {
    files = $$shell_path($$1)
    DDIR = $$shell_path($$DESTDIR)
    QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY $$quote($$files) $$quote($$DDIR)

    export(QMAKE_POST_LINK)  # sic!
}

FILES = \
         c:\folder\file1.dll \
         c:\folder\file2.dll \
         c:\folder\file3.dll

copyToDestdir($$FILES)
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

```
CONFIG -= debug_and_release
```

Аккуратно разложить файлы в `build-Qt_x_y_0_32bit_Debug` и `build-Qt_x_y_0_32bit_Release` можно так:

```
OBJECTS_DIR = $$OUT_PWD/.obj
MOC_DIR     = $$OUT_PWD/.moc
RCC_DIR     = $$OUT_PWD/.qrc
UI_DIR      = $$OUT_PWD/.ui
```
