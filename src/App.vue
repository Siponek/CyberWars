<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style>
    .color-discreet-orange {
        background-color: #ffa791;
    }
    .color-mother-nature {
        background-color: #b4e2c2;
    }
    .color-black {
        background-color: #3a3a3a;
    }
    .color-silver-bullet {
        background-color: #c5c5c5;
    }
    .color-gardenia {
        background-color: #c5c5c5;
    }
    .color-bungalow {
        background-color: #b48038;
    }
    .color-brown {
        background-color: #7c5741;
    }
    .color-orange {
        background-color: #ed4c00;
    }
</style>