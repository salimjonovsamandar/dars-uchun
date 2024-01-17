const button = document.querySelector("#button");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmpassword = document.querySelector("#confirm");
const form = document.querySelector("#form");

function validate(username, email, password, confirmpassword) {
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

    if (password.value != confirmpassword.value) {
        password.focus()
        alert("password to'g'ri kelmadi")
        confirmpassword.value = ""
        return false
    }

    return true
}

button && button.addEventListener("click", function (e) {
    e.preventDefault()
    if (validate(username, email, password, confirmpassword)) {
        let user = {
            username: username.value,
            email: email.value,
            password: password.value
        }
        fetch("https://auth-rg69.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if (data.message == "Failed! Username is already in use!") {
                    alert("Bunday foydalanuvchi mavjud")
                    username.value = ""
                    username.focus()
                }
                if (data.message == "User registered successfully!") {
                    let globalUrl = `https://dars-uchun.vercel.app`

                    // let globalUrl = window.location.href.slice(0, 21) // boshqa sahifaga o'tishni topib oldik

                    window.location.assign(`${globalUrl}/pages/login.html?`)
                }
                form.reset()
            })
            .catch(err => {
                console.log(err);
            });

    } else {
        console.log("Validatsiyadan o'tmadi...");
    }
});