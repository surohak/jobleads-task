<script setup lang="ts">
  import IconLogo from "@/components/icons/IconLogo.vue";

  const openGoPremium = () => {
    window.open("https://www.jobleads.com/discover-premium", "_self");
  };

  const openJobLeads = () => {
    window.open("https://www.jobleads.com");
  };
</script>

<template>
  <header class="header-container">
    <IconLogo @click="openJobLeads" />
    <v-btn class="go-premium-btn" @click="openGoPremium">Go Premium</v-btn>
  </header>
</template>

<style scoped lang="scss">
  @use "@/styles/mixins";

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    width: 100%;
    padding: 0 40px;
    svg {
      cursor: pointer;
    }
    @include mixins.tablet {
      padding: 0 10px;
    }
  }
  .go-premium-btn {
    color: white;
    background-color: #c2a05b;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 400;
    text-transform: none;
    height: 44px !important;
    padding: 0 24px;
    box-shadow: none;
    &:hover,
    &:active,
    &:focus {
      box-shadow: none;
    }
  }
</style>
