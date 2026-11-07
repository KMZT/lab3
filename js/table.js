
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const table = document.getElementById("userTable");
const errorMessage = document.getElementById("errorMessage");

// Загружаем данные из localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Сохраняем данные
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Отображаем таблицу
function renderUsers() {
    table.innerHTML = "";

    if (users.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.className = "empty";
        cell.textContent = "Нет записей";

        row.appendChild(cell);
        table.appendChild(row);
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const phoneCell = document.createElement("td");
        const actionCell = document.createElement("td");

        nameCell.textContent = user.name;
        emailCell.textContent = user.email;
        phoneCell.textContent = user.phone;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Удалить";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteUser(index);
        });

        actionCell.appendChild(deleteButton);

        row.append(nameCell, emailCell, phoneCell, actionCell);
        table.appendChild(row);
    });
}

// Удаляем пользователя
function deleteUser(index) {
    users.splice(index, 1);
    saveUsers();
    renderUsers();
}

// Проверяем Email
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return pattern.test(email);
}

// Обработка формы
form.addEventListener("submit", function(event) {
    event.preventDefault();

    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    phoneInput.classList.remove("error");

    errorMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    let errors = [];

    if (name === "") {
        nameInput.classList.add("error");
        errors.push("Введите имя");
    }

    if (email === "") {
        emailInput.classList.add("error");
        errors.push("Введите Email");
    } else if (!isValidEmail(email)) {
        emailInput.classList.add("error");
        errors.push("Введите корректный Email");
    }

    if (phone === "") {
        phoneInput.classList.add("error");
        errors.push("Введите телефон");
    }

    if (errors.length > 0) {
        errorMessage.textContent = errors.join("; ");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        phone: phone
    };

    users.push(newUser);

    saveUsers();
    renderUsers();

    form.reset();
});

// Первоначальная загрузка таблицы
renderUsers();
