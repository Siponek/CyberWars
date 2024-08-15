<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useMoviesStore } from '@/stores/swapiStore';

const store = useMoviesStore();

const searchTerm = ref('');
const filteredMovies = computed(() => store.filteredMovies);

onMounted(() => {
  store.fetchMovies();
});

const updateSearchTerm = () => {
  if (searchTerm.value === '') {
    store.resetSearchTerm();
    return;
  }
  // TODO Handle debouncing
  if (searchTerm.value.length < 3) return;
  console.log('searchTerm.value', searchTerm.value);
  store.setSearchTerm(searchTerm.value);
};
const toggleStarships = async (movie) => {

  store.toggleStarships(movie);
};

watch(searchTerm.value,()=> updateSearchTerm());

const toggleCharacters = (movie) => {
  store.toggleCharacters(movie);
};
</script>

<template>
  <v-app>
    <v-container>
      <h1 class="text-center">Shalom Movies Catalog</h1>

      <v-form>
        <v-text-field
            v-model="searchTerm"
            label="Search by movie title (min 3 chars)"
            solo
            prepend-inner-icon="mdi-magnify"
            class="my-4"
        ></v-text-field>
    </v-form>
          
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="movie in filteredMovies" :key="movie.episode_id">
          <v-card
          class="card mt-1 mb-1"
          elevation="8"
          outlined
          shaped
          >
            <v-card-title>{{ movie.title }}</v-card-title>

            <v-card-subtitle>
              <strong>Release Date:</strong> {{ movie.release_date }}
            </v-card-subtitle>

            <v-card-subtitle>
              <strong>Director:</strong> {{ movie.director }}
            </v-card-subtitle>

            <v-card-subtitle>
              <strong>Producer:</strong> {{ movie.producer }}
            </v-card-subtitle>

            <v-card-text>{{ movie.opening_crawl }}</v-card-text>
            
            <!-- ? CHARS BTN -->
             <v-row>

               <v-col cols="6">
                 <v-btn @click="toggleCharacters(movie)" class="mt-2" color="primary" block>
                   {{ movie.showCharacters ? 'Hide Characters' : 'Show Characters' }}
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn @click="toggleStarships(movie)" class="mt-2" color="secondary" block>
                    {{ movie.showStarships ? 'Hide Starships' : 'Show Starships' }}
                  </v-btn>
                </v-col>
              </v-row>
            <!-- ? CHARS EXPAND -->
            <v-expand-transition>
              <div v-if="movie.showCharacters">
                <div v-if="!movie.charactersData" class="mt-2 mx-4">Loading characters...</div>
                <div v-else class="character-list">
                  <v-list >
                    <v-list-item v-for="character in movie.charactersData" :key="character.url">
                      {{ character.name }} - Height: {{ character.height }}, Mass: {{ character.mass }}
                    </v-list-item>
                  </v-list>
                </div>
              </div>
              <div v-if="movie.showStarships">
                <div v-if="!movie.starshipsData" class="mt-2 mx-4">Loading starships...</div>
                <v-list v-else>
                  <v-list-item v-for="starship in movie.starshipsData" :key="starship.url">
                    {{ starship.name }} - Model: {{ starship.model }}
                  </v-list-item>
                </v-list>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>



<style scoped>
.text-center {
  text-align: center;
}

:root {
  --border: rgb(3, 169, 244);
  
  --g1: rgb(98, 0, 234);
  --g2: rgb(236, 64, 122);
  --g3: rgb(253, 216, 53);
}

v-app {
  background-color: rgb(10, 10, 10);
  display: grid;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  place-items: center;
}
.character-list {
  max-height: 150px; 
  overflow-y: auto;
  padding-right: 10px;
}
.card {
  /* aspect-ratio: 1 / 1.6; */
  border: 0.5vmin solid var(--border);
  cursor: pointer;
  position: relative;
  width: 56vmin;
}

/* I couldn't finish animations hovering */
.card:hover:before {
  background-position: 100% 100%;
  transform: scale(1.08, 1.03);
}

.card:hover > .card-content {
  background-position: -10% 0%;
}

.card:hover > .card-icon {
  color: white; 
}

.card:hover > .card-content > .card-subtitle > .card-subtitle-word {  
  opacity: 1;
  transform: translateY(0%);
  transition: opacity 0ms, transform 200ms cubic-bezier(.90, .06, .15, .90);
}

.card:before {
  background: linear-gradient(
    130deg, 
    transparent 0% 33%, 
    var(--g1) 66%, 
    var(--g2) 83.5%, 
    var(--g3) 100%
  );
  background-position: 0% 0%;
  background-size: 300% 300%;
  content: "";
  height: 100%;
  left: 0px;
  pointer-events: none;
  position: absolute;
  top: 0px;
  transition: background-position 350ms ease, transform 350ms ease;
  width: 100%;
  z-index: 1;
}

.card-content {
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.2) 8%, 
    transparent 8%
  );
  background-position: 0% 0%;
  background-size: 5vmin 5vmin;
  height: calc(100% - 10vmin);
  padding: 5vmin;
  position: relative;
  transition: background-position 350ms ease;
  width: calc(100% - 10vmin);
  z-index: 2;
}

.card-title,
.card-subtitle {
  color: white;
  font-family: "Anek Latin", sans-serif;
  font-weight: 400;
  margin: 0px;
}

.card-title {
  font-size: 6vmin;
}

.card-subtitle {
  font-size: 3vmin;
  margin-top: 2vmin;
}

.card-subtitle-word {
  display: inline-block;
  margin: 0vmin 0.3vmin;
  opacity: 0;
  position: relative;  
  transform: translateY(40%);
  transition: none;
}

.card-icon {
  bottom: 0px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 7vmin;
  left: 0px;
  margin: 5vmin;
  position: absolute;
  transition: color 250ms ease;
  z-index: 2;
}
</style>

