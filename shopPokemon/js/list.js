let ctnList = document.getElementById("ctn-list-cart");
let cartEmpty = document.getElementById("cart-empty");
let alerBought = document.getElementById('alert-bought');
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#56d536',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#730b59',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy: '#f53eff',
    dark: '#242424',
    default: '#ffffff33'
};

// A total of 898 pokemons

let listPokemon = JSON.parse(localStorage.getItem('listPokemon'));

console.log(listPokemon);

for(pokemon in listPokemon){
    listPokemon[pokemon].forEach(e => {
        let value = e;
        fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then(data => data.json())
        .then(res => renderPokemonData(res))
    });
}

renderPokemonData=(data)=>{
    console.log(data.name);

    let sprite = data.sprites.front_default;
    let {types} = data;
    let id = data.id;

    let ctn = document.createElement('div');
    let imgCtn = document.createElement('div');
    let nameCtn = document.createElement('div');
    let idCtn = document.createElement('div');

    let colorOne = typeColors[types[0].type.name];
    let colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    nameCtn.innerHTML = `<h6>${data.name[0].toUpperCase() + data.name.substring(1)}</h6>`;
    idCtn.innerHTML = `<h5>${id.toString().padStart(3,'00')}</h5>`;
    generateLayout(ctn, imgCtn, nameCtn, idCtn);
    setSprite(sprite, imgCtn);
}

if(ctnList.hasChildNodes){
    cartEmpty.remove();
}

const generateLayout=(ctn, imgCtn, nameCtn, idCtn)=>{
    let fragment = document.createDocumentFragment();
    ctn.classList.add('col-4', 'col-md-3', 'border', 'border-1', 'bg-white', 'p-0', 'text-center', 'm-0');
    imgCtn.classList.add('border');
    nameCtn.classList.add('border');
    idCtn.classList.add('border');

    ctn.classList.add('ctn-size');
    ctn.style.cssText = `min-width: 140px;`;

    ctn.append(imgCtn);
    ctn.append(nameCtn);
    ctn.append(idCtn);
    fragment.append(ctn);
    ctnList.append(fragment);
}

const setSprite=(sprite, imgCtn)=>{
    let img = document.createElement('img');
    
    img.setAttribute('src', sprite);

    img.style.cssText = `width: 100px`;

    imgCtn.append(img);
}

const buyStuff=()=>{
    alerBought.classList.add('show');
    alerBought.style.top = '100px';
    setTimeout(() => {
        localStorage.clear();
        document.location.href = 'index.html';
    }, 1500);
}