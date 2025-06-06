// --- вход в магазин ---

const user = localStorage.getItem('user');
const onLogin = location.pathname.endsWith('login.html');

if (!user && !onLogin) location.href = 'login.html';
if (user && onLogin) location.href = 'index.html';

// --- управление кнопками ---

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        alert('Товар добавлен в корзину!');
    });
});

document.querySelectorAll('.counter').forEach(counter => {
    const count = counter.querySelector('.value');
    const increaseBtn = counter.querySelector('.increase');
    const decreaseBtn = counter.querySelector('.decrease');

    increaseBtn?.addEventListener('click', () => {
        let current = parseInt(count.textContent);
        count.textContent = current + 1;
    });

    decreaseBtn?.addEventListener('click', () => {
        let current = parseInt(count.textContent);
        if (current > 1) {
            count.textContent = current - 1;
        }
    });
});

