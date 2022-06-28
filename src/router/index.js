import {createWebHistory, createRouter} from 'vue-router';
import HomePage from "../views/HomePage";
import AdminPage from "../views/AdminPage";
import store from "../store";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminPage,
        beforeEnter: () => {
            if(!store.getters['user/getAdmin']){
                return {path: '/'};
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;