import router from "./index";
import { useUserStore } from "@/store/auth";
router.beforeEach((to) => {
    const userStore = useUserStore()
    const isLogin = userStore.token
    if (!isLogin) {
        //未登入
        if (to.path !== '/login') {
            return {path:'/login'}
        }
    } else {
        //登入
        if (to.path === '/login') {
            return {path:'/'}
        }
    }
})