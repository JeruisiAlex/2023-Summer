<template>
  <el-container class="user-container" style="">
    <el-aside width="60%" calss="information-container">
      <el-text style="text">昵称</el-text>
    </el-aside>
    <el-aside width="40%" class="avatar-container">
      1
    </el-aside>
  </el-container>

</template>

<style>
.user-container{
  width:800px;
  height: 500px;
  margin-left: 23%;
  margin-right: 23%;
  margin-top: 5%;
  margin-bottom: 5%;
}
.information-container{
  display: flex;
  justify-content: center;
  background-color: beige;
}
.avatar-container{
  display: flex;
  justify-content: center;
  background-color: aqua;
}

</style>