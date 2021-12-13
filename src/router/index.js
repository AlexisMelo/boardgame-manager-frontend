import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home'
import Game from "@/views/Game";
import GameCreate from "@/views/GameCreate";

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
    },
    {
        path: '/game/create/:room_id',
        name: 'GameCreate',
        component: GameCreate
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
