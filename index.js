

const [ , , metodo, recurso, ...rest ] = process.argv;

// función para interpretar el body de POST y PUT
function bodyParser(args){
    if(!args || args.length===0) return null;
    let joined=args.join(" ");
    if(joined.startsWith("{")){
        try{ return JSON.parse(joined); }catch(e){ console.log("json mal formado",e.message); return null }
    }
    if(args.length>=2){
        let precioRaw=args[args.length-2]
        let cat=args[args.length-1]
        let titulo=args.slice(0,args.length-2).join(" ")
        return { title: titulo, price: isNaN(Number(precioRaw))?precioRaw:Number(precioRaw), category: cat }
    }
    return { title: args[0] }
}

// funciones de manejo de recursos
async function getAll(){
try{
  let r=await fetch("https://fakestoreapi.com/products")
  let d=await r.json()
  console.log("productos:",JSON.stringify(d,null,2))
}catch(err){console.error("err getAll",err)}
}

const getOne= async (id)=>{
  try{
    const r= await fetch("https://fakestoreapi.com/products/"+id)
    const d= await r.json()
    console.log("uno solo:",d)
  }catch(e){ console.error("err getOne",e)}
}

async function add(p){
  try{
    const r=await fetch("https://fakestoreapi.com/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)})
    let d=await r.json()
    console.log("post->",d)
  }catch(e){console.log("fallo post",e.message)}
}

const borrar= async (id)=>{
  try{
    const r=await fetch(`https://fakestoreapi.com/products/${id}`,{method:"DELETE"})
    const d=await r.json()
    console.log("delete:",d)
  }catch(err){console.error("err borrar",err)}
}

async function upd(prod){
  try{
    let r=await fetch("https://fakestoreapi.com/products/"+prod.id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(prod)})
    let d=await r.json()
    console.log("upd ok",d)
  }catch(e){ console.log("no se pudo upd",e) }
}

// lógica principal
async function main(){
    if(metodo==="GET" && recurso==="products"){
        await getAll()
    } else if(metodo==="GET" && recurso && recurso.startsWith("products/")){
        let id=recurso.split("/")[1]
        await getOne(id)
    } else if(metodo==="POST" && recurso==="products"){
        let p=bodyParser(rest)
        if(!p){console.log("faltan datos para POST");return;}
        await add(p)
    } else if(metodo==="PUT" && recurso.startsWith("products/")){
        let id=recurso.split("/")[1]
        let b=bodyParser(rest)
        if(!b){console.log("faltan datos para PUT");return;}
        await upd({id,...b})
    } else if(metodo==="DELETE" && recurso.startsWith("products/")){
        let id=recurso.split("/")[1]
        await borrar(id)
    } else {
        console.log("no entendi el comando 🤔")
        console.log("ejemplos:")
        console.log("npm run start -- GET products")
        console.log("npm run start -- GET products/15")
        console.log("npm run start -- POST products \"Remera Negra\" 350 remeras")
        console.log("npm run start -- PUT products/15 '{\"title\":\"Editado\"}'")
        console.log("npm run start -- DELETE products/5")
    }
}

main()
