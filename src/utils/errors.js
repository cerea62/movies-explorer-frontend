export function errorsList(err) {
    if (err === 400) {
      return `Ошибка ${err}. Не верно заполнено одно из полей.`;
    } else if (err === 401) {
      return `Ошибка ${err}. Вы ввели неправильный логин или пароль.`;
    } else if (err === 403) {
      return `Ошибка ${err}. Токен не передан или передан не в том формате.`;
    } else if (err === 404) {
      return `Ошибка ${err}. Данные не найдены.`;
    } else if (err === 409) {
      return `Ошибка ${err}. Пользователь с таким email уже существует.`;
    } else if (err === 429) {
      return `Ошибка ${err}. Слишком много запросов. Попробуйте позже.`;
    } else if (err === 500) {
      return `Ошибка ${err}. На сервере произошла ошибка.`;
    } else {
      return `Ошибка ${err}. Ошибка сервера.`;
    }
  }