fetch('assets/data/sneakers.json')
.then( res => res.json())
.then((jsonSneakers) => { 
    jsonSneakers.results.map(
    (sneakers) => {
     let image = sneakers.image;
     let name = sneakers.name;
     let brand = sneakers.brand;
     let ok = sneakers.plus;
     let price = sneakers.price;
    
     let sneakersItem = `
     <div class="item">
     <div class="heart">
         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30">
         <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.856,6.973a8.4,8.4,0,0,0-11.91,0L18.323,8.6,16.7,6.973A8.435,8.435,0,1,0,4.79,18.921l1.623,1.628L18.323,32.5l11.91-11.948,1.623-1.628a8.466,8.466,0,0,0,0-11.948Z" transform="translate(-1.323 -3.497)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
         </svg>
     </div>
     <div class="sneakers-info">
         <div class="sneakers-img">
         <img src="${image}" alt="paire de sacai villain red">
         </div>
         <h2>${name}</h2>
         <h3>${brand}</h3>
         <div class="price">
             <h4>${price}</h4>
             <button class="add-cart-btn" >+</button>
         </div>
     </div>
 </div>
      `;
        document.querySelector('.shopping-items').innerHTML += sneakersItem;
    }

    )
})


function myfonction() {
let lastItem = document.getElementsByClassName('.item');
console.log(lastItem[1]);


}

myfonction()







