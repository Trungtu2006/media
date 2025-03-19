document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Tạo tài khoản admin mặc định
    if (!users.some(user => user.username === "admin")) {
        users.push({ username: "admin", email: "admin@gmail.com", password: "admin123", role: "admin" });
        localStorage.setItem("users", JSON.stringify(users));
    }

    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let user = users.find(user => user.username === username && user.password === password);
        
        if (user) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            if (user.role === "admin") {
                window.location.href = "user.html";
            } else {
                alert("Bạn không có quyền truy cập trang quản lý!");
            }
        } else {
            document.getElementById("error-message").textContent = "Sai tài khoản hoặc mật khẩu!";
        }
    });
});
