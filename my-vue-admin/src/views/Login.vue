<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src="logo" alt="" width="70px" height="70px">
                <h1 class="ml">动力港能源管理平台</h1>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="formRef" @keyup.enter="handleLogin">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="User"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="Lock" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
            
            <!-- 测试账号信息 -->
            <div class="test-accounts">
                <el-divider content-position="center">
                    <span style="color: #909399; font-size: 12px;">测试账号</span>
                </el-divider>
                <div class="account-info">
                    <el-tag type="success" size="small" class="account-tag">
                        管理员：admin / admin666
                    </el-tag>
                    <el-tag type="info" size="small" class="account-tag">
                        用户：user / user666
                    </el-tag>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import logo from "@/assets/logo.png"
import { reactive,ref } from 'vue'
import type { FormRules, FormInstance } from "element-plus"
import { useUserStore } from "@/store/auth"
import { useRouter } from "vue-router"
//定义表单接口
interface RuleForm{
    username: string,
    password:string
}
const ruleForm = reactive({
    username: '',
    password:''
})
//表单验证规则
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: "请输入用户名", trigger: 'blur' },
        {min:3,max:8,message:"用户名长度为3-8位数字字母组合",trigger:'blur'}
    ],
    password: [
        { required: true, message: "密码不能为空", trigger: 'blur' }
    ]
    
})
const formRef = ref<FormInstance>()
const userStore = useUserStore()
const router=useRouter()
const handleLogin = () => {
    formRef.value?.validate(async(valid:boolean) => { //?. 可选链操作符
        if (valid) {
            //校验通过
            await userStore.login(ruleForm)
            router.push("/")
        }
    })
}
</script>
<style lang="less" scoped>
.bg{
    background-image: url("../assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    .login{
        width: 500px;
        height: 400px;
        padding: 50px;
        box-shadow: 0 0 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -250px;
        left: 10%;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 40px;
            h1{
                color: rgb(14, 53, 148);
            }
        }
        .test-accounts{
            margin-top: 20px;
            .account-info{
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
                .account-tag{
                    cursor: pointer;
                    transition: all 0.3s;
                    &:hover{
                        transform: scale(1.05);
                    }
                }
            }
        }
    }

}
</style>