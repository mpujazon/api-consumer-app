const API_URL: string = 'https://jsonplaceholder.typicode.com/posts';
let currentPage: number = 1;
const itemsPerPage: number = 10;

const httpClientSelectorEl = document.getElementById('http-client') as HTMLSelectElement;
const searchInputEl = document.getElementById('search-input') as HTMLInputElement;
const form = document.getElementById('http-client-form') as HTMLFormElement;
const loadingElement = document.getElementById('loading-icon') as HTMLImageElement;

const responseStatusContainerEl = document.getElementById('response-status-container') as HTMLDivElement;
const dynamicDataContainerEl = document.getElementById('dynamic-data-container') as HTMLDivElement;

form.addEventListener('submit', (e: Event)=> {
    e.preventDefault();
});

const showLoading = (): void => {
    loadingElement.classList.remove('hidden');
}

const hideLoading = (): void => {
    loadingElement.classList.add('hidden');
}