# Chat noir
### Мессенджер нового поколения
~~Интерфейс нагло скопирован с telegram, а функционал пока отсуствует в приниципе~~
Уникальный продукт, позволяющий общаться с кем душа пожелает, не отвлекаясь ни на что лишнее

### О проекте
<p>Проект написан на Typescript без использования сторонних библиотек</p>

<p>Я не использовал в работе сторонний шаблонизатор, попробовав написать компоненты и страницы на стандартных шаблонных строках, объединив в одной сущности html структуру и логику добавления и удаления обработчиков событий.</p>

Стили написаны с использованием PostCSS плагинов 
[postcss-nested](https://github.com/postcss/postcss-nested) и 
[autoprefixer](https://github.com/postcss/autoprefixer), также используются [css модули](https://github.com/css-modules/css-modules)

### Полезные команды
- `npm run dev` Запуск dev сервера vite 
- `npm run build` Сборка проекта
- `npm run start` Сборка проекта и запуск static сервера Express на порту :3000

### Макеты в фигме:
https://www.figma.com/design/lY6kHJzFsl1nK3WsVRKC0i/ChatNoir?node-id=0-1&t=wEpRMxRttPinSlt1-1

### Проект на netlify:
Основная версия: https://chat-noir.netlify.app/
<p>Деплой из ветки 1 спринта: https://sprint-1--chat-noir.netlify.app/</p>


### URL сверстанных страниц:
1. Страница с чатами: https://chat-noir.netlify.app/
2. Страница авторизации: https://chat-noir.netlify.app/login
3. Страница регистрации: https://chat-noir.netlify.app/signup
4. Страница 404: https://chat-noir.netlify.app/404
5. Страница 500: https://chat-noir.netlify.app/500
