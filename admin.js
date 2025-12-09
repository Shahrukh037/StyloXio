// ---------- ADMIN AUTH SECTION ----------

// CREATE FIRST ADMIN
const createBtn = document.getElementById("createAdminBtn");
if (createBtn) {
    createBtn.addEventListener("click", () => {
        const email = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert("Admin created successfully!");
                window.location.reload();
            })
            .catch(error => {
                alert(error.message);
            });
    });
}

// LOGIN ADMIN
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                alert("Login successful!");
                window.location.href = "dashboard.html"; // dashboard page
            })
            .catch(error => {
                alert(error.message);
            });
    });
}
