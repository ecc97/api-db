import { IResponseDB, Item, Meta } from "./interfaces/response-api-interface";

// URL de la API de Dragon Ball
const API_URL: string = 'https://dragonball-api.com/api/characters'
// Elementos del DOM
const ul = document.querySelector(".item-list") as HTMLUListElement;
const prevButton = document.getElementById("prevPage") as HTMLButtonElement;
const nextButton = document.getElementById("nextPage") as HTMLButtonElement;

// Estado de la paginación
let currentPage = 1;
const itemsPerPage = 10;
// Función asíncrona para renderizar los personajes
async function renderItems(page: number): Promise<void> {
    // Obtener datos de la API
    const data: IResponseDB = await getAllCharacters(page, itemsPerPage)
    ul.innerHTML = ''

    // Renderizar cada personaje obtenido
    data.items.forEach((character: Item) => {
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

    // Actualizar el estado de los botones de paginación
    updatePaginationButtons(data.meta)
}

// Función asíncrona para obtener todos los personajes
const getAllCharacters = async (page: number, limit: number): Promise<IResponseDB> => {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    const data: IResponseDB = await response.json();
    return data;
}

// Actualizar estado de los botones de paginación según el meta recibido
const updatePaginationButtons = (meta: Meta): void => {
    prevButton.disabled = meta.currentPage === 1;
    nextButton.disabled = meta.currentPage === meta.totalPages;
}
// Listener para la página anterior
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderItems(currentPage);
    }
});
// Listener para la página siguiente
nextButton.addEventListener("click", () => {
    currentPage++;
    renderItems(currentPage);
});

// Inicializar la paginación en la página 1
renderItems(currentPage);