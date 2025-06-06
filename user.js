document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login_form");
  const error = document.getElementById("error");

  const users = [
    { login: 'admin', password: '777' },
    { login: 'user', password: '777' }
  ];

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      
      if (!username || !password) {
        error.textContent = "Введите логин и пароль";
        return;
      }

      const user = users.find(u => u.login === username && u.password === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'index.html';
      } else {
        error.textContent = 'Неверный логин или пароль';
      }
    });
  }
});
