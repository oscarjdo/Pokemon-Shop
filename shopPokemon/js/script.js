let pokedexCtn = document.getElementById("pokedex");
let ctnShopSection = document.getElementById("ctn-shop-section");
let ctnShopBttns = document.getElementById("ctn-shop-bttns");
let ctnList = document.getElementById("ctn-list-shop");
let form = document.getElementById("form");
let inputSearch = document.getElementById("inputSearch");
let bgBlack = document.getElementById("bg-black");
let addBttn = document.getElementById("bttnAddToCart");
let clearBttn = document.getElementById("bttnClearList");
let alerError = document.getElementById('alert-error');
let alertNoPokemon = document.getElementById("alert-no-pokemon");
let pokemonGeneration = '';
let editMode = false;
let addToListMode = false;
let listToAdd = [];
let listToAddToPokedex = [];
let mediaqueryList = window.matchMedia("(max-width: 767.98px)");
let generationCtn = document.getElementById("pokedex-ctn-div");
let firstGeneration = document.getElementById('first-generation');
let secondGeneration = document.getElementById('second-generation');
let thirdGeneration = document.getElementById('third-generation');
let fourthGeneration = document.getElementById('fourth-generation');
let fifthGeneration = document.getElementById('fifth-generation');
let sixthGeneration = document.getElementById('sixth-generation');
let seventhGeneration = document.getElementById('seventh-generation');
let eighthGeneration = document.getElementById('eighth-generation');
let generation = firstGeneration;
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
    default: '#ffffff44'
};

for(let i = 1; i <= 151; i++){
    generation
    getPokemon(i, generation);
}
for(let i = 152; i <= 250; i++){
    generation = secondGeneration;
    getPokemon(i, generation);
}
for(let i = 251; i <= 386; i++){
    generation = thirdGeneration;
    getPokemon(i, generation);
}
for(let i = 387; i <= 493; i++){
    generation = fourthGeneration;
    getPokemon(i, generation);
}
for(let i = 494; i <= 649; i++){
    generation = fifthGeneration;
    getPokemon(i, generation);
}
for(let i = 650; i <= 721; i++){
    generation = sixthGeneration;
    getPokemon(i, generation);
}
for(let i = 722; i <= 809; i++){
    generation = seventhGeneration;
    getPokemon(i, generation);
}
for(let i = 810; i <= 898; i++){
    generation = eighthGeneration;
    getPokemon(i, generation);
}

async function getPokemon(num, gen){
    let url = `https://pokeapi.co/api/v2/pokemon/${num.toString()}`;
    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonTypes = pokemon["types"]
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonId = pokemon["id"];

    let labelCtn = document.createElement('label');
    let imgCtn = document.createElement('div');
    let imgBg = document.createElement('div');
    let nameCtn = document.createElement('div');
    let idCtn = document.createElement('div');
    let inputCheck = document.createElement('input');
    
    nameCtn.innerHTML = `<h6>${pokemonName[0].toUpperCase() + pokemonName.substring(1)}</h6>`;
    idCtn.innerHTML = `<h5>#${pokemonId.toString().padStart(3,'00')}</h5>`;
    inputCheck.classList.add('all-checkbox-pokedex');
    inputCheck.setAttribute('type', 'checkbox');
    inputCheck.setAttribute('id', `checkbox${num}`);
    labelCtn.setAttribute('for',`checkbox${num}`);
    
    let fragment = document.createDocumentFragment();
    labelCtn.classList.add('col-4', 'col-md-3', 'col-lg-2', 'border', 'border-1', 'bg-white', 'p-2', 'text-center', 'position-relative');
    imgCtn.classList.add('d-flex', 'flex-row-reverse');
    imgBg.classList.add('rounded-pill', 'm-auto');
    imgBg.style.width = 'fit-content';
    inputCheck.classList.add('checkbox-pokedex');
    gen.classList.add('row');
    gen.style.cssText = 'list-style: none;';

    nameCtn.firstElementChild.classList.add('p-0', 'm-0');
    idCtn.firstElementChild.classList.add('p-0', 'm-0');
    
    labelCtn.classList.add('ctn-size');
    labelCtn.style.cssText = `min-width: 140px;`;
    
    labelCtn.append(imgCtn);
    labelCtn.append(nameCtn);
    labelCtn.append(idCtn);
    fragment.append(labelCtn);
    gen.append(fragment);
    
    let colorOne = typeColors[pokemonTypes[0].type.name];
    let colorTwo = pokemonTypes[1] ? typeColors[pokemonTypes[1].type.name] : typeColors.default
    let img = document.createElement('img');
    img.setAttribute('src', pokemonImg);
    img.classList.add('bg-imgs');
    img.style.cssText = `width: 100px`;
    imgBg.style.background = colorOne;
    imgBg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    imgBg.style.backgroundSize = `5px 5px`;
    
    imgBg.append(img);
    imgCtn.append(imgBg);
    imgCtn.append(inputCheck);

}

