const menuList = document.getElementById('menu-list');

const meals = [
    { name: "ארוחה טבעונית", price: 1000 },
    { name: "ארוחה צמחונית", price: 10 },
    { name: "ארוחה בשרית", price: 150 },
    { name: "ארוחה חלבית", price: 50 },
];

function displayMenu() {
    menuList.innerHTML = '';

    meals.forEach(meal => {
        const menuItem = document.createElement('li');
        menuItem.className = "menu-item";
        menuItem.innerHTML = `
            <span>${meal.name}</span>
            <span>₪${meal.price.toFixed(2)}</span>
        `;
        menuList.appendChild(menuItem);
    });
}

displayMenu();