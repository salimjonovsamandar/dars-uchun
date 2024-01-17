const wrapper = document.getElementById("wrapper");

function createCard(phone) {
    return `
    <div class="box">
            <span class="title" id="name">${phone.name}</span>
            <div>
                <p id="">${phone.price}</p>
                <p id="desc">${phone.description}</p>
                <button class="buttun more_info" id="btn element_${phone.id}">Batafsil</button>
            </div>
    `;
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://auth-rg69.onrender.com/api/products/all", {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.length) {
                data.forEach((phone) => {
                    let card = createCard(phone);
                    wrapper.innerHTML += card;
                });
                const morebuttun = document.querySelectorAll(".more_info");

                morebuttun.length &&
                    morebuttun.forEach((buttun) => {
                        buttun.addEventListener("click", function () {
                            let elID = this.getAttribute("id").substring(11);
                            if (elID) {
                                window.location.href =
                                    window.location.assign(
                                        `http://127.0.0.1:5500/pages/item.html?id=${elID}`
                                    );
                            }
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});