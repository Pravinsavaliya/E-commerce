let disCat = () => {
    let cartdata = JSON.parse(localStorage.getItem("addToCartInfo")) || [];
    let tr = '';
    let total = 0;

    cartdata.forEach((i, index) => {
        tr += `
        <tr>
            <td class="product__cart__item">
                <div class="product__cart__item__pic">
                    <img src="${i.image}" height="90px" width="90px" alt="">
                </div>
                <div class="product__cart__item__text">
                    <h6>${i.prname}</h6>
                    <h5>$${i.price}</h5>
                </div>
            </td>
            <td class="quantity__item">
                <div class="quantity">
                    <div class="pro-qty-2">
                        <input type="number" min="1" value="${i.qty}" id="quantity-${index}">
                    </div>
                </div>
            </td>
            <td class="cart__price">$${i.total}</td>
            <td class="cart__close"><i class="fa fa-close" onclick="removeItem(${index})"></i></td>
        </tr>`;
        total += i.total;
    });
    
    let tt = `<li>Subtotal <span>$${total}</span></li>`;
    let td =` <div class="continue__btn update__btn">
    <a href="#"  onclick="updateCart()"><i class="fa fa-spinner"></i> Update cart</a>
</div>`

    document.getElementById("cartid").innerHTML = tr;
    document.getElementById("total").innerHTML = tt;
    document.getElementById("udpcart").innerHTML = td;

}



function removeItem(index) {
    let cartdata = JSON.parse(localStorage.getItem("addToCartInfo")) || [] ;
     cartdata.splice(index,1); // Remove the item at the specified index
    console.log(cartdata);
    localStorage.setItem("addToCartInfo", JSON.stringify(cartdata));
    alert(`delete cart item successfully`);

    disCat(); // Update the displayed cart after removing the item
}
function updateCart() {

    let cartdata = JSON.parse(localStorage.getItem("addToCartInfo")) ||[];
    cartdata.forEach((item, index) => {
        let newQuantity = document.getElementById(`quantity-${index}`).value;
        cartdata[index].qty = parseInt(newQuantity);
        cartdata[index].total = parseInt(newQuantity) * item.price;

});

    localStorage.setItem("addToCartInfo", JSON.stringify(cartdata));
    alert("upsateCart item  successfully");

    disCat(); // Update the displayed cart after updating quantities


}

disCat();
