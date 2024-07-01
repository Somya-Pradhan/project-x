// DROPDOWN MENU FUNCTION //
// Get the elements
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn button');
const dropDownMenu = document.querySelector('.drop-down-menu');

// Function to display dropdown menu while clicking on the toggle button
toggleBtn.onclick = function() {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    // Changing the icon of toggle button
    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
};

// LIGHT TO DARK MODE FUNCTION //
// Get the elements of navbar
const darkModeBtn = document.querySelector('.darkmode-btn');
const darkModeBtnIcon = document.querySelector('.darkmode-btn button');
const navBar = document.querySelector('.nav-bar');
const textElements = document.querySelectorAll('.navbar-menu');
const dropdownMenuLinks = document.querySelectorAll('.navbar-dropdown-menu');
const searchButton = document.querySelector('.search-bar button');

// All colors
const colors = {
    lightBackgroundClr: "#fbbf24",
    darkBackgroundClr: "#A4C3B2",
    darkestBlackClr: '#070a13',
    chromeWhiteClr: '#e9edc9',
    roseClr: '#f43f5e',
    lightestWhiteCLr: '#f1f5f9',
    boulder: '#7A7A7A',
    champagne: '#FAECCC'
};

// Function to apply dark mode styles
function applyDarkMode() {
    darkModeBtnIcon.classList.add('fa-moon');
    darkModeBtnIcon.classList.remove('fa-sun');
    darkModeBtnIcon.style.color = colors.darkBackgroundClr;
    navBar.style.backgroundColor = colors.boulder;
    document.body.style.backgroundColor = colors.darkestBlackClr;

    textElements.forEach(element => {
        element.style.color = colors.chromeWhiteClr;
        element.addEventListener('mouseenter', () => element.style.color = colors.roseClr);
        element.addEventListener('mouseleave', () => element.style.color = colors.chromeWhiteClr);
    });

    searchButton.style.color = colors.chromeWhiteClr;
    toggleBtnIcon.style.color = colors.chromeWhiteClr;
    dropDownMenu.style.backgroundColor = colors.lightestWhiteCLr;

    dropdownMenuLinks.forEach(element => {
        element.style.color = colors.darkestBlackClr;
        element.addEventListener('mouseenter', () => element.style.color = colors.roseClr);
        element.addEventListener('mouseleave', () => element.style.color = colors.darkestBlackClr);
    });
}

// Function to remove dark mode styles
function removeDarkMode() {
    darkModeBtnIcon.classList.remove('fa-moon');
    darkModeBtnIcon.classList.add('fa-sun');
    darkModeBtnIcon.style.color = '';
    navBar.style.backgroundColor = '';
    document.body.style.backgroundColor = '';

    textElements.forEach(element => {
        element.style.color = '';
        element.addEventListener('mouseenter', () => element.style.color = colors.roseClr);
        element.addEventListener('mouseleave', () => element.style.color = '');
    });

    searchButton.style.color = '';
    toggleBtnIcon.style.color = '';
    dropDownMenu.style.backgroundColor = '';

    dropdownMenuLinks.forEach(element => {
        element.style.color = '';
        element.addEventListener('mouseenter', () => element.style.color = colors.roseClr);
        element.addEventListener('mouseleave', () => element.style.color = '');
    });
}

// Check if dark mode is enabled in local storage
if (localStorage.getItem('darkMode') === 'true') {
    applyDarkMode();
}

// Function to change the styles from light to dark mode and vice versa
darkModeBtn.onclick = function() {
    if (darkModeBtnIcon.classList.contains('fa-moon')) {
        localStorage.setItem('darkMode', 'false');
        removeDarkMode();
    } else {
        localStorage.setItem('darkMode', 'true');
        applyDarkMode();
    }
};
