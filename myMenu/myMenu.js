// Purpose is  To create a menu for the user to select and add items to a cart 
// and then display the items in the cart and allow the user to remove items from the cart



//// BASKET[] array to store the items in the cart Using local storage
let basket = JSON.parse(localStorage.getItem('cartData')) || [];

// HTMl Elements
let openShoppingCart = document.querySelector('.iconWrapper')
let closeShoppingCart = document.querySelector('.closeCartBtn')
let listOfFoods = document.querySelector('.listOfFoods')

let cartOverlay = document.querySelector('.cartOverlay')
let cartMenu = document.querySelector('.cartMenu')

// let cartItems = document.querySelector('.cartItems')
let shoppingItems = document.getElementById('shoppingItems')
let totalCost = document.getElementById('totalCost')


/// event listeners to open and close the cart
openShoppingCart.addEventListener("click", showCart);
closeShoppingCart.addEventListener("click", hideCart);

///// Toogle funtion for the cart
function showCart(){
    cartOverlay.classList.toggle('active');
    cartMenu.classList.toggle('active');
    // console.log('cart is open');
};
function hideCart(){
    cartOverlay.classList.toggle('active');
    cartMenu.classList.remove('active');
    // console.log('cart is closed');
};




/////////////////////////////
///Generate the Items on the Menu and program the buttons to add items to the cart and save the items to the cart
/////////////////////////////
let generateMenu = () => {
    return (listOfFoods.innerHTML = 
        foodItems.map((x) => {
            let {id,name,image,price,info} = x;
            let search = basket.find((x)=> x.id === id) || [];
            return `
            <li class="menuItem">
                <img src="${image}" alt="${name}">
                <div class="itemDesc">
                    <h3>${name} </h3>
                    <p class="cost">$${price}</p>
                </div>
                <div class="itemInfo">
                    <h4>Desc</h4>
                    <p> ${info}</p>
                </div>
                <div class="itemButtons"> 
                    <div onclick=decrement(${id}) class="decrement">
                        <i class="bi bi-dash-lg"></i>
                    </div>
                    <div  id=${id} class="quantity">
                        ${ search.item === undefined ? 0 : search.item}
                    </div>
                        <div onclick="increment(${id})" class="increment">
                        <i class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </li>`
        })
        .join('')
    );
};
generateMenu();



/////////////////////////////
// Increment function to ADD items to the cart
/////////////////////////////
let increment = (id) => {
    let selectedItem = id
    // console.log(basket)
    let search = basket.find((x) => x.id === selectedItem.id); 
    if(search === undefined ){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;

    }
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem('cartData', JSON.stringify(basket));
};



/////////////////////////////
/// Decrement function to REMOVE items from the cart
/////////////////////////////
let decrement = (id) => {
    // console.log(basket)
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined) return;// if the item is not in the cart return the empty cart array
    if(search.item === 0 ) return; // if the item is 0 return the empty cart array
    else {
        search.item -= 1;//else decrement the quantity of the item in the cart
    }
    update(selectedItem.id);   // update the NEW quantity of the item in the cart
    basket = basket.filter((x) => x.item !== 0); // filter and find all the items that have a quantity of 0
    
    localStorage.setItem('cartData', JSON.stringify(basket));// if any item is zero save the changes to the local storage
    generateCartItems();// then generate the items in the cart again to show the changes made
};



/////////////////////////////
// Update the amount of items in the cart if equal to zero
//////////////////////////////
let update = (id) => {
    if (basket.length === 0) return;
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calucateTotalItems();
    totalAmount();
};



/////////////////////////////
// Calulate the total items and update the red cart icon
//////////////////////////////
let calucateTotalItems = () => {
    let quantityIcon = document.getElementById('quantityIcon');
    quantityIcon.innerHTML = basket.map((x) => x.item).reduce((a,b) => a + b, 0);
}
calucateTotalItems(); // invoke so that the items red cart item is displaying the correct amount of items in the cart


/////////////////////////////
// Generate the items in the cart if nothing render proper innerHTML
//////////////////////////////
let generateCartItems = () => {
    if(basket.length !== 0){
        // console.log('cart is not empty');
        return (shoppingItems.innerHTML = basket.map((x)=>{
            let {id ,item} = x;
            let search = foodItems.find((y) => y.id === x.id) || [];
            return `
                <div class="cartItem">
                    <div class="cartItemDesc">
                            
                        <img src="${search.image}" alt="${search.name}">
                            
                        <h3>${search.name}</h3>
                            
                        <div class="quantityContainer">
                            <button onclick="decrement(${id})"class="decrease"><</button>
                            <span class="amount">${item}</span>
                            <button onclick="increment(${id})" class="add">></button>
                        </div>
                        <i onclick="removeItem(${id})" class="bi bi-trash3-fill"></i>
                    </div>
                        
                    <div class="cartItemPriceContainer">
                        <p class="cartItemPrice">price</p>
                        <p class="cartItemAmount">$${search.price}</p>
                    </div>
                
                </div>`}).join('')            
            );
    }
    else{
        // console.log('cart is empty');
        shoppingItems.innerHTML = `
        <div class="emptyCartDesc">
            <i class="bi bi-cart-x"></i>
            <h1>Your Shopping Cart is Empty</h1>
        </div>
        `;
    }
    update();
};
generateCartItems();// invoke to generate all items to the cart


/////////////////////////////
// Generate the Total amount and invoke all generators requried
//////////////////////////////
let totalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((x) => {
            let { item,id } = x;
            let search = foodItems.find((y) => y.id === id) || [];
        return item * search.price 
        }).reduce((x,y)=>x+y,0).toFixed(2);
        totalCost.innerHTML = `$${amount}`
    }
   else return totalCost.innerHTML =`$0.00`
};
totalAmount();


/////////////////////////////
// Generate the Total amount and invoke all generators requried
//////////////////////////////
let removeItem = (id) => {
    let selectedItem = id;
        basket = basket.filter((x) => x.id !== selectedItem.id);
        generateCartItems();
        totalAmount();
        localStorage.setItem('cartData', JSON.stringify(basket));
        calucateTotalItems();
        generateMenu();
};


/////////////////////////////
// Set the basket to Zero - and Close the shopping with proper generators
//////////////////////////////
let clearCart = () => {
    basket = [];
    generateCartItems();
    generateMenu();
    localStorage.setItem('cartData', JSON.stringify(basket));
    totalCost.innerHTML =`$0.00`
    calucateTotalItems();
};


let checkOut = () => {
    if(basket.length === 0){
        let cartIcon = document.querySelector('.bi-cart-x');
        cartIcon.style.animation = 'rotateCartIcon 0.5s ease';
        setTimeout(() => {
            cartIcon.style.animation = ''; // Reset animation after it completes
        }, 500)
    }
    else{
        cartMenu.classList.remove('active');
        cartOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
        let amount = basket.map((x) => {
            let { item,id } = x;
            let search = foodItems.find((y) => y.id === id) || [];
            return item * search.price
        }).reduce((x,y)=>x+y,0).toFixed(2);
        
        setTimeout(() => {
            cartOverlay.innerHTML = `
                <div class="checkoutMsgContainer">
                    <i class="bi bi-check2-circle"></i>
                    <h1>Thank you for choosing eFood!</h1>
                    <h3>Your order of <span class="checkOutAmount"> $${amount}</span> has been placed</h3>
                    <button onclick="backToHome()"> Back to Home</button>
                </div>
            `;
        }, 2000);
    }
};


let backToHome = () => {
    basket = [];
    localStorage.setItem("cartData", JSON.stringify(basket));
    location.reload();
};