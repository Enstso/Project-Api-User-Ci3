let path = window.location.pathname;
switch (path) {
  case "/":
    async function get() {
      let req = await fetch("http://0.0.0.0:8083");
      let users = await req.json();

      users.data.forEach((elmt) => {
        let tr = document.createElement("tr");
        let tab_elmt = [];
        let id = document.createElement("td");
        id.innerText = elmt.id;
        let firstname = document.createElement("td");
        firstname.innerText = elmt.firstname;
        let lastname = document.createElement("td");
        lastname.innerText = elmt.lastname;
        let email = document.createElement("td");
        email.innerText = elmt.email;
        let btn1 = document.createElement("td");
        let btn2 = document.createElement("td");
        tab_elmt.push(id, firstname, lastname, email, btn1, btn2);
        setStylefield(tab_elmt);
        tab_elmt.forEach((elmt) => {
          tr.appendChild(elmt);
        });
        document.getElementById("tbody").appendChild(tr);
      });
    }
    function setStylefield(tab_elmt) {
        console.log(tab_elmt);
      let length = tab_elmt.length;
      for (let i = 0; i < length; i++) {
        tab_elmt[i].classList.add("py-2", "px-4", "border-b");
      }
      let btn_update = document.createElement("a");
      btn_update.innerText = "Update";
      btn_update.classList.add(
        "bg-blue-500",
        "hover:bg-blue-700",
        "text-white",
        "font-bold",
        "py-1",
        "px-2",
        "rounded"
      );
      btn_update.href = "update.html";
    btn_update.value = tab_elmt["id"];
      let btn_delete = document.createElement("a");
      btn_delete.innerText = "Delete";
      btn_delete.classList.add(
        "bg-red-500",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "py-1",
        "px-2",
        "rounded"
      );
      btn_delete.href = "delete.html";
      tab_elmt[4].appendChild(btn_update);
      tab_elmt[5].appendChild(btn_delete);
    }

    break;
  case "/create.html":
    document
      .getElementById("form_create")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        let firstname = document.getElementById("firstname_create");
        let lastname = document.getElementById("lastname_create");
        let email = document.getElementById("email_create");
        let req = await fetch("http://0.0.0.0:8083/create/", {
          mode: "no-cors",
          method: "POST",
          body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        location.assign("/");
      });
    break;
  case "/update.html":
    async function loading() {
      let req = await fetch("http://0.0.0.0:8083");
      let users = await req.json();
      users.data.forEach((elmt) => {
        let opt = document.createElement("option");
        opt.value = elmt.id;
        opt.innerHTML = elmt.id;
        document.getElementById("ids").appendChild(opt);
      });
    }
    loading();

    document.getElementById("ids").addEventListener("change", async () => {
      let req = await fetch(
        `http://0.0.0.0:8083/getUser/${document.getElementById("ids").value}`
      );
      let users = await req.json();

      let firstname = document.getElementById("firstname");
      let lastname = document.getElementById("lastname");
      let email = document.getElementById("email");

      firstname.value = users.data.firstname;
      lastname.value = users.data.lastname;
      email.value = users.data.email;
    });

    document
      .getElementById("form_update")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        let firstname = document.getElementById("firstname");
        let lastname = document.getElementById("lastname");
        let email = document.getElementById("email");
        let id = document.getElementById("ids");
        let req = await fetch("http://0.0.0.0:8083/update/", {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id.value,
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
          }),
        });
        location.assign("/");
      });
  case "/delete.html":
    async function loadingDelete() {
      let req = await fetch("http://0.0.0.0:8083");
      let users = await req.json();
      users.data.forEach((elmt) => {
        let opt = document.createElement("option");
        opt.value = elmt.id;
        opt.innerHTML = elmt.id;
        document.getElementById("ids-delete").appendChild(opt);
      });
    }
    loadingDelete();

    document
      .getElementById("form_delete")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        let req = await fetch(
          `http://0.0.0.0:8083/delete/${document.getElementById("ids").value}`,
          {
            mode: "no-cors",

            method: "POST",
          }
        );
        location.assign("/");
      });

  default:
    break;
}
