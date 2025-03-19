document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    // Chỉ admin mới truy cập được
    if (!loggedInUser || loggedInUser.role !== "admin") {
        alert("Bạn không có quyền truy cập!");
        window.location.href = "loginadminuser.html";
    }

    let userList = document.getElementById("user-list");

    function renderUsers() {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            let actionButtons = `
                <button class="edit-btn" data-index="${index}">Chỉnh sửa</button>
                ${user.role !== "admin" ? `<button class="delete-btn" data-index="${index}">Xóa</button>` : ""}
            `;

            let row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${actionButtons}</td>
                </tr>
            `;
            userList.innerHTML += row;
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                openEditModal(index);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                deleteUser(index);
            });
        });
    }

    renderUsers();

    // Tìm kiếm user
    document.getElementById("search-btn").addEventListener("click", function () {
        let searchValue = document.getElementById("search-input").value.toLowerCase();
        let filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchValue));
        renderUsers(filteredUsers);
    });

    // Chỉnh sửa tài khoản
    function openEditModal(index) {
        let user = users[index];
        document.getElementById("edit-username").value = user.username;
        document.getElementById("edit-email").value = user.email;
        document.getElementById("edit-role").value = user.role;
        document.getElementById("save-changes").setAttribute("data-index", index);
        document.getElementById("edit-modal").style.display = "flex";
    }

    document.getElementById("save-changes").addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        users[index].username = document.getElementById("edit-username").value;
        users[index].email = document.getElementById("edit-email").value;
        users[index].role = document.getElementById("edit-role").value;
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
        document.getElementById("edit-modal").style.display = "none";
    });

    function deleteUser(index) {
        if (confirm("Bạn có chắc muốn xóa?")) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            renderUsers();
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userList = document.getElementById("user-list");

    function renderUsers() {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            let row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Chỉnh sửa</button>
                        ${user.role !== "admin" ? `<button class="delete-btn" data-index="${index}">Xóa</button>` : ""}
                    </td>
                </tr>
            `;
            userList.innerHTML += row;
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                openEditModal(index);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                deleteUser(index);
            });
        });
    }

    renderUsers();

    // ✅ Thêm tài khoản mới
    document.getElementById("add-user-btn").addEventListener("click", function () {
        let newUsername = document.getElementById("new-username").value.trim();
        let newEmail = document.getElementById("new-email").value.trim();
        let newPassword = document.getElementById("new-password").value.trim();
        let newRole = document.getElementById("new-role").value;

        if (!newUsername || !newEmail || !newPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (users.some(user => user.username === newUsername)) {
            alert("Tên đăng nhập đã tồn tại!");
            return;
        }

        let newUser = { username: newUsername, email: newEmail, password: newPassword, role: newRole };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();

        // Xóa input sau khi thêm thành công
        document.getElementById("new-username").value = "";
        document.getElementById("new-email").value = "";
        document.getElementById("new-password").value = "";
        document.getElementById("new-role").value = "user";

        alert("Thêm tài khoản thành công!");
    });

    // ❌ Xóa tài khoản (chỉ admin mới có thể xóa)
    function deleteUser(index) {
        if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            renderUsers();
        }
    }
});