const searchPokemon =(event)=>{
    if(addToListMode == false){
        event.preventDefault();
        let {value} = event.target.pokemon;
        if(value[0] == '0' && value[1] == '0'){
            value = value.slice(2);
        }else if(value[0] == '0'){
            value = value.slice(1);
        }
        fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(res => renderPokemonData(res))
        .catch(err => pokemonNotFound())
    } else if(addToListMode == true){
        let {value} = '';
        listToAddToPokedex.forEach(i =>{
            value = i;
            fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
            .then(data => data.json())
            .then(res => renderPokemonData(res))
            .catch(err => pokemonNotFound())
        });
    }
}

const renderPokemonData=(data)=>{
    ctnList.classList.add('ctn-list-shop-scroll');
    let sprite = data.sprites.front_default;
    let id = data.id;
    let { types, stats } = data;

    let colorOne = typeColors[types[0].type.name];
    let colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    ctnShopSection.hidden = false;
    ctnShopBttns.hidden = false;

    if(editMode == false){
        let rowCtn = document.createElement('div');
        let imgCtn = document.createElement('div');
        let rowNameIdCtn = document.createElement('div');
        let nameCtn = document.createElement('div');
        let idCtn = document.createElement('div');
        let typesCtn = document.createElement('div');
        let statsCtn = document.createElement('div');
        let rowBttnsCtn = document.createElement('div');
        let bttnEditCtn = document.createElement('div');
        let bttnDeleteCtn = document.createElement('div');
        
        nameCtn.innerHTML = `Name:<br> <h6>${data.name[0].toUpperCase() + data.name.substring(1)}</h6>`;
        idCtn.innerHTML = `Id:<br> <h5>${id.toString().padStart(3,'00')}</h5>`;
        setSprite(sprite, colorOne, colorTwo, imgCtn);
        setTypes(types, typesCtn);
        setStats(stats, statsCtn);
        generateLayout(data, rowCtn, imgCtn, rowNameIdCtn, nameCtn, idCtn, typesCtn, statsCtn, rowBttnsCtn, bttnEditCtn, bttnDeleteCtn);
        
        console.log(rowCtn);
        
        clearBttn.addEventListener('click', ()=>{
            rowCtn.remove();
            console.clear();
            ctnShopSection.hidden = true;
            ctnShopBttns.hidden = true;
        });
    } else if(editMode == true){
        document.getElementById('edit-mode-ctn-active').children[1].firstElementChild.innerHTML = `Name:<br> <h6>${data.name[0].toUpperCase() + data.name.substring(1)}</h6>`;
        document.getElementById('edit-mode-ctn-active').children[1].lastElementChild.innerHTML = `Id:<br> <h5>${id.toString().padStart(3,'00')}</h5>`;
        setSprite(sprite, colorOne, colorTwo, colorTwo);
        setTypes(types);
        setStats(stats);
    }
}

addBttn.addEventListener('click', ()=>{
    let amount = ctnList.childElementCount;
    amount -= 1
    console.log(amount);
    if(amount == 0){
        alertNoPokemon.classList.add('show');
        alertNoPokemon.style.top = '100px';
        setTimeout(() => {
            alertNoPokemon.classList.remove('show');
            alertNoPokemon.style.top = '-30px';
        }, 2000);
    }
    else if(amount == 1){
        listToAdd.push(ctnList.children[1].children[1].firstElementChild.lastElementChild.textContent.toLowerCase());
        sendData();
    }
    else if(amount >= 2){
        for(i = 1; i <= amount; i++){
            listToAdd.push(ctnList.children[i].children[1].firstElementChild.lastElementChild.textContent.toLowerCase());
        }
        sendData();
    }
    else {
        console.log('Error');
    }

});

