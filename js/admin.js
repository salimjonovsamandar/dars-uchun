const tbody = document.getElementById("tbody");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const category = document.getElementById("category");
const button = document.getElementById("button");
const form = document.getElementById("form");
let backData = 0;

function createRov(phone, index) {
  return `
<tr>
<td>${index}</td>
<td>${phone.name}</td>
<td>${phone.price}</td>
<td>${phone.description}</td>
<td>${phone.category_id}</td>
<td>${phone.status}</td>
<td data-id= "${phone.id}" >
  <i id="updatebtn" class="bi bi-pen text-danger"></i>
  <i class="bi bi-trash3 text-success" id="deletebtn"></i>
</td>
</tr>
`;
}

function validate(name, description, category, price) {
  if (!name.value) {
    alert("Name Kiritilishi shart");
    name.focus();
    return false;
  }

  if (!name.value.trim()) {
    alert("Name Kiritilishi shart");
    name.focus();
    return false;
  }

  if (!price.value) {
    alert("price Kiritilishi shart");
    price.focus();
    return false;
  }
  if (price.value <= 0) {
    alert("price bunday son bo'lishi mumkin emas");
    price.focus();
    return false;
  }

  if (!description.value) {
    alert("description Kiritilishi shart");
    description.focus();
    return false;
  }
  if (!category.value) {
    alert("category Kiritilishi shart");
    category.focus();
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://auth-rg69.onrender.com/api/products/all", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length) {
        backData = data.length;
        data.forEach((phone, index) => {
          let tr = createRov(phone, index + 1);
          tbody.innerHTML += tr;
        });

        const deletebtn = document.querySelectorAll("#deletebtn");
        if (deletebtn.length) {
          deletebtn.forEach((del) => {
            del.addEventListener("click", function () {
              let isDelete = confirm("Rosdan ham o'chirmoqchimisiz");
              if (isDelete) {
                let deleteId = this.parentNode.getAttribute("data-id");
                if (deleteId) {
                  fetch(
                    `https://auth-rg69.onrender.com/api/products/${deleteId}`,
                    {
                      method: "DELETE",
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.massage) {
                        window.location.reload();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }
            });
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

button &&
  button.addEventListener("click", function (e) {
    e.preventDefault();
    if (validate(name, description, category, price)) {
      let phone = {
        name: name.value,
        price: price.value,
        description: description.value,
        status: "active",
        category_id: category.value,
      };
      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(phone),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            let tr = createRov(data, backData + 1);
            backData++;
            tbody.innerHTML += tr;
          }
          form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Validatsiyadan o'tmadi");
    }
  });
