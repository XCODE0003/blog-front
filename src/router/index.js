import {createWebHistory, createRouter} from 'vue-router';
import Main from "@/components/Pages/main.vue";
import Article from "@/components/Pages/Article.vue";
import Articles from "@/components/Pages/Articles.vue";

const routes = [
    {path: '/', component: Main, name: 'main'},
    {path: '/articles', component: Articles, name: 'articles'},
    {path: '/articles/search/:search', component: Articles, name: 'search'},
    {path: '/articles/category/:category', component: Articles, name: 'category'},
    {path: '/article/:id', component: Article, name: 'article'},





];

const router = createRouter({
    history: createWebHistory(),
    routes,
});




export default router;