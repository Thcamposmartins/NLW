function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())//função anomima curta
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("select[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML="<option value>Seleciona a cidade</option>"
    citySelect.disabled=true

    fetch(url)
    .then(res => res.json())//função anomima curta
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled=false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)

const ItemsToCollect =document.querySelectorAll(".items-grid li")
for(const item of ItemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}
const collectedItems= document.querySelector("Input[name=items]")
let selectedItems =[]
function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover classe JS
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    // função findIndex recebe item como paremetro e retorna TRue ou False da compar. item e etemID
    const alreadySelected = selectedItems.findIndex(item => item==itemId)
if (alreadySelected>=0){
    const filteredItems = selectedItems.filter(item=>{
        const itemIsDifferent = item !=itemId //false
        return itemIsDifferent
    })
    selectedItems=selectedItems
}
else{
    selectedItems.push(itemsId)
}
    collectedItems.value = selectedItems
}