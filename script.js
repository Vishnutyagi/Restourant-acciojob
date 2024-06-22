document.addEventListener('DOMContentLoaded', getMenu);

async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const foodItems = await response.json();

        const foodItemsContainer = document.querySelector('.burger');
        foodItemsContainer.innerHTML = ''; // Clear previous content if any

        foodItems.forEach(item => {
            const foodItemDiv = document.createElement('div');
            foodItemDiv.classList.add('food-item');
            let srrc=item.imgSrc;
            console.log(srrc);
            foodItemDiv.innerHTML = `
                <img src="${srrc}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                
            `;
            foodItemsContainer.appendChild(foodItemDiv);
        });
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const order = {
                items: getRandomBurgers(),
                order_status: false,
                paid: false
            };
            resolve(order);
        }, 2500);
    });
}

function orderPrep(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            order.order_status = true;
            resolve(order);
        }, 1500);
    });
}

function payOrder(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            order.paid = true;
            resolve(order);
        }, 1000);
    });
}

function thankyouFnc(order) {
    if (order.paid) {
        alert('Thank you for eating with us today!');
    }
}

function getRandomBurgers() {
    const burgers = [
        "Burger 1",
        "Burger 2",
        "Burger 3",
        "Burger 4",
        "Burger 5"
    ];
    const selectedBurgers = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        selectedBurgers.push(burgers[randomIndex]);
        burgers.splice(randomIndex, 1);
    }
    return selectedBurgers;
}

// Chain the promises
getMenu()
    .then(takeOrder)
    .then(orderPrep)
    .then(payOrder)
    .then(thankyouFnc)
    .catch(error => console.error('Error in processing order:', error));
