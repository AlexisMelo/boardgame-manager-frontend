import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home'
import Game from "@/views/Game";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/game/:room_id',
        name: 'Game',
        component: Game
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
