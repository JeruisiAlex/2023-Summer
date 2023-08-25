<template>
  <el-container class="first-container">
    <el-aside width="15%" class="left-aside">
      <el-scrollbar height="800px" max-height="640px">
        <el-text class="scrollbar-title">我的团队列表</el-text>
        <el-button type="primary" style="width: 75px;" @click="" ><el-icon><Plus /></el-icon></el-button>
        <el-button type="primary" v-for="item in 20" :key="item" :plain="group.textBoolList[item]" class="scrollbar-item">{{ item }}</el-button>
      </el-scrollbar>
    </el-aside>
    <el-container class="second-container">
      <el-header height="20%" calss="header-content">
        <el-container>
          <el-aside width="10%">
            1
          </el-aside>
          <el-aside width="80%">
            <el-container>
              <el-header height="50%">
                1
              </el-header>
              <el-main>
                1
              </el-main>
            </el-container>
          </el-aside>
        </el-container>
      </el-header>
      <el-container class="third-container">
        <el-aside width="50%" class="bottom-aside">
          <el-container calss="forth-container">
            <el-header>

            </el-header>
            <el-main>

            </el-main>
          </el-container>
        </el-aside>
        <el-aside width="50%" class="bottom-aside">
          <el-container calss="forth-container">
            <el-header>

            </el-header>
            <el-main>
              
            </el-main>
          </el-container>
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
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
  height: 100%;
}
.header-content{
  background-color: black;
}
.scrollbar-title {
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  font-size:2ch;
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
</style>

<script>
import store from '@/store';
import { ElMessage } from 'element-plus';

export default{
  data(){
    return{
      uid: store.state.uid,
      group:{
        nameList: [],
        idList: [],
        textBoolList: [],
      },
      currentGroup:{
        avator: '',
        name: '',
        introduction: '',
        personList: [],
        projectList: [],
      }
    }
  },
  methods:{

    MessageCatch(data){
      if(data.code!=0){
        ElMessage({
          message: data.msg,
          grouping: true,
          type: 'error',
        })
        return false;
      }
      else{
        ElMessage({
          message: data.msg,
          grouping: true,
          type: 'success',
        })
        return true;
      }
    }
  },
  mounted(){
    this.uid=this.$route.params.uid;
    if(store.state.isLogin==false){
      this.$router.push('/');
    }
    else if(store.state.uid!=this.uid){
      this.$router.push('/'+store.state.uid+'/GroupPage');
      this.uid=store.state.uid;
    }
    for(var i=1;i<=21;i++){
      this.group.textBoolList.push(true);
    }
    this.group.textBoolList[2]=false;
  }
}
</script>
