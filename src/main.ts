import type { JSONPlaceHolderData } from "./types";
import axios, { } from 'axios';

const API_URL: string = 'https://jsonplaceholder.typicode.com/posts';
let currentPage: number = 1;
const itemsPerPage: number = 9;

const httpClientSelectorEl = document.getElementById('http-client') as HTMLSelectElement;
const searchInputEl = document.getElementById('search-input') as HTMLInputElement;
const form = document.getElementById('http-client-form') as HTMLFormElement;
const loadingElement = document.getElementById('loading-icon') as HTMLImageElement;
const errorElement = document.getElementById('error-element') as HTMLParagraphElement;
const paginationButtonsContainer = document.getElementById('pagination-buttons-container') as HTMLDivElement;

const responseStatusContainerEl = document.getElementById('response-status-container') as HTMLDivElement;
const resultsContainerEl = document.getElementById('results-container') as HTMLDivElement;

form.addEventListener('submit', async (e: Event)=> {
    e.preventDefault();   
    await fetchData();
});

const showLoading = (): void => {
    loadingElement.classList.remove('hidden');
}

const hideLoading = (): void => {
    loadingElement.classList.add('hidden');
}

const showError = (message: string): void => {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

const hideError = (): void => {
    errorElement.classList.add('hidden');
}

async function fetchData() {
    const searchTerm = searchInputEl.value;
    const useAxios = httpClientSelectorEl.value === 'axios';
    showLoading();
    hideError();
    try {
        if (useAxios) {
            await fetchDataWithAxios(searchTerm);
        } else {
            await fetchDataWithFetch(searchTerm);
        }
    } catch (error) {
        if(error instanceof Error){
            showError(error.message);
        }else{
            showError("Unexpected error");
        }
    } finally {
        hideLoading();
    }
}

const fetchDataWithFetch = async(searchTerm: string): Promise<void> => {
    if(!searchTerm){
        throw new Error(`There isn't a search term defined in form`);
    }
    const response: Response = await fetch(`${API_URL}/?q=${searchTerm}&_page=${currentPage}&_limit=${itemsPerPage}`);
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data: JSONPlaceHolderData = await response.json();
    const totalItems = Number(response.headers.get('X-Total-Count'));
    displayResults(data, totalItems);
}

const fetchDataWithAxios = async(searchTerm: string): Promise<void> => {
    if(!searchTerm){
        throw new Error(`There isn't a search term defined in form`);
    }
    await axios.get(API_URL, {
        params:{
            q: searchTerm,
            _page: currentPage,
            _limit: itemsPerPage
        }
    }).then((response) => { 
        const data = response.data;
        const totalItems = response.headers['x-total-count'];

        displayResults(data, totalItems);
    }).catch((error) => {
        throw new Error(error)
    });
}

const displayResults = (items:JSONPlaceHolderData, totalItems: number): void => {
    resultsContainerEl.innerHTML = '';
    if(items.length === 0){
        resultsContainerEl.innerHTML = `<p>No results</p>`;
    }
    items.forEach((item)=>{
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>User ID:</strong> ${item.userId}</p>
            <p><strong>Body:</strong> ${item.body}</p>
        `;
        resultsContainerEl.appendChild(card);
    });
    setupPagination(totalItems);
}

const setupPagination = (totalItems: number): void => {
    paginationButtonsContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => { handlePageButtonClick(button) });
        button.textContent = i.toString();
        if(i === currentPage){
            button.disabled = true;
        }
        paginationButtonsContainer.appendChild(button); 
    }
}

const handlePageButtonClick = (button: HTMLButtonElement): void => {
    currentPage = Number(button.textContent);
    fetchData();
}