fetch("http://localhost:3000/restaurant_menus")
.then(r => r.json())
.then(restaurants => restaurants.forEach(x => createRestaurant(x)))


restaurants = document.getElementById("restaurants")
function createRestaurant(restaurant) {
    restaurantTag = document.createElement("div")
    restaurantTag.dataset.id = restaurant.id
    restaurantTag.className = "restaurant"
    restaurantTag.innerHTML = ""
    restaurantTag.innerHTML = `
    <h2>${restaurant.name}</h2>
    <h4>${restaurant.cuisine}</h4>
    <p>${restaurant.address}</p>
    <p>${restaurant.phone_number}</p>
    <hr>
    `
    restaurants.append(restaurantTag)
}
restaurantMenu = document.getElementById("restaurantMenu")

function showMenu(menu){
    restaurantMenu.innerHTML = ""
    menu.forEach(createItem)
}

function createItem(item){
    itemDiv = document.createElement("div")
    itemDiv.dataset.id = item.id
    itemDiv.innerHTML = `
    <p><strong>${item.name}</strong> <em>${item.price}</em></p>
    <p>${item.description}</p>
    <button class="addToCart">Add to Cart</button>
    <hr>
    `
    restaurantMenu.append(itemDiv)
}

document.addEventListener("click", function(e) {
    if (e.target.className === "restaurant"){
        let restaurantId = e.target.dataset.id
        fetch(`http://localhost:3000/restaurant_menus/${restaurantId}`).then(r => r.json()).then(showMenu)
    } else if (e.target.className === "addToCart") {
        console.log()
        let itemId = e.target.parentNode.dataset.id
        fetch(`http://localhost:3000/cart_items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify({item_id: itemId, quantity: 1, users_cart_id: 3})
        }).then(r => r.json()).then(console.log)
    }
})


