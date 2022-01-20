



// const cursor = document.querySelector('.cursor');

// document.addEventListener('mousemove', e => {
//     cursor.setAttribute('style', 'top:'+(e.pageY - 20)+"px; left:"+(e.pageX - 20)+"px;")
// })

// ---------------------------------------------------------------------------
//  panier
let cartBtn = document.querySelector(".shopping-cart");
cartBtn.addEventListener("click", toggleCart);

function toggleCart() {
  let cart = document.querySelector('.cart')
  cart.classList.toggle("show");
}
//  fin du panier
// --------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// Fetch
let flag = false; 
fetch("assets/data/sneakers.json")
  .then((res) => res.json())
  .then((jsonSneakers) => {
    jsonSneakers.results.map((sneakers) => {
      let id = sneakers.id;
      let image = sneakers.image;
      let name = sneakers.name;
      let brand = sneakers.brand;
      let price = sneakers.price;

      let sneakersItem = `
     <div class="item ${id}">
     <div class="heart">
         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30">
         <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.856,6.973a8.4,8.4,0,0,0-11.91,0L18.323,8.6,16.7,6.973A8.435,8.435,0,1,0,4.79,18.921l1.623,1.628L18.323,32.5l11.91-11.948,1.623-1.628a8.466,8.466,0,0,0,0-11.948Z" transform="translate(-1.323 -3.497)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
         </svg>
     </div>
     <div class="sneakers-info">
         <div class="sneakers-img">
         <img src="${image}" alt="paire de sacai villain red">
         </div>
         <h1>${name}</h1>
         <h2>${brand}</h2>
         <div class="price">
             <h3>${price}</h3>
             <button class="add-cart-btn" >+</button>
         </div>
     </div>
 </div>
      `;
      document.querySelector(".shopping-items").innerHTML += sneakersItem;
      
    });
  });
flag = true;
// Fin du fetch
// ---------------------------------------------------------------------
// console.log(flag);
// if (flag = true) {
  // let addCartBtn = document.querySelectorAll('.add-cart-btn');
  // console.log(addCartBtn);
// addCartBtn.addEventListener('click', addToCart)
// }

// function addToCart(e) {
  // e.target.style.backgroundColor= "red";
  // console.log('ok');
// }

// function myfonction() {
//   console.log(this.previousSibling);
// }

// myfonction();
