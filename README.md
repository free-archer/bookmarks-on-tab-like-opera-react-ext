# Chrome Extension Boilerplate with React

Bookmarks on tab like opera created by react.js.

Current baseline:
- Manifest V3
- React 19
- Webpack 5

In Opera is conveniently realized the bookmark. However, Chrome is a great browser, it has a lot of useful extensions needed for the programmer. I decided to make an extension for chrome, which would display bookmarks, as in opera.

How the extension works: It takes your current bookmarks and displays them as blocks. To interact, you can click on the color block will open a link. If you click on the gray folder, it will open a popup with the contents of the folder. If there were more than 4 bookmarks in the bookmarks folder, click on the block header to see them all. All interaction with the tabs remains the standard means Chrome. My extension only displays bookmarks on the page as tiles.


### install:

git clone https://github.com/Bespalov-AV/bookmarks-on-tab-like-opera-react-ext.git

npm install

npm run build

Add the Extension in chrome from folder "dist" in project.

Requirements:
- Node.js 18.18+ (or newer LTS)

Useful scripts:
- `npm run lint` - static check for source files.
- `npm run build` - production build into `dist`.
- `npm run smoke` - validates built artifacts and MV3 manifest.
- `npm test` - lint + build + smoke check.

(see help: https://blog.hunter.io/how-to-install-a-chrome-extension-without-using-the-chrome-web-store-31902c780034)

Open your bookmarks press button

![](https://github.com/Bespalov-AV/bookmarks-on-tab-like-opera-react-ext/raw/master/screenshots/panel.png)

### my screenshots

![](https://github.com/Bespalov-AV/bookmarks-on-tab-like-opera-react-ext/raw/master/screenshots/main-window.png)

![](https://github.com/Bespalov-AV/bookmarks-on-tab-like-opera-react-ext/raw/master/screenshots/open-folder.png)



## На русском

В браузере Opera удобно реализовали панель закладок. Тем не менее Chrome отличный браузер, к нему много полезных расширений нужных для программиста. Я и решил сделать расширение для chrome, которое бы выводило закладки, как в opera.

Как работает расширение: Оно берет ваши текущие закладки и выводит и в виде блоков. Для взаимодействия можно кликнуть на цветной блок будет открыта ссылка. Если кликнуть на серую папку, то будет открыт popup с содержимым папки. Если в папке с закладками было более 4 закладок, то чтобы их все увидеть надо кликнуть по заголовку блока. Все взаимодействие с закладками  остается стандартными средствами Chrome. Мое расширение только выводит закладки на на страницу в виде плиток.

### Как подключить это расширение в Chrome:
Нужно скачать папку с исходным кодом себе на компьютер в отдельную папку или клонировать репозиторий (достаточно скачать только папку dist).
Далее перейти в расширения chrome, включить режим разработчика.

![](https://github.com/Bespalov-AV/bookmarks-in-tab-like-opera/raw/master/screenshots/Screenshot_3.png)

После чего нажать загрузить распакованное расширение и выбрать папку dist с файлами расширения.

Требования:
- Node.js 18.18+ (или новее LTS)

Скрипты:
- `npm run lint` — статическая проверка исходников.
- `npm run build` — production-сборка в `dist`.
- `npm run smoke` — проверка артефактов и MV3-манифеста.
- `npm test` — lint + build + smoke.


### реализация

Данное расширение написано на React.js.

Так же есть реализация на Vue.js (https://github.com/Bespalov-AV/bookmarks-on-tab-like-opera-vue)

И попытка реализации на чистом JS (https://github.com/Bespalov-AV/bookmarks-in-tab-like-opera.git), но она зашла в тупик из за усложнения кода. И было принято решение применить компонентный подход.
