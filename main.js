const user = localStorage.getItem('user');
const onLogin = location.pathname.endsWith('login.html');

if (!user && !onLogin) location.href = 'login.html';
if (user && onLogin) location.href = 'index.html';

document.querySelector('.add-to-cart')?.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    alert('Товар добавлен в корзину!');
});

const valueEl = document.getElementById('value');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

increaseBtn?.addEventListener('click', () => {
  let current = parseInt(valueEl.textContent);
  valueEl.textContent = current + 1;
});

decreaseBtn?.addEventListener('click', () => {
  let current = parseInt(valueEl.textContent);
  if (current > 0) {
    valueEl.textContent = current - 1;
}
});
