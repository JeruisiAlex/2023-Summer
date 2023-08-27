<template>
  <el-container class="first-container">
    <el-aside width="16%" class="left-aside">
      <el-scrollbar height="800px" max-height="640px">
        <el-text class="scrollbar-title">团队列表</el-text>
        <el-button type="primary"  @click="this.OpenDialog(0)" ><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建团队</el-button>
        <el-button type="primary" @click="this.SwithcGroup(item-1)" v-for="item in this.group.length" :key="item" :plain="item-1!=this.group.current" class="scrollbar-item">{{ this.group.list[item-1].name }}</el-button>
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
                <el-text class="group-title">{{ this.currentGroup.name }}</el-text>
                <el-button v-if="this.currentGroup.id!=0" type="primary" @click="this.OpenDialog(1)" style="height: 50px;"><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑团队信息</el-button>
                <el-button v-if="this.currentGroup.id!=0" type="primary" @click="this.DeleteGroup(this.currentGroup.id)" style="height: 50px;"><el-icon style="margin-right: 4px;"><Edit /><Close /></el-icon>删除团队</el-button>
              </el-header>
              <el-main>
                <el-text class="group-introduction">团队简介:{{ this.currentGroup.introduction }}</el-text>
              </el-main>
            </el-container>
          </el-aside>
        </el-container>
      </el-header>
      <el-container class="third-container">
        <el-aside width="37%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="project-title">项目列表</el-text>
              <el-button v-if="this.currentGroup.id!=0" type="primary" @click="this.OpenDialog(2)" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建项目</el-button>
              <el-button v-if="this.currentGroup.id!=0" type="primary" @click="" style="height: 40px;"><el-icon style="margin-right: 4px;"><DeleteFilled /></el-icon>回收站</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in this.currentGroup.projectCount" :key="item" class="project-list">
                <el-text class="project-name">{{ this.currentGroup.projectList[item-1].name }}</el-text>
                <el-text class="creator-name">{{ this.currentGroup.projectList[item-1].creator_name }}创建</el-text>
                <el-button @click="this.Jump('/'+this.$store.state.uid+'/MyProject/'+this.currentGroup.projectList[item-1].id)"><el-icon style="margin-right: 4px;"><Pointer /></el-icon>查看项目</el-button>
                <el-button @click="this.DeleteProject(this.currentGroup.projectList[item-1].id)"><el-icon style="margin-right: 4px;"><Delete /></el-icon>删除项目</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
        <el-aside width="61%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="groupmember-title">成员列表</el-text>
              <el-button v-if="this.currentGroup.id!=0" type="primary" @click="this.OpenDialog(3)" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>邀请新成员</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in this.currentGroup.personCount" :key="item"  class="groupmember-list">
                <el-avatar :size="40" :src="this.currentGroup.personList[item-1].icon_address" fit="fill"/>
                <el-text class="groupmember-name">{{ this.currentGroup.personList[item-1].username }}</el-text>
                <el-text class="groupmember-name">{{ this.currentGroup.personList[item-1].true_name }}</el-text>
                <el-text class="groupmember-email">{{ this.currentGroup.personList[item-1].email }}</el-text>
                <el-button @click="this.Jump('/'+this.currentGroup.personList[item-1].id+'/PersonalInfomation')"><el-icon style="margin-right: 4px;"><Pointer /></el-icon>查看成员</el-button>
                <el-button @click=""><el-icon style="margin-right: 4px;"><Avatar /></el-icon>{{ this.currentGroup.authList[item-1] }}</el-button>
                <el-button @click=""><el-icon style="margin-right: 4px;"><CircleClose /></el-icon>移除成员</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
  <el-dialog v-model="this.createGroup.isOpen" title="创建团队" width="500px">
    <el-form ref="createGroupRef" :model="createGroup" :rules="createGroupRules" label-width="70px">
        <el-form-item prop="name" label="团队名称" class="dialog-form-item">
          <el-input type="text" v-model="createGroup.name" placeholder="请输入团队名称" maxlength="30" class="dialog-input" />
        </el-form-item>
        <el-form-item prop="introduction" label="团队简介" class="dialog-form-item">
          <el-input type="textarea" v-model="createGroup.introduction" placeholder="请输入团队介绍" maxlength="200" show-word-limit="true" :autosize="{ minRows: 2, maxRows: 6 }" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="this.CreateGroup()" style="width: 100px;">创建团队</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.updateGroup.isOpen" title="修改团队信息" width="500px">
    <el-form ref="updateGroupRef" :model="updateGroup" :rules="updateGroupRules" label-width="70px">
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
          <el-button type="primary" @click="this.UpdateGroup()" style="width: 100px;">上传修改内容</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.createProject.isOpen" title="创建项目" width="500px">
    <el-form ref="createProjectRef" :model="createProject" :rules="createProjectRules" label-width="70px">
        <el-form-item prop="name" label="项目名称" class="dialog-form-item">
          <el-input type="text" v-model="createProject.name" placeholder="请输入项目名称" maxlength="30" class="dialog-input" />
        </el-form-item>
        <el-form-item prop="introduction" label="项目简介" class="dialog-form-item">
          <el-input type="textarea" v-model="createProject.introduction" placeholder="请输入项目介绍" maxlength="200" show-word-limit="true" :autosize="{ minRows: 2, maxRows: 6 }" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="this.CreateProject()" style="width: 100px;">创建项目</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.addNewMember.isOpen" title="邀请新成员" width="500px">
    <el-form ref="addNewMemberRef" :model="addNewMember" :rules="addNewMemberRules" label-width="70px">
        <el-form-item prop="email" label="邮箱" class="dialog-form-item">
          <el-input type="text" v-model="addNewMember.email" placeholder="请输入用户邮箱" maxlength="30" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="this.AddNewMember()" style="width: 100px;">发送邀请</el-button>
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
  width: 12%;
  margin-left: 20px;
  display: flex;
  text-align: center;
  font-size:1ch;
  font-weight: 500;
  color: black;
}
.groupmember-email{
  width: 20%;
  margin-left: 20px;
  display: flex;
  text-align: center;
  font-size:1ch;
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
  width: 20%;
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
import { getUserGroup } from '../api/user.js';
import { createGroup, deleteGroup, changeAuth, inviteMember, getGroupInformation} from '../api/group.js';
import { createProject, deleteProject } from '../api/project.js';

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
        list: [],
        length: 0,
        current: 0,
      },
      currentGroup:{
        id: '',
        avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
        name: '您还没有任何团队',
        introduction: '快去创建或加入一个团队吧',
        personCount: 0,
        personList: [],
        authList: [],
        projectCount: 0,
        projectList: [],
      },
      createGroupRules:{
        name:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入团队名称");
            }
            callback();
          }, type: 'string', trigger: 'blur'}],
        introduction:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入团队介绍");
            }
            callback();
          }, type: 'string', trigger: 'blur'}],
      },
      updateGroupRules:{
        name:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入团队名称");
            }
            callback()
          }, type: 'string', trigger: 'blur'}],
        introduction:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入团队介绍");
            }
            callback();
          }, type: 'string', trigger: 'blur'}],
        avatar:[{
          validator: (rule, value, callback) => {
            var cover=value.substring(value.lastIndexOf('.'));
            if(cover=='.png'||cover=='.jpg'||cover=='.jpeg'||cover=='.bmp'||cover==''){
                callback();
            }
            else{
                callback(new Error('该文件类型不支持'));
            }
          }, type: 'string', trigger: 'blur'}],
      },
      createProjectRules:{
        name:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入项目名称");
            }
            callback()
          }, type: 'string', trigger: 'blur'}],
        introduction:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入项目介绍");
            }
            callback()
          }, type: 'string', trigger: 'blur'}],
      },
      addNewMemberRules:{
        email:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入用户邮箱");
            }
            callback()
          }, type: 'string', trigger: 'blur'}],
      },
    }
  },
  methods:{
    CreateGroup(){
      this.$refs.createGroupRef.validate((valid) => {
        if(valid){
          var promise1=createGroup(this.createGroup.name,this.createGroup.introduction);
          promise1.then((result)=>{
            if(this.MessageCatch(result)){
              var promise2=getUserGroup();
              promise2.then((result) => {
                if(result.code==0){
                  store.commit('updateGroupList',result.data);
                  this.group.list=result.data;
                  this.group.length=result.data.length;
                  if(this.currentGroup.id==0){
                    this.group.current=0;
                    this.GetCurrenGroup(this.group.list[0].id);
                  }
                  else{
                    for(var i=0;i<this.group.length;i++){
                      if(this.group.list[i].id==this.currentGroup.id){
                        this.group.current=i;
                        break;
                      }
                    }
                  }
                }
              })
            }
          })
        }
      })
    },
    UpdateGroup(){
      this.$refs.updateGroupRef.validate((valid) => {
        if(valid){
          // var promise=up
        }
      })
    },
    CreateProject(){
      this.$refs.createProjectRef.validate((valid) => {
        if(valid){
          var promise=createProject(this.createProject.name,this.currentGroup.id,this.createProject.introduction);
          promise.then((result)=>{
            if(this.MessageCatch(result)){
              this.GetCurrenGroup(this.currentGroup.id);
            }
          });
        }
      })
    },
    AddNewMember(){
      this.$refs.addNewMemberRef.validate((valid) => {
        if(valid){
          var promise=inviteMember(this.currentGroup.id,this.addNewMember.email);
          promise.then((result) => {
            this.MessageCatch(result);
          })
        }
      })
    },
    DeleteGroup(groupid){
      var promise1=deleteGroup(groupid);
      promise1.then((result) => {
        if(this.MessageCatch(result)){
          var promise2=getUserGroup();
          promise2.then((result) => {
            if(result.code==0){
              store.commit('updateGroupList',result.data);
              this.group.list=result.data;
              this.group.length=result.data.length;
              console.log(this.group.length);
              if(this.group.length==0){
                this.currentGroup.id=0;
                this.currentGroup.avatar='https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png';
                this.currentGroup.name='您还没有任何团队';
                this.currentGroup.introduction='快去创建或加入一个团队吧';
                this.currentGroup.personCount=0;
                this.currentGroup.projectCount=0
                this.currentGroup.personList=[];
                this.currentGroup.projectList=[];
                this.currentGroup.authList=[];
              }
              else{
                this.group.current=0;
                this.GetCurrenGroup(this.group.list[0].id);
              }
            }
          })
        }
      })
    },
    DeleteProject(projectid){
      var promise=deleteProject(projectid);
      promise.then((result) => {
        if(this.MessageCatch(result)){
          this.GetCurrenGroup(this.currentGroup.id);
        }
      })
    },
    GetCurrenGroup(groupId){
      var promise=getGroupInformation(groupId);
      promise.then((result)=>{
        this.currentGroup.id=groupId;
        this.currentGroup.name=result.data.name;
        this.currentGroup.introduction=result.data.introduction;
        this.currentGroup.avatar=result.data.icon_address;
        this.currentGroup.personList=result.data.user_list;
        this.currentGroup.personCount=this.currentGroup.personList.length;
        this.currentGroup.projectList=result.data.project_list;
        this.currentGroup.projectCount=this.currentGroup.projectList.length;
        for(var i=0;i<this.currentGroup.personCount;i++){
          if(this.currentGroup.personList[i].position==='creator'){
            this.currentGroup.authList.push('创建者')
          }
          else if(this.currentGroup.personList[i].position==='admin'){
            this.currentGroup.authList.push('管理员')
          }
          else{
            this.currentGroup.authList.push('成员')
          }
        }
      })
    },
    ChangeAuth(userid,opcode){
      var ownPosition;
      var userPosition;
      if(userid==store.state.uid){
        ElMessage({
          message: "不能对自己进行操作",
          grouping: true,
          type: 'error',
        })
      }
      else{
        for(var i=0;i<this.currentGroup.personCount;i++){
          if(this.currentGroup.personList[i].id==store.state.uid){
            ownPosition=this.currentGroup.personList[i].position;
          }
          if(this.currentGroup){

          }
        }
      }
    },
    SwithcGroup(index){
      this.group.current=index;
      this.GetCurrenGroup(this.group.list[index].id);
      this.$router.push('/'+store.state.uid+'/GroupPage/'+this.group.list[index].id);
    },
    Jump(url){
      this.$router.push(url);
    },
    OpenDialog(index){
      if(index==0){
        this.createGroup.isOpen=true;
      }
      else if(index==1){
        this.updateGroup.name=this.currentGroup.name;
        this.updateGroup.introduction=this.currentGroup.introduction;
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
    this.currentGroup.id=this.$route.params.groupid;
    if(store.state.isLogin==false){
      this.$router.push('/');
    }
    else if(store.state.uid!=this.uid){
      this.$router.push('/'+store.state.uid+'/GroupPage/'+this.currentGroup.id);
      this.uid=store.state.uid;
    }
    this.group.list=store.state.userGroupList;
    this.group.length=store.state.userGroupList.length;
    for(var i=0;i<this.group.length;i++){
      if(this.group.list[i].id==this.currentGroup.id){
        this,this.group.current=i;
        break;
      }
      if(i==this.group.length-1){
        if(this.group.length!=0) this.currentGroup.id=this.group.list[0].id;
        else this.currentGroup.id=0;
      }
    }
    if(this.group.length!=0){
      this.GetCurrenGroup(this.currentGroup.id);
    }
    else{
      this.currentGroup.id=0;
    }
  }
}
</script>
