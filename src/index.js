const STORAGE_KEY = 'vk_simple_chat_messages';

// Находим элементы
const messagesList = document.getElementById('messages');
const form = document.getElementById('sendForm');
const input = document.getElementById('messageInput');

// Имя отправителя (можно позже сделать ввод)
const USER_NAME = 'User';

// === Работа с localStorage ===

// Загружаем сохранённые сообщения
function loadMessages() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Сохраняем массив сообщений
function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// === Работа с DOM ===

// Добавляем сообщение в HTML
function appendMessage({ sender, text, time }) {
  const li = document.createElement('li');
  li.classList.add('message');
  if (sender === USER_NAME) li.classList.add('self');

  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  li.textContent = `${sender} [${formattedTime}]: ${text}`;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}

// === Отправка сообщения ===
form.addEventListener('submit', (e) => {
  e.preventDefault(); // не перезагружать страницу

  const text = input.value.trim();
  if (text === '') return;

  const message = {
    sender: USER_NAME,
    text,
    time: new Date().toISOString(),
  };

  // Сохраняем в localStorage
  const messages = loadMessages();
  messages.push(message);
  saveMessages(messages);

  // Добавляем на экран
  appendMessage(message);

  // Очищаем поле
  input.value = '';
  input.focus();
});

// === При загрузке страницы ===
window.addEventListener('DOMContentLoaded', () => {
  const messages = loadMessages();
  messages.forEach(appendMessage);
});
