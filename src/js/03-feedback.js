// сделаем импорт лодаш
import throttle from 'lodash.throttle';

//  получим элементы формы
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

// загружаем значения из хранилища если в нем что-то есть
if (localStorage.getItem('email') || localStorage.getItem('message')) {
  loader();
}

refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onSendSubmit);

function onSaveInput(e) {
  if (e.target.nodeName === 'INPUT') {
    localStorage.setItem('email', JSON.stringify(e.target.value));
  } else if (e.target.nodeName === 'TEXTAREA') {
    localStorage.setItem('message', JSON.stringify(e.target.value));
  }
}

function onSendSubmit(e) {
  e.preventDefault();

  const send = {
    email: JSON.parse(localStorage.getItem('email')),
    message: JSON.parse(localStorage.getItem('message')),
  };
  console.log(JSON.stringify(send));
  //очистим поля ввода после Сабмита
  e.currentTarget.reset();
  //очистим хранилище после Сабмита, чтобы данные не остались в localStorage
  localStorage.removeItem('email');
  localStorage.removeItem('message');
}

function loader() {
  // Вернем значение формы если не было Сабмита
  refs.email.value = JSON.parse(localStorage.getItem('email'));
  refs.message.value = JSON.parse(localStorage.getItem('message'));
}
