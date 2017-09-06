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

comments: true
language: ru
---

Для автоматической сборки Qt приложений под Windows в папку назначения вместе со всеми нужными библиотеками и
необходимыми файлами в QtCreator'е можно использовать qmake-команды в .pro-файле.

Для начала переносим релизный `.exe` в новую папку:

``` qmake
CONFIG(release, debug|release) {
DESTDIR = $$PWD/../AppName
}
```

И наполняем эту папку библиотеками и файлами, которые нужны для выполнения.

Задаём перенос строки aka переменная разделения команд `RETURN`, и затем наполняем `QMAKE_POST_LINK` необходимыми командами:
<!--more-->

``` qmake
RETURN = $$escape_expand(\n\t)
QMAKE_POST_LINK += $$RETURN command1
QMAKE_POST_LINK += $$RETURN command2
QMAKE_POST_LINK += $$RETURN command3
# export(QMAKE_POST_LINK) # if inside function (exports from the local context to the global.
```


Но лучше для каждой операции ввести отдельную функцию, все функции вынести в отдельный `.pri`-файл, а в `.pro`-файле оставить только вызовы.

``` qmake
# functions.pri
defineTest(func1) {
    ARG1 = $$1
    ARG2 = $$2
    # commands
}
defineTest(func2) {
    ARGS = $$1
    # commands
}

# ...

# main.pro
include("functions.pri")
func1(arg1, arg2)
func2(arg1)
```

Команда сборки `windeployqt` в qmake будет выглядеть так (сначала используя содержимое переменной `QT` берём модули, которые точно нужны, потом пишем модули которые окажутся лишними):

``` qmake
# windeployqt in $$DESTDIR with some ARGS
defineTest(windeployqtInDESTDIR) {
    ARGS = $$1
    RETURN = $$escape_expand(\n\t)
    QMAKE_POST_LINK += $$RETURN windeployqt $$ARGS $$quote($$shell_path($$DESTDIR))
    export(QMAKE_POST_LINK)
}

# ...

PACKAGES = "--compiler-runtime"
for(package,QT){
    PACKAGES += "--$${package} "
}
PACKAGES += --no-svg --no-system-d3d-compiler --no-translations --no-opengl-sw --no-angle
windeployqtInDESTDIR($$PACKAGES)
```  


### Копирование и удаление файлов

Функция для рекурсивного удаления папки:

``` qmake
# Recursive remove directory
defineTest(removeDirRecursive) {
    DIR_TO_DEL = $$shell_path($$1)
    RETURN = $$escape_expand(\n\t)
    QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_TREE $$quote($$DIR_TO_DEL)
    export(QMAKE_POST_LINK)
}

#....

removeDirRecursive($$DESTDIR/somedir)
```

Функция для удаления файлов из какой-то папки:

``` qmake
# Remove some files from directory (directory_path and file_names)
defineTest(removeFilesInDir) {
    PATH = $$shell_path($${1}) # full path to directory
    FILENAMES = $${2}          # filenames inside directory for remove
    RETURN = $$escape_expand(\n\t)
    for(FILENAME, FILENAMES){
        QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_FILE $$quote($${PATH}$${FILENAME})
    }
    export(QMAKE_POST_LINK)
}

# ...

FILENAMES = qlib1.dll qlib2.dll qlib3.dll qlib4.dll
removeFilesInDir($$DESTDIR/somedir/, $$FILENAMES)
```

Функция для удаления файлов (не обязательно из одной папки):

``` qmake
# Remove some files
defineTest(removeFiles) {
    FILES_TO_DEL = $$shell_path($$1) # full path (split spaces) or mask *
    RETURN = $$escape_expand(\n\t)
    for(FILE, FILES_TO_DEL){
        QMAKE_POST_LINK += $$RETURN $$QMAKE_DEL_FILE $$quote($$FILE)
    }
    export(QMAKE_POST_LINK)
}

# ...

FILEPATHES = /path/to/qlib1.dll /path/to/qlib2.dll /path/to/qlib3.dll /path/to/qlib4.dll
removeFiles($$FILENAMES)
```

Функция для создания папки и копирования в неё файлов:

``` qmake
# create directory if not exist, then copy some files to that directory
defineTest(copyFilesToDir) {
    FILES = $$shell_path($$1)  # full filepath (split spaces) or masks * ?
    DIR = $$shell_path($$2)    # directory path
    RETURN = $$escape_expand(\n\t)
    QMAKE_POST_LINK += $$RETURN $$sprintf($$QMAKE_MKDIR_CMD, $$DIR)
    for(FILE,FILES){
        QMAKE_POST_LINK += $$RETURN $$QMAKE_COPY $$quote($$FILE) $$quote($$DIR)
    }
    export(QMAKE_POST_LINK)
}

# ...

copyFilesToDir(some/*.dll, $$DESTDIR/other)
# or
copyFilesToDir(path/to/1.dll path/to/2.dll, $$DESTDIR/other)
```

### Дерево файлов проекта

Также стоит вспомнить о команде, которая лечит не-баг-а-фичу дерева папок проекта под windows
(вложенные дополнительные папки debug и release в каждой из build-Qt-Debug и build-Qt-Release):

```
project\
|__build-Qt_x_y_0_32bit_Debug\
|__|__debug\
|__|__|__...files
|__|__release\
|__|__|__...empty
|__build-Qt_x_y_0_32bit_Release\
|__|__debug\
|__|__|__...empty
|__|__release\
|__|__|__...files
```

Вот она:

``` qmake
CONFIG -= debug_and_release
```

После неё:

```
project\
|__build-Qt_x_y_0_32bit_Debug\
|__|__...files
|__build-Qt_x_y_0_32bit_Release\
|__|__...files
```

Можно пойти дальше, и аккуратно разложить файлы в `build-Qt-Debug` и `build-Qt-Release`:

``` qmake
OBJECTS_DIR = $$OUT_PWD/.obj
MOC_DIR     = $$OUT_PWD/.moc
RCC_DIR     = $$OUT_PWD/.qrc
UI_DIR      = $$OUT_PWD/.ui
```

Получим:

```
project\
|__build-Qt_x_y_0_32bit_Debug\
|__|__.obj\
|__|__.moc\
|__|__.qrc\
|__|__.ui\
|__build-Qt_x_y_0_32bit_Release\
|__|__.obj\
|__|__.moc\
|__|__.qrc\
|__|__.ui\
```


### Использование переменных

Чтобы быстро включать и выключать копирование файлов в DEPLOY-сборку, и заодно, отключить в DEPLOY все отладочные сообщения, можно сделать так:

``` qmake
CONFIG += DEPLOY # comment/uncomment this for Usual_release/Deploy

# ...

CONFIG(release, debug|release) {
  DEPLOY {
    DEFINES += QT_NO_DEBUG_OUTPUT
    # ... all necessary commands
  }
}
```


Удобной может быть переменная времени сборки:

``` qmake
win32 {
    BUILD_TIME = $$system("echo %time:~0,8%")
} else {
    BUILD_TIME = $$system("time")
}

message("$$BUILD_TIME projectname.pro")
```
