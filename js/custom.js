let catdata = JSON.parse(localStorage.getItem("catInfo"));
let product = JSON.parse(localStorage.getItem('productInfo'));
let tr = ` <li class="active" data-filter="*">All</li>`
console.log(catdata);
catdata.map((i) => {
    tr += `
    <li data-filter="#${i.name}">${i.name}</li>
    `
})
document.getElementById("CatName").innerHTML = tr;

let th = ''
catdata.map((i) => {

    product.filter((j) => {
        if (i.id == j.cid) {

            th += ` <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix " id="${i.name}">
            <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="${j.image}">

                    <span class="label">${i.name}</span>
                    <ul class="product__hover">
                        <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                        <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a></li>
                        <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6>${j.prname}</h6>
                    <a href="#" class="add-cart" onclick="addToCart(${j.id})">+ Add To Cart</a>
                  
                    <div class="rating">
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <h5>$${j.price}</h5>
                    <div class="product__color__select">
                        <label for="pc-1">
                            <input type="radio" id="pc-1">
                        </label>
                        <label class="active black" for="pc-2">
                            <input type="radio" id="pc-2">
                        </label>
                        <label class="grey" for="pc-3">
                            <input type="radio" id="pc-3">
                        </label>
                    </div>
                </div>
            </div>
        </div>      
            `
        }
        
    })

});

document.getElementById('prinfo').innerHTML = th;

//insert

let cart = [];
const addToCart = (id) => {
    // console.log(id);
    let cartdata = JSON.parse(localStorage.getItem("addToCartInfo"));
    let obj = {};
    let image = "";
    let prname = "";
    let price = "";
    let qty = "1";
    parseInt(qty)
    
    product.filter((i) => {
        if (i.id == id) {
            image = i.image;
            price = i.price;
            prname = i.prname;
            
        }
    });

    if (cartdata != null) {

        let ans = cartdata.filter((i) => {
            return i.id == id;
        });

        if (ans.length > 0) {
            cartdata.map((i) => {
                if (i.id == id) {
                    i.qty += parseInt(qty)+1,
                    i.total = i.total+i.price;
                }
            })

        } else {
            console.log("else part");
            obj = {
                category: cartdata.length + 1,
                id: id,
                image: image,
                prname: prname,
                price: parseInt(price),
                qty: 1,
                total:parseInt(price)
            }
            cartdata.push(obj);

        }
        localStorage.setItem("addToCartInfo", JSON.stringify(cartdata));
        alert(`${prname} Cart  add successfully`);

    } else {
        obj = {
            category: 1,
            id: id,
            image: image,
            prname: prname,
            price: parseInt(price),
            qty: 1,
            total:parseInt(price)
        }

        cart.push(obj);
        localStorage.setItem("addToCartInfo", JSON.stringify(cart));
        alert(`${prname} Cart added successfully`);
    }
    // disCat()

}


