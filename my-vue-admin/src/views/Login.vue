<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src="logo" alt="" width="70px" height="70px">
                <h1 class="ml">动力港能源管理平台</h1>
            </div>
            <el-form >
                <el-form-item>
                    <el-input placeholder="请输入用户名" prefix-icon="User"/>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入密码" prefix-icon="Lock"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import logo from "@/assets/logo.png"
import { User } from "@element-plus/icons-vue";
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
        height: 300px;
        padding: 50px;
        box-shadow: 0 0 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -200px;
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
    }

}
</style>