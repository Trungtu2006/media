// Xử lý đăng ký//
    $(document).ready(function () {
        $("#form-signup").submit(function (event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định
    
            // Lấy giá trị từ các input
            let username = $(".form-input").eq(0).val().trim();
            let email = $(".form-input").eq(1).val().trim();
            let password = $(".form-input").eq(2).val();
            let confirmPassword = $(".form-input").eq(3).val();
    
            // Xóa thông báo lỗi cũ
            $(".error-message").remove();
    
            let isValid = true;
    
            // Kiểm tra tên đăng nhập
            if (username === "") {
                showError($(".form-input").eq(0), "Tên đăng nhập không được để trống");
                isValid = false;
            }
    
            // Kiểm tra email hợp lệ
            if (email === "") {
                showError($(".form-input").eq(1), "Email không được để trống");
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError($(".form-input").eq(1), "Email không hợp lệ");
                isValid = false;
            }
    
            // Kiểm tra mật khẩu
            if (password.length < 6) {
                showError($(".form-input").eq(2), "Mật khẩu phải có ít nhất 6 ký tự");
                isValid = false;
            }
    
            // Kiểm tra nhập lại mật khẩu
            if (confirmPassword !== password) {
                showError($(".form-input").eq(3), "Mật khẩu nhập lại không khớp");
                isValid = false;
            }
    
            // Nếu hợp lệ thì lưu vào localStorage
            if (isValid) {
                saveUserToLocalStorage(username, email, password);
                alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
                $("#form-signup")[0].reset(); // Reset form
                window.location.href = "login.html"; // Chuyển hướng sang trang đăng nhập
            }
        });
    
        // Hàm hiển thị lỗi
        function showError(inputElement, message) {
            let errorElement = $("<p class='error-message' style='color: red; font-size: 14px; margin-top: 5px;'></p>").text(message);
            inputElement.parent().append(errorElement);
        }
    
        // Hàm kiểm tra định dạng email
        function isValidEmail(email) {
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    
        // Hàm lưu tài khoản vào localStorage
        function saveUserToLocalStorage(username, email, password) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
    
            // Kiểm tra xem email đã tồn tại chưa
            let emailExists = users.some(user => user.email === email);
            if (emailExists) {
                showError($(".form-input").eq(1), "Email đã tồn tại. Vui lòng dùng email khác.");
                return;
            }
    
            // Thêm user mới vào danh sách
            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));
        }
    });
    
    // Xử lý đăng nhập
    $("#form-login").submit(function (event) {
        event.preventDefault();

        let username = $(".form-input").eq(0).val().trim();
        let password = $(".form-input").eq(1).val();
        let rememberMe = $("#remember-me").prop("checked");

        $(".error-message").remove();

        if (username === "" || password === "") {
            showError($(".form-input").eq(0), "Tên đăng nhập và mật khẩu không được để trống");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert("Đăng nhập thành công!");

            if (rememberMe) {
                localStorage.setItem("rememberedUser", JSON.stringify(user));
            } else {
                localStorage.removeItem("rememberedUser");
            }

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "index.html";
        } else {
            showError($(".form-input").eq(0), "Tên đăng nhập hoặc mật khẩu không chính xác");
        }
    });

    // Hiển thị thông tin tài khoản trên index.html
    function displayUserInfo() {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        const loginBtn = $("#login-btn");
        const logoutBtn = $("#logout-btn");
        const loginBtnMobile = $("#login-btn-mobile");
        const logoutBtnMobile = $("#logout-btn-mobile");

        if (loggedInUser) {
            $("#user-info").html(`<p>Xin chào, <strong>${loggedInUser.username}</strong></p>`);
            $("#user-info-mobile").html(`<p>Xin chào, <strong>${loggedInUser.username}</strong></p>`);

            // Ẩn nút đăng nhập, hiển thị nút đăng xuất
            loginBtn.hide();
            logoutBtn.show();
            loginBtnMobile.hide();
            logoutBtnMobile.show();

            // Xử lý đăng xuất
            function handleLogout() {
                localStorage.removeItem("loggedInUser");
                window.location.reload();
            }

            logoutBtn.click(handleLogout);
            logoutBtnMobile.click(handleLogout);
        } else {
            $("#user-info").html("");
            $("#user-info-mobile").html("");

            // Hiển thị nút đăng nhập, ẩn nút đăng xuất
            loginBtn.show();
            logoutBtn.hide();
            loginBtnMobile.show();
            logoutBtnMobile.hide();
        }
    }

    if ($("#user-info").length) {
        displayUserInfo();
    }

    // Xử lý ghi nhớ đăng nhập
    let rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    if (rememberedUser) {
        $(".form-input").eq(0).val(rememberedUser.username);
        $(".form-input").eq(1).val(rememberedUser.password);
        $("#remember-me").prop("checked", true);
    }

   /** ========== XỬ LÝ ẨN/HIỆN MẬT KHẨU ========== */
$(document).ready(function () {
    $(".eye-toggle").click(function () {
        let passwordInput = $(this).siblings("input"); // Tìm input trong cùng form-group
        let icon = $(this).find("i");

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            icon.removeClass("fa-eye").addClass("fa-eye-slash"); // Đổi icon thành mắt đóng
        } else {
            passwordInput.attr("type", "password");
            icon.removeClass("fa-eye-slash").addClass("fa-eye"); // Đổi icon thành mắt mở
        }
    });
});

// Hàm hiển thị lỗi
    function showError(inputElement, message) {
        let errorElement = $("<p class='error-message' style='color: red; font-size: 14px; margin-top: 5px;'></p>").text(message);
        inputElement.parent().append(errorElement);
    }

    // Hàm kiểm tra định dạng email
    function isValidEmail(email) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

// Xử lý nút đăng xuất
$("#logout-btn").click(function () {
    sessionStorage.removeItem("loggedInUser"); // Xóa sessionStorage khi đăng xuất
    window.location.reload();
});

// Kiểm tra khi trang tải lại
displayUserInfo();