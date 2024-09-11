// Purpose is  To create a menu for the user to select and add items to a cart 

// HTMl Elements
let listOfFoods = document.getElementById('lisfOfFoods')
let cartOverlay = document.getElementById('cartOverlay');

/// "Click" Event Listeners 
cartOverlay.addEventListener("click", cartToggle)


// Cart toggle function
function cartToggle() {
    if (cartOverlay.style.display === "block") {
        cartOverlay.style.display = "none";
        console.log("tab closed")
    } else {
        cartOverlay.style.display = "block";
        console.log("tab open")
    };
};


///Generate the Items on the Menu
let generateMenu = () => {

};
generateMenu();