const sendData=()=>{
    console.log(listToAdd);
    localStorage.setItem('listPokemon', JSON.stringify({listToAdd}));
    document.location.href = 'list.html';
}

const setSprite=(sprite, colorOne, colorTwo, imgCtn)=>{
    if(editMode == false){
        let img = document.createElement('img');
        let bgImgCtn = document.createElement('div');
        
        img.setAttribute('src', sprite);
    
        img.style.cssText = `width: 100%`;
        bgImgCtn.style.cssText = 'width: fit-content; border-radius: 50%; width: 100%; border: 2px solid #000';
        // imgCtn.style.position = `relative`;
        
        bgImgCtn.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
        bgImgCtn.style.backgroundSize = `5px 5px`;
    
        bgImgCtn.appendChild(img);
        imgCtn.appendChild(bgImgCtn);
    } else {
        document.getElementById('edit-mode-ctn-active').firstElementChild.firstElementChild.firstElementChild.setAttribute('src', sprite);
        document.getElementById('edit-mode-ctn-active').firstElementChild.firstElementChild.style.cssText = `border-radius: 50%; width: 100%; border: 2px solid rgb(0, 0, 0); background: radial-gradient(${colorTwo} 33%, ${colorOne} 33%); background-size: 5px 5px;`;
    }
}

const setTypes=(types, typesCtn)=>{
    let typeBox = document.createElement('div');
    typeBox.classList.add('row', 'edit-types-ctn');
    
    
    types.forEach(type => {
        let textPokemonType = document.createElement('p');
        
        textPokemonType.style.cssText = `border: 2px solid ${typeColors[type.type.name]}`;
        textPokemonType.style.color = typeColors[type.type.name];
        textPokemonType.textContent = type.type.name;
        textPokemonType.classList.add('edit-types', 'col-6', 'col-md-12', 'text-center', 'text-md-start', 'p-1', 'my-1');
        
        typeBox.appendChild(textPokemonType);
    });
    if(editMode == false){
        typesCtn.style.paddingTop = `10px`;
        typesCtn.innerHTML = `Types:<br>`;
        
        typesCtn.appendChild(typeBox);
    } else {
        document.getElementById('edit-mode-ctn-active').children[2].lastElementChild.remove();

        document.getElementById('edit-mode-ctn-active').children[2].appendChild(typeBox);
    }
}

const setStats=(stats, statsCtn)=>{
    let statsBox = document.createElement('div');
    
    stats.forEach(stat =>{
        let statBoxIndividual = document.createElement('div');
        let statName = document.createElement('div');
        let statAmount = document.createElement('div');
        
        statName.textContent = stat.stat.name;
        statAmount.textContent = stat.base_stat;
        statBoxIndividual.classList.add('d-flex', 'flex-wrap', 'justify-content-between');
        statBoxIndividual.style.fontSize = `14px`;

        statBoxIndividual.appendChild(statName);
        statBoxIndividual.appendChild(statAmount);
        statsBox.appendChild(statBoxIndividual);
    });
    if(editMode == false){
        statsCtn.innerHTML = `Stats:<br>`;
        statsCtn.appendChild(statsBox);
    } else {
        document.getElementById('edit-mode-ctn-active').children[3].lastElementChild.remove();

        document.getElementById('edit-mode-ctn-active').children[3].appendChild(statsBox);
    }
}

