var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'https://dragonball-api.com/api/characters';
const ul = document.querySelector(".item-list");
function renderItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getAllCharacters();
        ul.innerHTML = '';
        data.forEach((character) => {
            console.log(character);
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
    });
}
const getAllCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(API_URL);
    const data = yield response.json();
    return data.items;
});
renderItems();
export {};
