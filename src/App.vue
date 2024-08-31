<script setup>

import Header from "@/components/layouts/header.vue";
</script>

<template>
<Header/>

  <router-view v-slot="{ Component }">
    <transition  name="fade">
      <component :is="Component" />
    </transition>
  </router-view>


</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