const generateLayout=(data, rowCtn, imgCtn, rowNameIdCtn, nameCtn, idCtn, typesCtn, statsCtn, rowBttnsCtn, bttnEditCtn, bttnDeleteCtn)=>{
    let fragment = document.createDocumentFragment();

    rowCtn.classList.add('row', 'w-100', 'border-bottom', 'border-dark', 'border-3', 'm-auto','p-0', 'bg-white');
    imgCtn.classList.add('col-6', 'col-md-2', 'p-2', 'border');

    rowNameIdCtn.classList.add('row', 'col-6', 'col-md-2', 'p-0', 'm-0', 'border');
    nameCtn.classList.add('col-12', 'border', 'pt-2');
    idCtn.classList.add('col-12', 'border', 'pt-2');
    
    typesCtn.classList.add('col-12', 'col-md-2', 'border');
    statsCtn.classList.add('col-12', 'col-md-4', 'border');
    
    rowBttnsCtn.classList.add('row', 'col-12', 'col-md-2', 'p-0', 'm-0', 'border');
    bttnEditCtn.classList.add('col-6', 'col-md-12', 'border');
    bttnDeleteCtn.classList.add('col-6', 'col-md-12', 'border');
    
    setBttns(bttnEditCtn, bttnDeleteCtn, rowCtn, data);
    
    rowNameIdCtn.appendChild(nameCtn);
    rowNameIdCtn.appendChild(idCtn);

    rowBttnsCtn.appendChild(bttnEditCtn);
    rowBttnsCtn.appendChild(bttnDeleteCtn);
    
    rowCtn.appendChild(imgCtn);
    rowCtn.appendChild(rowNameIdCtn);
    rowCtn.appendChild(typesCtn);
    rowCtn.appendChild(statsCtn);
    rowCtn.appendChild(rowBttnsCtn);
    fragment.appendChild(rowCtn);
    ctnList.appendChild(fragment);
}

const setBttns=(bttnEditCtn, bttnDeleteCtn, rowCtn, data)=>{
    let bttnEdit = document.createElement('button');
    let bttnDelete = document.createElement('button');
    
    bttnEdit.classList.add('w-100', 'h-100', 'text-white', 'bg-warning', 'd-flex', 'justify-content-center', 'align-items-center', 'py-2');
    bttnDelete.classList.add('w-100', 'h-100', 'text-white', 'bg-danger', 'd-flex', 'justify-content-center', 'align-items-center', 'py-2');
    bttnEditCtn.classList.add('p-2');
    bttnDeleteCtn.classList.add('p-2');

    bttnEdit.style.cssText = 'position: relative; z-index: 70;';
    bttnDelete.style.cssText = 'position: relative; z-index: 70;';
    
    bttnDelete.textContent = `Delete`;
    bttnEdit.textContent = `Edit`;
    
    bttnEditCtn.appendChild(bttnEdit);
    bttnDeleteCtn.appendChild(bttnDelete);
    
    bttnEdit.addEventListener('click',()=>{
        rowCtn.style.cssText = `position: relative; z-index: 500;`;
        inputSearch.style.cssText = 'position: relative; z-index: 100;';
        bgBlack.style.display = `block`;

        document.body.style.setProperty('overflow', 'hidden');
        ctnList.style.setProperty('overflow-y', 'hidden');

        bttnEdit.setAttribute('type', 'text');
        
        rowCtn.setAttribute('id', 'edit-mode-ctn-active');
        editMode = true;
        inputSearch.focus();
        
        
        document.addEventListener("mouseup", (event)=>{
            if (!inputSearch.contains(event.target)) {
                close();
            }
        });
        const close=()=>{
            editMode = false;
            bgBlack.style.display = `none`;
            document.body.style.setProperty('overflow', 'auto');
            ctnList.style.setProperty('overflow-y', 'scroll');
            rowCtn.style.cssText = `position: static; z-index: 1`;
            rowCtn.removeAttribute('id','edit-mode-ctn-active');
        }
    });
    
    bttnDelete.addEventListener('click', ()=>{
        rowCtn.remove();
        if(ctnList.childElementCount > 1){
            console.log('thera are still childrens');
        } else {
            ctnShopSection.hidden = true;
            ctnShopBttns.hidden = true;
        }
    });
}

const pokemonNotFound =()=>{
    alerError.classList.add('show');
    alerError.style.top = '100px';
    setTimeout(() => {
        alerError.classList.remove('show');
        alerError.style.top = '-30px';
    }, 2000);
}

const sendListPokemon=(event)=>{
    if(event.delegateTarget.nextElementSibling){
        pokedexCtn.appendChild(event.delegateTarget.nextElementSibling);
    }
}

const addPokemons=()=>{
    let checkbox = document.querySelectorAll('.all-checkbox-pokedex');
    addToListMode = true;
    checkbox.forEach( i =>{
        if(i.checked){
            // console.log(i)
            // console.log(i.parentElement.nextElementSibling.textContent.toLowerCase());
            listToAddToPokedex.push(i.parentElement.nextElementSibling.textContent.toLowerCase());
        }
    });
    console.log(listToAddToPokedex);
    searchPokemon();
    addToListMode = false;
}