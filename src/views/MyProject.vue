<template>
  <el-container class="first-container">
    <el-aside width="16%" class="left-aside">
      <el-scrollbar height="800px" max-height="640px">
        <el-text class="scrollbar-title">项目列表</el-text>
        <el-button type="primary" @click="" ><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建项目</el-button>
        <el-button type="primary" @click="" ><el-icon style="margin-right: 4px;"><Switch /></el-icon>切换团队</el-button>
        <el-button type="primary" v-for="item in 20" :key="item" :plain="group.textBoolList[item]" class="scrollbar-item">{{ item }}</el-button>
      </el-scrollbar>
    </el-aside>
    <el-container class="second-container">
      <el-header height="20%" class="header-content">
        <el-container>
          <el-header height="20%" style="display: flex;justify-content: center;align-items: center;">
            <el-text class="group-title">{{ currentGroup.name }}</el-text>
            <el-button type="primary" @click="" style="height: 50px;"><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑项目信息</el-button>
          </el-header>
          <el-main>
            <el-text class="group-introduction">项目简介:{{ currentGroup.introduction }}</el-text>
          </el-main>
        </el-container>
      </el-header>
      <el-container class="third-container">
        <el-aside width="48%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="project-title">设计原型列表</el-text>
              <el-button type="primary" @click="" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建页面</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in 20" :key="item" class="project-list">
                <el-text class="project-name">页面名称{{  }}</el-text>
                <el-text class="creator-name">姓名{{ " " }}创建</el-text>
                <el-button @click=""><el-icon style="margin-right: 4px;"><Delete /></el-icon>删除页面</el-button>
                <el-button @click=""><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑页面</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
        <el-aside width="48%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="project-title">文档列表</el-text>
              <el-button type="primary" @click="" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建文档</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in 20" :key="item" class="project-list">
                <el-text class="project-name">文档名称{{  }}</el-text>
                <el-text class="creator-name">姓名{{ " " }}创建</el-text>
                <el-button @click=""><el-icon style="margin-right: 4px;"><Delete /></el-icon>删除文档</el-button>
                <el-button @click=""><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑文档</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
.dialog-form-item{
width: 500px;
margin-bottom: 30px;
}
.dialog-input{
  width: 400px;
}
.first-container{
  min-width: 1200px;
  height: 630px;
  min-height: 630px;
}
.second-container{
  height: 100%;
}
.third-container{
  height: 80%;
}
.left-aside{
  height: 100%;
}
.bottom-aside{
  margin-top: 20px;
  margin-right: 20px;
  height: 100%;
}
.header-content{
  border-bottom: 1px solid #409EFF;
}
.scrollbar-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  font-size: x-large;
  font-weight: 1000;
  color: black;
}
.scrollbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 40px;
  margin: 8px;
  text-align: center;
}
.group-title{
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin: 10px;
  border-radius: 4px;
  font-size: xx-large;
  font-weight: 1000;
  color: black;
}
.group-introduction{
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  font-size:medium;
  font-weight: 500;
  color: black;
}
.groupmember-title{
  align-items: center;
  width: 90%;
  height: 50px;
  border-radius: 4px;
  font-size:3ch;
  font-weight: 500;
  color: black;
}
.groupmember-list{
  display: flex;
  align-items: center;
  height: 50px;
  margin: 5px;
  border-radius: 4px;
  border-bottom: 1px solid #409EFF;
}
.groupmember-name{
  width: 30%;
  margin-left: 20px;
  display: flex;
  text-align: center;
  font-size:medium;
  font-weight: 500;
  color: black;
}
.project-title{
  align-items: center;
  width: 90%;
  height: 50px;
  border-radius: 4px;
  font-size:3ch;
  font-weight: 500;
  color: black;
}
.project-list{
  display: flex;
  align-items: center;
  height: 50px;
  margin: 5px;
  border-radius: 4px;
  border-bottom: 1px solid #409EFF;
}
.project-name{
  width: 25%;
  margin-left: 20px;
  display: flex;
  text-align: center;
  font-size:medium;
  font-weight: 500;
  color: black;
}
.creator-name{
  width: 30%;
  margin-left: 20px;
  display: flex;
  text-align: center;
  font-size:medium;
  font-weight: 500;
  color: black;
}
</style>

<script>
import store from '@/store';
import { ElMessage } from 'element-plus';
import { getUserGroup, checkUserInGroup } from '../api/user.js';
import { getGroupInformation } from '../api/group.js';
import { getProjectInformation } from '../api/project.js';
import { createGraph, deleteGraph } from '../api/graph.js';
import { createText, deleteText } from '../api/text.js';

export default{
  data(){
    return{
      uid: store.state.uid,
      group:{
        nameList: [],
        idList: [],
        textBoolList: [],
      },
      currentProject:{
        avator: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
        name: 'OP',
        introduction: '你好',
        personList: [],
        projectList: [],
      }
    }
  },
  methods:{

    Load(groupid,projectid){
      if(groupid>=0){
        this.LoadGroup(groupid,projectid);
      }
      else{
        this.LoadProject(projectid);
      }
    },
    LoadGroup(groupid,projectid){

    },
    LoadProject(projectid){

    },
    MessageCatch(data,opcode){
      if(data.code!=0){
        ElMessage({
          message: data.msg,
          grouping: true,
          type: 'error',
        })
        return false;
      }
      if(opcode==true&&data.code==0){
        ElMessage({
          message: data.msg,
          grouping: true,
          type: 'success',
        })
      }
      return true;
    }
  },
  mounted(){
    this.uid=this.$route.params.uid;
    if(store.state.isLogin==false){
      this.$router.push('/');
    }
    else if(store.state.uid!=this.uid){
      this.$router.push('/'+store.state.uid+'/MyProject');
      this.uid=store.state.uid;
    }
    for(var i=1;i<=21;i++){
      this.group.textBoolList.push(true);
    }
    this.group.textBoolList[2]=false;
  }
}
</script>
  