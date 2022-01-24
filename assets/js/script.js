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
     <div class="item ">
      <div class="id">${id}</div>
     <div class="heart">
         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30">
         <path class="Icon_feather-heart" data-name="Icon feather-heart" d="M31.856,6.973a8.4,8.4,0,0,0-11.91,0L18.323,8.6,16.7,6.973A8.435,8.435,0,1,0,4.79,18.921l1.623,1.628L18.323,32.5l11.91-11.948,1.623-1.628a8.466,8.466,0,0,0,0-11.948Z" transform="translate(-1.323 -3.497)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
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
    let heartbtn = document.querySelectorAll('.heart')
console.log(heartbtn);
for (const el of heartbtn) {
  el.addEventListener('click', colorHeart);
}
  });
// Fin du fetch
// ---------------------------------------------------------------------
// fonction pour les likes 
// let heartbtn = document.querySelectorAll('.heart')
// console.log(heartbtn);
// for (const el of heartbtn) {
//   el.addEventListener('click', colorHeart);
// }


function colorHeart() {
  // let heart = document.querySelector(".heart");
  this.classList.toggle("Icon_feather-heart-show");
}





// ---------------------------------------------------------------------
// fonction pour ajouter au panier
function addToCart() {
  let btns = document.querySelectorAll(".add-cart-btn");
  let itemArray = new Array
  for (const btn of btns) {
    btn.addEventListener("click", function () {
      let item = this.closest(".item");
      let id = item.querySelector('.id').textContent;
      let snkrsImg = item.querySelector(".snkrsImg").src;
      let name = item.querySelector(".name").textContent;
      let brand = item.querySelector(".brand").textContent;
      let cartPrice = item.querySelector(".price").textContent;

      // si l'item est deja enregistré dans le tableau, alors il ne l'affiche pas au panier
      if (itemArray.includes(id)) {
        
        console.log('oups déja enregistré');
      } else {
        // ---------------------------------------------------------------------------------------------------------------
        // ------- Début du else 
        // ---------------------------------------------------------------------------------------------------------------
        // sinon, il l'enregistre dans le tableau et créer l'item
        itemArray.push(id);
        let cartItem = `
      <div class="cart-item-wrapper">
        <div class="separator"></div>
        <div class="cart-item">
          <img src="${snkrsImg}" alt="">
          <div class ="info-wrapper">
            <div class="descriptif">
              <p>${name}</p>
              <p>${brand}</p>
            </div>
            <div class="quantity">
              <div class="qty-wrapper">
                <p>qty</p>
                <p class="qty">1</p>
                <div class="chevron">
                  <ion-icon name="chevron-up-outline" class="chevron-top"></ion-icon>
                  <ion-icon name="chevron-down-outline" class="chevron-down"></ion-icon>
                </div>
              </div>
              <div class="cart-price-wrapper">
                <p class="cart-unit-price">${cartPrice}</p>
                <p class="cart-price">${cartPrice}</p>
              </div>
            </div>
            <div class="js-bin">
              <ion-icon name="trash-bin-outline"></ion-icon>
            </div>
          </div>
        </div>
      </div>
      `;
      document.querySelector(".top-cart").innerHTML += cartItem;

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
        // on va chercher touts les noeuds nécéssaire au bon fonctionnement de la fonction:
        // - l'item sur lequel on a cliqué sur le bouton +
        let clickedItem = this.closest(".cart-item-wrapper");
        // on va chercher la quantité et on la transforme en number avec parseFloat
        let quantity = clickedItem.querySelector(".qty");
        console.log(quantity);
        floatQuantity = parseFloat(quantity.innerHTML);
        // on va chercher la prix unitaire qu'on transforme en number
        let unitPrice = clickedItem.querySelector(".cart-unit-price");
        floatUnitPrice = parseFloat(unitPrice.innerHTML);
        // on va chercher le prix total de l'item cliqué
        let itemPrice = clickedItem.querySelector(".cart-price");
        floatItemPrice = parseFloat(itemPrice.innerHTML);
        // --------------------------------------------------------
        //  Ensuite on commence à agir
        // au click sur le +, on ajoute 1 au <p>quantity</p> puis on le met dans une variable pour pouvoir réutiliser cette valeur après
        let qty = (quantity.innerHTML = floatQuantity + 1);

        console.log(floatQuantity);
        // puis au click sur le +, on multiplie le prix unitaire par la quantité d'item ( qty)
        itemPrice.innerHTML = floatUnitPrice * qty + "€";

        calculateSubTotal();
        calculateTotal();
        cartQty()
      }

      // moins
      function chevronMoinsBtn() {
        // on va chercher touts les noeuds nécéssaire au bon fonctionnement de la fonction:
        // - l'item sur lequel on a cliqué sur le bouton -
        let clickedItem = this.closest(".cart-item-wrapper");
        // on va chercher la quantité et on la transforme en number avec parseFloat
        let quantity = clickedItem.querySelector(".qty");
        floatQuantity = parseFloat(quantity.innerHTML);
        // on va chercher la prix unitaire qu'on transforme en number
        let unitPrice = clickedItem.querySelector(".cart-unit-price");
        floatUnitPrice = parseFloat(unitPrice.innerHTML);
        // on va chercher le prix total de l'item cliqué
        let itemPrice = clickedItem.querySelector(".cart-price");
        floatItemPrice = parseFloat(itemPrice.innerHTML);
        // --------------------------------------------------------
        //  Ensuite on commence à agir
        // au click sur le -, on soustrait 1 au <p>quantity</p> puis on le met dans une variable pour pouvoir réutiliser cette valeur après
        let qty = (quantity.innerHTML = floatQuantity - 1);
        // puis au click sur le +, on multiplie le prix unitaire par la quantité d'item ( qty)
        itemPrice.innerHTML = floatUnitPrice * qty + "€";
        // empecher de descendre en dessous de 1 item
        if (qty <= 1) {
          quantity.innerHTML = 1;
          itemPrice.innerHTML = floatUnitPrice + "€";
        }

        calculateSubTotal();
        calculateTotal();
        cartQty()
      }
      // --------------------------------------------------------------------------------------------------------------

      // Fonction bin, qui remove l'item au click, je n'ai pas réussi à faire fonctionner cette fonction à cause du tableau d'id, je n'arrivais pas a supprimer exactement l'id de l'item remove

      // let bin = document.querySelectorAll('.js-bin');
      // for ( el of bin) {
      //   el.addEventListener('click', removeItem)
                
      // }
      // function removeItem() {
      //   let item = this.closest('.cart-item-wrapper')
      //   let price = parseFloat(item.querySelector('.cart-price').innerHTML)
      //   console.log(price);
      //   item.remove()
      //   let subtotal = document.querySelector('.subPrice');
      //   let floatSubTotal = parseFloat(subtotal.innerHTML);
      //   subtotal.innerHTML = floatSubTotal - price + '€'
      //   calculateTotal()
      // }





      //  Fonction qui calcule le saous total, on va l'appeler trois fois, lorsqu'on ajoute un item, quand on augmente la quantité d'un item, et lorsqu'on la diminue .
      function calculateSubTotal() {
        // Sub total
        //  on va chercher tous les noeuds nécéssaires au bon fonctionnement de la fonction
        let subPrice = document.querySelector(".subPrice");
        let itemPrice = document.querySelectorAll(".cart-price");
        //  on créé un tableau qui va contenir tous les prix
        let priceArray = new Array();
        //  boucle qui pour chaque item, push la valeur numérique du prix
        for (el of itemPrice) {
          elFloat = parseFloat(el.innerHTML);
          priceArray.push(elFloat);
          //  on fais la sum du tableau
          function sum(total, num) {
            return total + num;
          }
          //  on l'ecrit dans l'html
          subTot = priceArray.reduce(sum);
          subPrice.innerHTML = subTot + "€";
        }

        calcultaShippingCost();
      }
      calculateSubTotal();

      //  fonction qui calcule les frais de port, on l'a joue dans calculteSubtotal()
      function calcultaShippingCost() {
        let shippingCost = document.querySelector(".js-shippingCost");
        let subPriceShipping = parseFloat(
          document.querySelector(".subPrice").innerHTML
        );
        if (subPriceShipping <= 200) {
          shippingCost.innerHTML = 9.99 + "€";
        } else {
          shippingCost.innerHTML = "free";
        }
      }

      function calculateTotal() {
        // Sub total
        //  on va chercher tous les noeuds nécéssaires au bon fonctionnement de la fonction
        let total = document.querySelector('.finalTotal');
        let subPrice = parseFloat(document.querySelector(".subPrice").innerHTML);
        let subPriceShipping = parseFloat(document.querySelector(".subPrice").innerHTML);
        
        if (subPriceShipping <= 200) {
          let shippingCost = parseFloat(document.querySelector(".js-shippingCost").innerHTML);
          total.innerHTML = subPrice + shippingCost + '€'
        } else {
          total.innerHTML = subPrice + '€'
        }
      }
      calculateTotal();

      function cartQty() {
        let shoppingCart = document.querySelector('.shopping-cart');
        let qties = document.querySelectorAll('.qty');
        let qtiesArray = new Array()
        for ( el of qties) {
          elFloat = parseFloat(el.innerHTML);
          qtiesArray.push(elFloat);
        }

        function sum(total, number) {
          return total + number;
        }


        qty = qtiesArray.reduce(sum);
        shoppingCart.innerHTML = qty

      }cartQty()


    // ---------------------------------------------------------------------------------------------------------------
    // ------- fin du else 
    // ---------------------------------------------------------------------------------------------------------------
    }
    });
  }
}
