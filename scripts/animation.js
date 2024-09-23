const logoElement = document.getElementById('logo');

// Load ASCII art from the txt file
fetch('logo.txt')
    .then(response => response.text())
    .then(data => {
        logoElement.textContent = data;
    })
    .catch(error => console.error('Error loading logo:', error));
