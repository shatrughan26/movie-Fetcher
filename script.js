import { env } from "./env.js";

const API_KEY = env.OMDB_API_KEY;
const BASE_URL = env.BASE_URL;


function displayMovies(movies){
    const movieGrid = document.getElementById('movie-grid');

    movieGrid.innerHTML = '';

    movies.forEach(movie => {

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster+Found';

        movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `;

        movieGrid.appendChild(movieCard);
    });
}


async function getMovies(title) {
    try {
        const response = await fetch(`${BASE_URL}?s=${title}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        }
        else {
            console.log("Error from API:", data.Error);
        }
        
    } catch (error){
        console.error("Connection Error:", error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        if(query) getMovies(query)
    });
})
