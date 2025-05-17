// Fetch items and display them
async function getItems() {
    const response = await fetch("http://localhost:3000/items");
    const items = await response.json();

    const list = document.getElementById("shoppingList");
    list.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
        // Wrap text inside a span so it stays aligned
        const span = document.createElement("span");
        span.textContent = item.name;
    
        // Create delete button with Bootstrap icon
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-outline-danger", "btn-sm");
        deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`; // Trash icon
        deleteBtn.onclick = () => deleteItem(item.id);
    
        li.appendChild(span);  // Add item name
        li.appendChild(deleteBtn); // Add delete button
        list.appendChild(li);
    });
}
    

getItems(); // Call this function on page load

// Handle form submission to add items
document.getElementById("itemForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("itemName").value;

    await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });

    document.getElementById("itemName").value = ""; // Clear input
    getItems(); // Refresh list
});

// Delete items from list
async function deleteItem(id) {
    await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
    getItems(); // Refresh list
}
