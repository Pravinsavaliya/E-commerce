let catList = JSON.parse(localStorage.getItem('catInfo'));
let tr = '<option>--Select Catgeory--</option>';
catList.map((i) => {
    tr+= `<option value="${i.id}">${i.name}</option>`
});
document.getElementById("catid").innerHTML = tr;
// insert data
let prData = [];
const addProduct =()=>{

        let data = JSON.parse(localStorage.getItem('productInfo'));
       
    let cid = document.prodfrm.catid.value;
    let pid = document.prodfrm.pid.value;
    let prname = document.prodfrm.prname.value;
    let price = document.prodfrm.price.value;
    let dsc = document.prodfrm.dsc.value;
    let primage = JSON.parse(localStorage.getItem('primage'));

   
    let obj='';
  if (pid != '') {
        data.map((i)=>{
            if(i.id == pid){
                i.cid=cid, 
                i.prname = prname
                i.price = price
                i.description=dsc
                i.image = (primage!=null)?primage:i.image;
            }
        })
        localStorage.setItem("productInfo",JSON.stringify(data));

  } else {
    if(data!=null){
        obj= {
            id:data.length+1,
            prname:prname,
            price:price,
            cid:cid,
            description:dsc,
            image:primage
        }
        prData=data
    
       }else{
         obj= {
            id:1,
            prname:prname,
            price:price,
            cid:cid,
            description:dsc,
            image:primage
        }
       }
    
       
        prData.push(obj);
        localStorage.setItem("productInfo",JSON.stringify(prData));
  }
  document.prodfrm.pid.value=""
  document.prodfrm.prname.value="";
  localStorage.removeItem("primage");
  document.getElementById('preview').src = "";
    document.prodfrm.reset();
    disproduct();


}

// display data
let disproduct = () => {
    let data = JSON.parse(localStorage.getItem('productInfo'));
    let catdata = JSON.parse(localStorage.getItem("catInfo"));
    
    let tbl = ''
    data.map((i) => {
        catdata.filter((j)=>{
            if(j.id == i.cid){
                return i.cname = j.name
            }
        })
        tbl += `
            <tr>
                <td>${i.id}</td>    
                <td>${i.cname}</td>
                <td>${i.prname}</td>
               <td>${i.price}</td>
               <td>${i.description}</td>
     <td><img src="${i.image}" height="50px" width="50px"</td>
               
                <td>
                <a href="#"  class="btn btn-success" onclick="editData(${i.id})">Edit</a>
                <a href="#"  class="btn btn-danger" onclick="delData(${i.id})">Delete</a>
                </td>
            </tr>
        `})
    document.getElementById("allProdData").innerHTML = tbl;

}
//delete data
let delData = (id) => {
    let data = JSON.parse(localStorage.getItem('productInfo'));
    data.splice(id - 1, 1); 
    data.forEach((i, index) => {
        i.id = index + 1;
    });
    localStorage.setItem("productInfo", JSON.stringify(data));
    disproduct();
};

// edit data
let editData=(id)=>{
    let data = JSON.parse(localStorage.getItem('productInfo'));
    let cat = data.filter((i)=>{
        return i.id == id
    })
    document.prodfrm.pid.value=cat[0].id;
    document.prodfrm.prname.value=cat[0].prname;
    document.prodfrm.price.value=cat[0].price
    document.prodfrm.catid.value =cat[0].cid;
    document.prodfrm.dsc.value  = cat[0].description;
    document.primage.src =cat[0].image;
    
    document.getElementById("btn").innerHTML=(id!="")?"Update":"Submit";


}
// imge
const displayImage=(e)=>{
    var input = e.target;
        var image=document.getElementById('preview');
        if(input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function(e){
                image.src = e.target.result;
                localStorage.setItem("primage",JSON.stringify(e.target.result));
            }
            reader.readAsDataURL(input.files[0]);
        }

}
disproduct();