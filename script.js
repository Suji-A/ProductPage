const btnCart = document.querySelector('#car');
const Cart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');

btnCart.addEventListener('click',()=>{
    Cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    Cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadShop);

function loadShop(){
    loadContent();
 
}

function loadContent(){
    //remove shop items from cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
    });

    //product item change event
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });

    //Product Cart

    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click', addCart);
    });
    
    updateTotal();
}
//Remove Item
function removeItem(){
    if(confirm('Are Your Sure to Remove')){
        let title=this.parentElement.querySelector
        ('.cart-shop-title').innerHTML;
        itemList=itemList.filter(el=>el.title != title);
    this.parentElement.remove();
    loadContent();

    }
}

//change quantity
function changeQty() {
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}

let itemList=[];

//Add Cart

function addCart(){
  let shop=this.parentElement;
  let title =shop.querySelector('.shop-title').innerHTML;
  let price =shop.querySelector('.shop-price').innerHTML;
  let imgSrc = shop.querySelector('.shop-img').src;

  let newProduct={title,price,imgSrc}

  //check product already exist in cart
  if(itemList.find((el)=>el.title==newProduct.title))
  {
    alert("Product Already Added in Cart");
    return;
  }else{
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title,price,imgSrc);
  let element = document.createElement('div');
  element.innerHTML=newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title,price,imgSrc) {
    return `
    <div class="cart-box">
        <img src="${imgSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-shop-title">${title}</div>
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">R${price}</div>
                </div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa-solid fa-trash cart-remove" ></i>
    </div>
    `
}

function updateTotal()
{
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');
    
    let total=0;

    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty = product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
    });

    totalValue.innerHTML='Rs.'+total;


    //Add Product Count in Cart Icon

    const cartCount = document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0)
        {
            cartCount.style.display='none';
        }else{
            cartCount.style.display='block';
        }
}
    
