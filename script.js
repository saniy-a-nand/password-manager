document.addEventListener("DOMContentLoaded", () => {
    showPasswords();
});

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();

    let website = document.querySelector("#website");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let messageBox = document.querySelector("#message"); 

    if (!website.value.trim() || !username.value.trim() || !password.value.trim()) {
        showMessage("All fields are required!", "error");
        return;
    }

    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

    passwords.push({ 
        website: website.value.trim(), 
        username: username.value.trim(), 
        password: password.value.trim() 
    });

    localStorage.setItem("passwords", JSON.stringify(passwords));

    showMessage("Password saved successfully!", "success");


    website.value = "";
    username.value = "";
    password.value = "";

    showPasswords();
});


function showMessage(text, type) {
    let messageBox = document.querySelector("#message");
    messageBox.textContent = text;
    messageBox.className = `message ${type}`; 
    setTimeout(() => {
        messageBox.textContent = "";
        messageBox.className = "message"; 
    }, 3000);
}

function showPasswords() {
    let passwordTable = document.querySelector("#passwordTable");
    let data = JSON.parse(localStorage.getItem("passwords")) || [];

    passwordTable.innerHTML = `
        <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
        </tr>
    `;

    data.forEach((entry, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.website}</td>
            <td>${entry.username}</td>
            <td>${entry.password}</td>
            <td><button class="delete-btn" onclick="deletePassword(${index})">Delete</button></td>
        `;

        passwordTable.appendChild(row);
    });
}

function deletePassword(index) {
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));

    showMessage("Password deleted successfully!", "success");
    showPasswords();
}
