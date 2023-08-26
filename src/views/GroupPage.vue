<template>
  <el-container class="first-container">
    <el-aside width="16%" class="left-aside">
      <el-scrollbar height="800px" max-height="640px">
        <el-text class="scrollbar-title">团队列表</el-text>
        <el-button type="primary"  @click="this.openDialog(0)" ><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建团队</el-button>
        <el-button type="primary" @click="" v-for="item in 20" :key="item" :plain="group.textBoolList[item]" class="scrollbar-item">{{ item }}</el-button>
      </el-scrollbar>
    </el-aside>
    <el-container class="second-container">
      <el-header height="20%" class="header-content">
        <el-container>
          <el-aside width="10%">
            <el-avatar :size="110" fit="fill" :src="this.currentGroup.avatar"/>
          </el-aside>
          <el-aside width="80%">
            <el-container>
              <el-header height="50%" style="display: flex;justify-content: center;align-items: center;">
                <el-text class="group-title">{{ currentGroup.name }}</el-text>
                <el-button type="primary" @click="this.openDialog(1)" style="height: 50px;"><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑团队信息</el-button>
              </el-header>
              <el-main>
                <el-text class="group-introduction">团队简介:{{ currentGroup.introduction }}</el-text>
              </el-main>
            </el-container>
          </el-aside>
        </el-container>
      </el-header>
      <el-container class="third-container">
        <el-aside width="48%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="project-title">项目列表</el-text>
              <el-button type="primary" @click="this.openDialog(2)" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建项目</el-button>
              <el-button type="primary" @click="" style="height: 40px;"><el-icon style="margin-right: 4px;"><DeleteFilled /></el-icon>回收站</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in 20" :key="item" class="project-list">
                <el-text class="project-name">姓名{{  }}</el-text>
                <el-text class="creator-name">姓名{{ " " }}创建</el-text>
                <el-button @click="this.jump()"><el-icon style="margin-right: 4px;"><Pointer /></el-icon>查看项目</el-button>
                <el-button @click=""><el-icon style="margin-right: 4px;"><Delete /></el-icon>删除项目</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
        <el-aside width="48%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="groupmember-title">成员列表</el-text>
              <el-button type="primary" @click="this.openDialog(3)" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>邀请新成员</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in 20" :key="item"  class="groupmember-list">
                <el-avatar :size="40" :src="this.currentGroup.avator"/>
                <el-text class="groupmember-name">姓名{{  }}</el-text>
                <el-button @click="this.jump()"><el-icon style="margin-right: 4px;"><Pointer /></el-icon>查看成员</el-button>
                <el-button @click=""><el-icon style="margin-right: 4px;"><Avatar /></el-icon>{{"当前权限"}}</el-button>
                <el-button @click=""><el-icon style="margin-right: 4px;"><CircleClose /></el-icon>移除成员</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
  <el-dialog v-model="this.createGroup.isOpen" title="创建团队" width="500px">
    <el-form ref="createGroupRules" :model="createGroup" :rules="createGroupRules" label-width="70px">
        <el-form-item prop="name" label="团队名称" class="dialog-form-item">
          <el-input type="text" v-model="createGroup.name" placeholder="请输入团队名称" maxlength="30" class="dialog-input" />
        </el-form-item>
        <el-form-item prop="introduction" label="团队简介" class="dialog-form-item">
          <el-input type="textarea" v-model="createGroup.introduction" placeholder="请输入团队介绍" maxlength="200" show-word-limit="true" :autosize="{ minRows: 2, maxRows: 6 }" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="" style="width: 100px;">创建团队</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.updateGroup.isOpen" title="修改团队信息" width="500px">
    <el-form ref="createGroupRules" :model="updateGroup" :rules="updateGroupRules" label-width="70px">
        <el-form-item prop="name" label="团队名称" class="dialog-form-item">
          <el-input type="text" v-model="updateGroup.name" placeholder="请输入团队名称" maxlength="30" class="dialog-input" />
        </el-form-item>
        <el-form-item prop="introduction" label="团队简介" class="dialog-form-item">
          <el-input type="textarea" v-model="updateGroup.introduction" placeholder="请输入团队介绍" maxlength="200" show-word-limit="true" :autosize="{ minRows: 2, maxRows: 6 }" class="dialog-input" />
        </el-form-item>
        <el-form-item prop="avatar" label="团队头像" class="dialog-form-item">
          <el-input type="file" v-model="updateGroup.avatar" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="" style="width: 100px;">上传修改内容</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.createProject.isOpen" title="创建项目" width="500px">
    <el-form ref="createGroupRules" :model="createGroup" :rules="createGroupRules" label-width="70px">
        <el-form-item prop="name" label="项目名称" class="dialog-form-item">
          <el-input type="text" v-model="createProject.name" placeholder="请输入项目名称" maxlength="30" class="dialog-input" />
        </el-form-item>
        <el-form-item prop="introduction" label="项目简介" class="dialog-form-item">
          <el-input type="textarea" v-model="createProject.introduction" placeholder="请输入项目介绍" maxlength="200" show-word-limit="true" :autosize="{ minRows: 2, maxRows: 6 }" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="" style="width: 100px;">创建项目</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.addNewMember.isOpen" title="邀请新成员" width="500px">
    <el-form ref="createGroupRules" :model="addNewMember" :rules="addNewMemberRules" label-width="70px">
        <el-form-item prop="name" label="邮箱" class="dialog-form-item">
          <el-input type="text" v-model="addNewMember.email" placeholder="请输入用户邮箱" maxlength="30" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="" style="width: 100px;">发送邀请</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
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

export default{
  data(){
    return{
      uid: store.state.uid,
      createGroup:{
        isOpen: false,
        name: '',
        introduction: '',
      },
      updateGroup:{
        isOpen: false,
        name: '',
        introduction: '',
        avatar: '',
      },
      createProject:{
        isOpen: false,
        name: '',
        introduction: '',
      },
      addNewMember:{
        isOpen: false,
        email: '',
      },
      group:{
        nameList: [],
        idList: [],
        textBoolList: [],
      },
      currentGroup:{
        avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
        name: 'OP',
        introduction: '你好',
        personList: [],
        projectList: [],
      },
      createGroupRules:{
        name:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入团队名称");
            }
          }, type: 'string', trigger: 'blur'}],
        introduction:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入团队介绍");
            }
          }, type: 'string', trigger: 'blur'}],
      },
      updateGroupRules:{

      },
      createProjectRules:{

      },
      addNewMemberRules:{

      },
    }
  },
  methods:{
    jump(url){
      this.$router.push(url);
    },
    openDialog(index){
      if(index==0){
        this.createGroup.isOpen=true;
      }
      else if(index==1){
        this.updateGroup.isOpen=true;
      }
      else if(index==2){
        this.createProject.isOpen=true;
      }
      else{
        this.addNewMember.isOpen=true;
      }
    },
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
    },
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
