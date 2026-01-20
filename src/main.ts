import type { JSONPlaceHolderData } from "./types";
import axios, { } from 'axios';

const API_URL: string = 'https://jsonplaceholder.typicode.com/posts';
let currentPage: number = 1;
const itemsPerPage: number = 10;

const httpClientSelectorEl = document.getElementById('http-client') as HTMLSelectElement;
const searchInputEl = document.getElementById('search-input') as HTMLInputElement;
const form = document.getElementById('http-client-form') as HTMLFormElement;
const loadingElement = document.getElementById('loading-icon') as HTMLImageElement;
const errorElement = document.getElementById('error-element') as HTMLParagraphElement;

const responseStatusContainerEl = document.getElementById('response-status-container') as HTMLDivElement;
const dynamicDataContainerEl = document.getElementById('dynamic-data-container') as HTMLDivElement;

form.addEventListener('submit', async (e: Event)=> {
    e.preventDefault();
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

const fetchDataWithFetch = async(searchTerm: string): Promise<void> => {
    if(!searchTerm){
        throw new Error(`There isn't a search term defined in form`);
    }
    const response: Response = await fetch(`${API_URL}/?q=${searchTerm}&_page=${currentPage}&_limit=${itemsPerPage}`);
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data: JSONPlaceHolderData = await response.json();
    const totalItems = response.headers.get('X-Total-Count');
    //displayResults()
}

const fetchDataWithAxios = async(searchTerm: string): Promise<void> => {
    if(!searchTerm){
        throw new Error(`There isn't a search term defined in form`);
    }
    axios.get(API_URL, {
        params:{
            q: searchTerm,
            _page: currentPage,
            _limit: itemsPerPage
        }
    }).then((response) => { 
        const data = response.data;
        const totalItems = response.headers['x-total-count'];
        console.log({data}, {totalItems});
        

        // displayResults();
    }).catch((error) => {
        throw new Error(error)
    });
}