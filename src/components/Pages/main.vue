<script setup>

import Search from "@/components/elements/search.vue";
import Client from "@/app/api/index.js"
import {ref} from "vue";
import {stripHtmlTags} from "@/app/functions/index.js";

const image_url = import.meta.env.VITE_IMAGE_URL;
const categories = ref(null);


async function getCategory() {
  categories.value = await (new Client()).getPopularCategories();
}


getCategory();

</script>

<template>
  <main>
    <section class="py-20 bg-white w-full flex items-center justify-center">
      <div class="flex flex-col gap-10 items-center">
        <div class="bg-gray-100 text-sm font-semibold rounded-full py-2.5 px-4 flex items-center justify-center">
          👋 XCODE приветствует
        </div>
        <div class="flex flex-col gap-5">
          <h1 class="gradient-text text-center font-bold text-3xl lg:text-7xl">
            Минималистичный блог для программистов и не только
          </h1>
          <p class="text-base lg:text-2xl font-light text-center max-w-2xl m-auto">Ты найдешь то что тебе нужно</p>
         <Search/>
        </div>

      </div>
    </section>

    <section class="bg-card ">
      <div class="py-20 max-w-[980px] max-md:px-5 m-auto gap-24 w-full flex flex-col items-center justify-center">
        <div v-for="category in categories" class="flex w-full flex-col gap-8">
          <div class="flex items-center justify-between">
            <p class="lg:text-2xl">{{category.name}}</p>
            <RouterLink :to="`/articles/category/${category.id}`" class="btn">Посмотреть все</RouterLink>
          </div>
          <div class="flex flex-col gap-5">
            <RouterLink :to="`/article/${article.id}`" v-for="article in category.articles" class="item-blog">
              <div class="content ">
                <span class="text-sm">{{article.created_at}} </span>
                <div class="flex flex-col gap-2.5">
                  <h2 class="">{{article.title}}</h2>
                  <p>{{stripHtmlTags(article.content)}}</p>
                </div>
              </div>
              <div class="img">
                <img :src="image_url + article.img" alt="">
              </div>
            </RouterLink>

          </div>
        </div>
      </div>

    </section>
  </main>
</template>

<style scoped>

</style>