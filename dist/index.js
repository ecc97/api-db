var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// URL de la API de Dragon Ball
const API_URL = 'https://dragonball-api.com/api/characters';
// Elementos del DOM
const ul = document.querySelector(".item-list");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
// Estado de la paginación
let currentPage = 1;
const itemsPerPage = 10;
// Función asíncrona para renderizar los personajes
function renderItems(page) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener datos de la API
        const data = yield getAllCharacters(page, itemsPerPage);
        ul.innerHTML = '';
        // Renderizar cada personaje obtenido
        data.items.forEach((character) => {
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
        `;
        });
        // Actualizar el estado de los botones de paginación
        updatePaginationButtons(data.meta);
    });
}
// Función asíncrona para obtener todos los personajes
const getAllCharacters = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}?page=${page}&limit=${limit}`);
    const data = yield response.json();
    return data;
});
// Actualizar estado de los botones de paginación según el meta recibido
const updatePaginationButtons = (meta) => {
    prevButton.disabled = meta.currentPage === 1;
    nextButton.disabled = meta.currentPage === meta.totalPages;
};
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
export {};
