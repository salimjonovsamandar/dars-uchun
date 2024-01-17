const button = document.querySelector("#button");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

function validateLogin(username, email, password) {
    if (!username.value) {
        username.focus()
        alert("Username kiritilishi shart")
        return false
    }

    if (!email.value) {
        email.focus()
        alert("email kiritilishi shart")
        return false
    }
    if (!password.value) {
        password.focus()
        alert("password kiritilishi shart")
        return false
    }

    return true
}
// bu sahifada validatsiya o'zgardi manzil signin bo'ldi
button && button.addEventListener("click", function (e) {
    e.preventDefault()
    if (validateLogin(username, email, password)) {
        let user = {
            username: username.value,
            email: email.value,
            password: password.value
        }
        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if (data.message == "User Not found.") {
                    alert("Bunday foydalanuvchi mavjud emas")
                    username.value = ""
                    username.focus()
                }
                if (data.message == "Invalid Password!") {
                    alert("Parol noto'g'ri kiritildi")
                    username.focus()
                    password.value = ""
                }
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data))
                let globalUrl = window.location.href.slice(0, 21)
                window.location.assign(`https://dars-uchun.vercel.app/index.html`)
            })

            .catch(err => {
                console.log(err);
            });

    } else {
        console.log("Validatsiyadan o'tmadi...");
    }
});
