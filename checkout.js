<script>
document.getElementById("placeOrderBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  await db.collection("orders").add({
    customerName: name,
    phone: phone,
    address: address,
    products: cart,
    totalAmount: total,
    status: "Pending",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("Order Placed Successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});
</script>
