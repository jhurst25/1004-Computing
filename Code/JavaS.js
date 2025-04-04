// Check if the accounts are already saved in localStorage
if (localStorage.getItem("accounts") === null) {
    localStorage.setItem("accounts", JSON.stringify([])); // Initialize with an empty array if none exist
}

function deleteAccount(username) {
    const accounts = JSON.parse(localStorage.getItem("accounts"));

    // Remove account by filtering out the one with matching username
    const updatedAccounts = accounts.filter(account => account.username !== username);

    // Save updated list of accounts
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    // Update the displayed list of accounts
    displayAccounts();  // Refresh the table after deletion
}

function addPassword() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Ensure the fields are not empty
    if (username === "" || password === "") {
        alert("Both fields must be filled out!");
        return;
    }

    // Get the existing accounts from localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Add the new account to the array
    accounts.push({ username, password });

    // Save the updated accounts array back to localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // Clear the input fields after saving
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Update the table display
    displayAccounts();
}


function displayAccounts() {
    const accountsList = document.getElementById("accounts-list");

    // Clear the current table rows
    accountsList.innerHTML = "";

    // Get the accounts from localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Loop through each account and create a table row
    accounts.forEach(account => {
        const row = document.createElement("tr");

        // Create the table cells (columns)
        row.innerHTML = `
            <td>${account.username}</td>  <!-- Username -->
            <td>${account.password}</td>  <!-- Password -->
            <td><button onclick="deleteAccount('${account.username}')">Delete</button></td>  <!-- Delete button -->
        `;
        
        // Append the row to the table
        accountsList.appendChild(row);
    });
}




// Display the accounts when the page loads
window.onload = displayAccounts;