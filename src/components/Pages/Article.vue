<script setup>

import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import Client from "@/app/api/index.js"
import {comment} from "postcss";

const route = useRoute()
const image_url = import.meta.env.VITE_IMAGE_URL;
const article_id = route.params?.id;
const article = ref(null);
const commentRef = ref({
  name: '',
  message: ''
})
const errorRef = ref({
  name: false,
  message: false
});

watch(commentRef, (value) => {
  errorRef.value.name = false;
  errorRef.value.message = false;
}, {deep: true})

async function getArticle(article_id) {
  article.value = await (new Client()).getArticle(article_id);
}

getArticle(article_id)

async function addComment() {
  const {name, message} = commentRef.value;
  const response = await (new Client()).addComment(article_id, {name, message});
  if (response.status === 200) {
    commentRef.value.name = '';
    commentRef.value.message = '';
    await getArticle(article_id);
  } else {
    if (response.data.errors.name.length > 0) {
      errorRef.value.name = true;
    }
    if (response.data.errors.message.length > 0) {
      errorRef.value.message = true;
    }
  }

}
</script>

<template>
  <main>
    <section class="py-20 bg-white w-full flex items-center justify-center">
      <div class="flex flex-col gap-10 items-center">

        <div class="flex flex-col gap-5">
          <h1 class="gradient-text text-center font-bold text-3xl lg:text-7xl">
            {{ article?.title }}
          </h1>
          <p class="text-sm font-light text-center max-w-2xl m-auto">{{ article?.created_at }} • <span
              class="text-gray-800 font-bold">{{ article?.category?.name }}</span></p>
        </div>

      </div>
    </section>
    <section class="flex flex-col gap-20 m-auto">
      <div class="max-w-[1100px] max-md:px-3 m-auto text-wrap">
        <img :src="image_url + article?.img" :alt="article?.title">
      </div>
      <div v-html="article?.content" class="max-w-[680px] max-md:px-5 article-content m-auto">

      </div>
      <section class="flex flex-col py-5 ">
        <div class="max-w-[680px] max-md:px-5 break-words flex flex-col gap-5 w-full m-auto">
          <div class="flex text-sm gap-2  max-md:flex-wrap items-center">
            <div :class="{'error': errorRef.message}"
                 class="flex border-gray-300 bg-card w-full items-center gap-2  rounded-lg py-3 px-5 ">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                <path
                    d="M 15 3 C 7.82 3 2 7.925 2 14 C 2 17.368 3.7933281 20.378484 6.6113281 22.396484 C 6.6832805 23.932468 6.4452784 26.053382 4.3261719 27.03125 A 0.5 0.5 0 0 0 4.3222656 27.033203 A 0.5 0.5 0 0 0 4 27.5 A 0.5 0.5 0 0 0 4.5 28 C 4.5119372 28 4.5232366 27.998109 4.5351562 27.998047 A 0.5 0.5 0 0 0 4.5429688 27.998047 C 6.9769949 27.982445 9.0432734 26.667034 10.46875 25.277344 C 10.92075 24.836344 11.550875 24.619328 12.171875 24.736328 C 13.081875 24.909328 14.028 25 15 25 C 22.18 25 28 20.075 28 14 C 28 7.925 22.18 3 15 3 z">
                </path>
              </svg>
              <input v-model="commentRef.message" type="text" class="flex-1" placeholder="Оставь свой комментарий">
            </div>
            <div :class="{'error': errorRef.name}"
                 class="flex border-gray-300 bg-card w-full items-center gap-2 flex-1 rounded-lg py-3 px-5 ">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <circle cx="12" cy="6" r="4"></circle>
                  <path
                      d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"></path>
                </g>
              </svg>
              <input v-model="commentRef.name" type="text" class="flex-1" placeholder="Введи как тебя зовут">
            </div>
            <button @click="addComment" :disabled="commentRef.name.length === 0 || commentRef.message.length === 0"
                    class="p-3  rounded-md btn cursor-pointer bg-card">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                      d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                      stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
              </svg>
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <div v-if="article?.comments.length > 0" v-for="comment in article?.comments"
                 class="py-3 bg-gray-100 rounded-lg px-3 flex flex-col gap-3">
              <div class="flex  justify-between items-center">
                <p>{{ comment.name }}</p>
                <p class="text-sm text-gray-400">{{ comment.created_at }}</p>
              </div>
              <div class="text-sm ">
                {{ comment.message }}
              </div>
            </div>
            <div v-else class="py-3 bg-gray-100 rounded-lg px-3 flex flex-col gap-3">
              <div class="text-xl text-center ">
                Отзывов пока нет
              </div>
            </div>
          </div>

        </div>
      </section>
    </section>


  </main>
</template>

<style scoped>

</style>