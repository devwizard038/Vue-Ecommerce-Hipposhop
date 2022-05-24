
import { createWebHistory, createRouter } from 'vue-router';

import HomePage from "./views/HomePage";
import AdminPage from "./views/AdminPage";


const routes = [
    {
        path:'/',
        name:'home',
        component:HomePage
    },
    {
        path:'/admin',
        name:'Admin',
        component:AdminPage
    }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
export default router;