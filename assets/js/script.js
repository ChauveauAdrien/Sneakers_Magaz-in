// ---------------------------------------------------------------------------
//  panier
let cartBtn = document.querySelector(".shopping-cart");
cartBtn.addEventListener("click", toggleCart);

function toggleCart() {
  let cart = document.querySelector(".cart");
  cart.classList.toggle("show");
}
//  fin du panier
// --------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// Fetch
fetch("assets/data/sneakers.json")
  .then((res) => res.json())
  .then((jsonSneakers) => {
    jsonSneakers.results.map((sneakers) => {
      let id = sneakers.id;
      let image = sneakers.image;
      let alt = sneakers.alt;
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
         <img src="${image}" alt="paire de sacai villain red" class="snkrsImg" alt="${alt}">
         </div>
         <h1 class="name">${name}</h1>
         <h2 class="brand">${brand}</h2>
         <div class="price-wrapper">
             <h3 class="price">${price}€</h3>
             <button class="add-cart-btn">+</button>
         </div>
     </div>
 </div>
      `;
      document.querySelector(".shopping-items").innerHTML += sneakersItem;
    });
    addToCart();
  });
// Fin du fetch
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// fonction pour ajouter au panier
function addToCart() {
  let btns = document.querySelectorAll(".add-cart-btn");
  for (const btn of btns) {
    btn.addEventListener("click", function () {
      let item = this.closest(".item");
      let snkrsImg = item.querySelector(".snkrsImg").src;
      let name = item.querySelector(".name").textContent;
      let brand = item.querySelector(".brand").textContent;
      let cartPrice = item.querySelector('.price').textContent
      let cartItem = `
      <div class="cart-item-wrapper">
        <div class="separator"></div>
        <div class="cart-item">
          <img src="${snkrsImg}" alt="">
          <div class="descriptif">
              <p>${name}</p>
              <p>${brand}</p>
              <div class="quantity">
                <p>qty</p>
                <p class="qty">1</p>
                <div class="chevron">
                  <ion-icon name="chevron-up-outline" class="chevron-top"></ion-icon>
                  <ion-icon name="chevron-down-outline" class="chevron-down"></ion-icon>
                </div>
                <p class="cart-price">${cartPrice}</p>
              </div>
          </div>
        </div>
      </div>
      `;
      document.querySelector(".top-cart").innerHTML += cartItem;
// ----------------------------------------------------------------------------------
// Fonction qui change le nombre d'articles au panier
      function cartNbr() {
        let cartNbr = document.querySelector(".shopping-cart");
        let cartNbrFloat = parseFloat(cartNbr.innerHTML);
        cartNbr.innerHTML = cartNbrFloat + 1;
      }
      cartNbr();

      function calculatePrice() {
        // Sub total
        let price = item.querySelector(".price");
        let stringPriceToNumber = parseFloat(price.innerHTML);
        let subPrice = document.querySelector(".subPrice");
        let numberSubPrice = parseFloat(subPrice.innerHTML);
        subPrice.innerHTML = numberSubPrice + stringPriceToNumber + "€";

        // Shipping costs
        let shippingCost = document.querySelector(".js-shippingCost");
        let numberShippingCost = parseFloat(shippingCost.innerHTML);
        shippingCost.innerHTML = numberShippingCost + 9.99 + "€";

        // total
        let finalTotal = document.querySelector(".finalTotal");
        let numberFinalTotal = parseFloat(finalTotal.innerHTML);
        console.log(numberSubPrice);
        let finalPrice = numberSubPrice + numberShippingCost;
        finalTotal.innerHTML = numberFinalTotal + finalPrice + "€";
      }
      calculatePrice();
// ------------------------------------------------------------------------------------
// Fonction qui augmente et diminue les quantité
      let chevronsTop = document.querySelectorAll(".chevron-top");
      for (const chevronTop of chevronsTop) {
        chevronTop.addEventListener("click", chevronPlusBtn);
      }

      let chevronsDown = document.querySelectorAll(".chevron-down");
      for (const chevronDown of chevronsDown) {
        chevronDown.addEventListener("click", chevronMoinsBtn);
      }
// plus
      function chevronPlusBtn() {
        let test = this.closest(".cart-item-wrapper");
        let quantity = test.querySelector(".qty");
        let floatQuantity = parseFloat(quantity.innerHTML);
        quantity.innerHTML = floatQuantity + 1;
        let cartPrice = test.querySelector('.cart-price');
        floatCartPrice = parseFloat(cartPrice.innerHTML);
        let initialPrice = floatCartPrice
        cartPrice.innerHTML =  floatCartPrice + initialPrice + '€'
      }
// moins
      function chevronMoinsBtn() {
        let test = this.closest(".cart-item-wrapper");
        let quantity = test.querySelector(".qty");
        let floatQuantity = parseFloat(quantity.innerHTML);
        quantity.innerHTML = floatQuantity - 1;
        let cartPrice = test.querySelector('.cart-price');
        floatCartPrice = parseFloat(cartPrice.innerHTML);
        cartPrice.innerHTML =  floatCartPrice - floatCartPrice + '€'

        if (floatQuantity < 2) {
          test.remove();
          let cartNbr = document.querySelector(".shopping-cart");
          let cartNbrFloat = parseFloat(cartNbr.innerHTML);
          cartNbr.innerHTML = cartNbrFloat - 1;
        }
      }
    });
  }
}

