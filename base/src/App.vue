<template>
  <div>
  <el-menu :router="true" mode="horizontal">
      <!--基座中可以放自己的路由-->
      <el-menu-item index="/">主应用首页</el-menu-item> 
      <el-menu-item index="/detail">主应用详情</el-menu-item> 
       <!--引用其他子应用-->
      <el-menu-item index="/vue2">vue2应用</el-menu-item>
      <el-menu-item index="/vue3">vue3应用</el-menu-item>
      <el-menu-item index="/react">react应用</el-menu-item>
  </el-menu>
    <router-view ></router-view>
    <div id="sonApp"></div>
  </div>
</template>
