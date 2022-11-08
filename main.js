const url = "https://pokeapi.co/api/v2/pokemon/"
const PokemonContainer = document.getElementById("pokemon-container")
const input = document.getElementById("inputPoke")
const button = document.getElementById("button")
const msg= document.getElementById("msg")


const dataUrl= async(url,id, queryParameters="")=>{
    try{
        const res = await fetch(url+id+queryParameters);
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err);
        return {}
    }
}
const renderError=(msg)=>{
    const html = `
    <div id="pizza-container2">
        <p class="txt-nm">${msg}</p>
    </div>
    `
    PokemonContainer.innerHTML=html;
}
const showError =(message)=>{
    msg.textContent = "";
    msg.textContent = message;
}

const showSuccess =()=>{
    msg.textContent = ""
}
function pokeRender(data){
    const types = data.types.map(objType => objType.type.name).join(" / ")
    const html=`
<div id="pizza-container2">
    <img src=${data.sprites.other.home.front_default} alt="">
        <h1>${data.name}</h1>
        <h2>${types}</h2>
        <h2>altura:${data.height / 10}</h2>
        <h2>peso:${data.weight / 10}</h2>
        
    </div>
</div>
`
PokemonContainer.innerHTML += html
}
const PokeRequest= async(event)=>{
    event.preventDefault();
    const idSelected = input.value.trim()
    if (idSelected==""){
        renderError("Debes ingresar un ID.")
        showError("Debes ingresar un ID.")
        return
    }
    showSuccess();
    const data = await dataUrl(url,idSelected);
    if (Object.keys(data).length == 0){
        const msg = `No se encontró el pokemon con esa id`
        showError(msg)
        renderError(msg);
        return;
    }
    pokeRender(data);
}

const init=()=>{
    button.addEventListener("click", PokeRequest)
}
init()