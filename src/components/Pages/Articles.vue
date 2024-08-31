<script setup>
import Search from "@/components/elements/search.vue";
import {ref} from "vue";
import Client from "@/app/api/index.js";
import {stripHtmlTags} from "@/app/functions/index.js";
import {useRoute} from "vue-router";
const route = useRoute()
const search = route.params.search;
const category = route.params.category;
const image_url = import.meta.env.VITE_IMAGE_URL;
const paginate = ref(null);
const articles = ref(null);
const page = ref(1);
async function fetchArticles(incrementPage = false) {
  if (incrementPage) {
    page.value++;
  }
  const response = await (new Client()).getArticlesPaginate(page.value, search, category);
  if (!paginate.value) {
    articles.value = response.data;
  } else {
    articles.value = [...articles.value, ...response.data];
  }
  paginate.value = response;
}

fetchArticles();

</script>

<template>
  <main>
    <section class="py-20 bg-white w-full flex items-center justify-center">
      <div class="flex flex-col gap-10 items-center">

        <div class="flex flex-col gap-5">
          <h1 class="max-w-[850px] gradient-text text-center font-bold text-3xl lg:text-7xl">
            {{ search ? `Результаты поиска по запросу: ${search}` : category ? `Статьи по категории: ${articles[0].category.name}` : 'Статьи' }}
          </h1>
          <Search/>
        </div>

      </div>
    </section>

    <section class="bg-card ">
      <div class="py-20 max-w-[980px] max-md:px-5 m-auto gap-24 w-full flex flex-col items-center justify-center">
        <div class="flex w-full flex-col gap-8">

          <div class="flex flex-col gap-5">

                <RouterLink v-if="articles.length > 0" :to="`/article/${article.id}`" v-for="article in articles" class="item-blog">
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
                <div v-else class="flex flex-col  gap-3 items-center justify-center">
                  <lottie-player src="/lib/animation.json" background="transparent"  speed="1"  style="width: 300px; height: 300px; margin: auto;" loop  autoplay></lottie-player>

                  <h2 class="text-xl md:text-4xl">Мы ничего не нашли</h2>

                </div>
          </div>
          <div  v-if="paginate?.current_page !== paginate?.last_page" class="flex justify-center items-center">
            <button @click="fetchArticles" class="btn">Показать еще</button>
          </div>
        </div>

      </div>

    </section>
  </main>
</template>

<style scoped>

</style>