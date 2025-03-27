import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        roles: [],
        username: '',
        menu:[]
    }),
    actions: {
        
    }
})