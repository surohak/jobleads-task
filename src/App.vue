<script setup lang="ts">
  import "@/styles/index.scss";
  import Header from "./sections/Header.vue";
  import Footer from "@/sections/Footer.vue";
  import Users from "@/sections/Users.vue";
</script>

<template>
  <div class="app">
    <div class="app-container">
      <Header />
      <Users />
      <Footer />
    </div>
  </div>
</template>
