// ---------- ADMIN AUTH SECTION ----------

// CREATE FIRST ADMIN
const createBtn = document.getElementById("registerBtn"); // corrected ID
if (createBtn) {
    createBtn.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;   // corrected
        const password = document.getElementById("loginPassword").value; // corrected

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
        const email = document.getElementById("loginEmail").value;   // corrected
        const password = document.getElementById("loginPassword").value; // corrected

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                alert("Login successful!");
                window.location.href = "admin.html"; // same page loads dashboard
            })
            .catch(error => {
                alert(error.message);
            });
    });
}
