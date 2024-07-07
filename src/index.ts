import { IResponseDB, Item } from "./interfaces/response-api-interface";

const API_URL: string = 'https://dragonball-api.com/api/characters'

const ul = document.querySelector(".item-list") as HTMLUListElement;

async function renderItems(): Promise<void> {
    const data: Item[] = await getAllCharacters()
    ul.innerHTML = ''

    data.forEach((character: Item) => {
        console.log(character)
        ul.innerHTML += `
            <li class="item">
                <h4>${character.name}</h4>
                <img src="${character.image}" alt="${character.name}">
                <p>Race: ${character.race}</p>
                <p>Ki: ${character.ki} / ${character.maxKi}</p>
                <p>Gender: ${character.gender}</p>
                <p>Affiliation: ${character.affiliation}</p>
                <p>Description: ${character.description}</p>
            </li>
        `
    })
}

const getAllCharacters = async (): Promise<Item[]> => {
    const response = await fetch(API_URL);
    const data: IResponseDB = await response.json();
    return data.items;
}

renderItems();