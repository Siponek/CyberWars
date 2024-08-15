import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

const ENDPOINTS = {
    BASE: 'https://swapi.dev/api',
};
ENDPOINTS.FILMS = `${ENDPOINTS.BASE}/films`;



  export const useMoviesStore = defineStore('movies', () => {
    const movies = ref([]);
    const searchTerm = ref('');
  
    const fetchMovies = async () => {
      try {
        const response = await axios.get(ENDPOINTS.FILMS);
        movies.value =[...response.data.results.map(movie => ({
          ...movie,
          showCharacters: false,
          charactersData: null,
        }))];
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };
  
    const filteredMovies = computed(() => {
      if (!searchTerm.value) return movies.value;
      return movies.value.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });
  
    const toggleCharacters = async (movie) => {
      if (movie.charactersData) {
        movie.showCharacters = !movie.showCharacters;
      } else {
        movie.showCharacters = true;
        try {
          const characterPromises = movie.characters.map(url => axios.get(url));
          const characterResponses = await Promise.all(characterPromises);
          movie.charactersData = characterResponses.map(res => res.data);
        } catch (error) {
          console.error('Failed to fetch characters:', error);
        }
      }
    };
    const toggleStarships = async (movie) => {
        if (movie.starshipsData) {
            movie.showStarships = !movie.showStarships;
          } else {
            movie.showStarships = true;
            const starshipPromises = movie.starships.map(url => axios.get(url));
            const starshipResponses = await Promise.all(starshipPromises);
            movie.starshipsData = starshipResponses.map(res => res.data);
          }
    }
  
    const setSearchTerm = (term) => {
      searchTerm.value = term;
    };
    const resetSearchTerm = () => {
        searchTerm.value = '';
        };
  
    return {
      movies,
      searchTerm,
      filteredMovies,
      fetchMovies,
      toggleCharacters,
      setSearchTerm,
      resetSearchTerm,
    toggleStarships
    };
  });