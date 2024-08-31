<script setup>
import { ref } from "vue";

const search = ref('');
function handleKeydown(event) {
  if (event.key === 'Enter') {
    searchRedirect();
  }
}
function searchRedirect() {
  if (search.value !== '') {
    window.location.href = `/articles/search/`+search.value;
  }
}
</script>

<template>
  <div :class="{'pr-2': search !== '', 'px-5': search === ''}" class="bg-gray-200 pl-5 w-fit m-auto py-2  rounded-full flex gap-2 items-center">
      <svg v-if="search === ''" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M13.4159 12.2324L17 15.8165L15.8165 17L12.2324 13.4159C10.9437 14.4469 9.30938 15.0637 7.53186 15.0637C3.37427 15.0637 0 11.6895 0 7.53186C0 3.37427 3.37427 0 7.53186 0C11.6895 0 15.0637 3.37427 15.0637 7.53186C15.0637 9.30938 14.4469 10.9437 13.4159 12.2324ZM11.7369 11.6115C12.7602 10.5568 13.39 9.11824 13.39 7.53186C13.39 4.29525 10.7685 1.67375 7.53186 1.67375C4.29525 1.67375 1.67375 4.29525 1.67375 7.53186C1.67375 10.7685 4.29525 13.39 7.53186 13.39C9.11824 13.39 10.5568 12.7602 11.6115 11.7369L11.7369 11.6115Z" fill="black"/>
      </svg>
    <input v-model="search" type="text" @keydown="handleKeydown" placeholder="Введи свой запрос">
    <transition name="bounce">
      <div @click="searchRedirect" v-if="search !== ''" class="rounded-full hover:scale-105 p-1.5 cursor-pointer active:scale-95 transition-all bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 17 17" fill="none">
          <path d="M13.4159 12.2324L17 15.8165L15.8165 17L12.2324 13.4159C10.9437 14.4469 9.30938 15.0637 7.53186 15.0637C3.37427 15.0637 0 11.6895 0 7.53186C0 3.37427 3.37427 0 7.53186 0C11.6895 0 15.0637 3.37427 15.0637 7.53186C15.0637 9.30938 14.4469 10.9437 13.4159 12.2324ZM11.7369 11.6115C12.7602 10.5568 13.39 9.11824 13.39 7.53186C13.39 4.29525 10.7685 1.67375 7.53186 1.67375C4.29525 1.67375 1.67375 4.29525 1.67375 7.53186C1.67375 10.7685 4.29525 13.39 7.53186 13.39C9.11824 13.39 10.5568 12.7602 11.6115 11.7369L11.7369 11.6115Z" fill="black"/>
        </svg>
      </div>

    </transition>
    </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  display: none;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.25);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>