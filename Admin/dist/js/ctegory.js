let arr = [];
let disData = () => {
    let data = JSON.parse(localStorage.getItem('catInfo'));
    let name = document.catfrm.iptName.value;
    let catid = document.catfrm.catid.value;
    let obj = {};
    if(name!=""){
        if (catid!='') {
            data.map((i)=>{
                if (i.id==catid) {
                    i.name=name;
                }
            })
            localStorage.setItem("catInfo", JSON.stringify(data));
    
    
        } else {
            if (data != null) {
                obj = {
                    id: data.length + 1,
                    name: name
                }
                arr = data
        
            } else {
                obj = {
                    id: 1,
                    name: name
                }
        
            }
        
            arr.push(obj);
            localStorage.setItem("catInfo", JSON.stringify(arr));
        }
    
    
        document.catfrm.iptName.value = '';
        document.catfrm.catid.value = '';
    
        // document.catfrm.reset();
        disCat()
    }
}


let disCat = () => {
    let data = JSON.parse(localStorage.getItem('catInfo'));
    let tr = ''
    data.map((i) => {
        tr += `
            <tr>
                <td>${i.id}</td>    
                <td>${i.name}</td>
                <td>
                <a href="#"  class="btn btn-success" onclick="editData(${i.id})">Edit</a>
                <a href="#"  class="btn btn-danger" onclick="delData(${i.id})">Delete</a>
                </td>
            </tr>
        `})
    document.getElementById("dispData").innerHTML = tr;
}
//daldata
let delData = (id) => {
    let data = JSON.parse(localStorage.getItem('catInfo'));
    data.splice(id - 1, 1);
    let k = 1
    data.map((i) => {
        i.id = k++
    });
    localStorage.setItem("catInfo", JSON.stringify(data));
    disCat();
}
// edit data
const editData = (id) => {
    let data = JSON.parse(localStorage.getItem('catInfo'));
    let cat = data.filter((i) => {
        return i.id == id;
    });
    document.catfrm.iptName.value = cat[0].name;
    document.catfrm.catid.value = cat[0].id;
    id = document.catfrm.catid.value;
}
disCat();