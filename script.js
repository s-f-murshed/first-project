document.getElementById('submitBtn').addEventListener('click', async function(event) {
    event.preventDefault();
    // Handle submit logic
    const stm = document.getElementById('STM').value;
        const id = document.getElementById('B_ID').value;
        const name = document.getElementById('B_NAME').value;
        const sem = document.getElementById('SEM').value;

        const response = await fetch('/addbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stm, id, name, sem }),
        });

        const result = await response.text();
        alert(result);
});

document.getElementById('exitBtn').addEventListener('click', function() {
    window.close();
});

document.getElementById('showBtn').addEventListener('click', async function() {
    // Handle show logic
    event.preventDefault();
        const response = await fetch('/users');
        const users = await response.json();

        const usersList = document.getElementById('usersTableBody');
        usersList.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${user.STM}</td><td>${user.B_ID}</td><td>${user.B_NAME}</td><td>${user.SEM}</td>`;
            usersList.appendChild(tr);
        });
});

document.getElementById('deleteBtn').addEventListener('click', async function(event) {
    // Handle delete logic
    event.preventDefault();
    const id=document.getElementById('bookIdDelete').value;

    const response = await fetch('/deletebook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    const result = await response.text();
        alert(result);
});

document.getElementById('searchBtn').addEventListener('click', async function(event) {
    // Handle search logic
    event.preventDefault();
    // Get the search term from an input field
    const searchTerm = document.getElementById('search').value; 

    const response = await fetch('/searchbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }), // Send the search term to the server
    });

    const users = await response.json();
    const usersList = document.getElementById('usersTableBody');
    usersList.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${user.STM}</td><td>${user.B_ID}</td><td>${user.B_NAME}</td><td>${user.SEM}</td>`;
        usersList.appendChild(tr);
    });
    document.getElementById('search').value = '';
});