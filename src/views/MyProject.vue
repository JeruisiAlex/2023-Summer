<template>
  <el-container class="first-container">
    <el-aside width="16%" class="left-aside">
      <el-scrollbar height="800px" max-height="640px">
        <el-text class="scrollbar-title">项目列表</el-text>
        <el-button type="primary" @click="" ><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建项目</el-button>
        <el-button type="primary" @click="" ><el-icon style="margin-right: 4px;"><Switch /></el-icon>切换团队</el-button>
        <el-button type="primary" v-for="item in this.currentGroup.projectCount" :key="item" :plain="item-1!=this.currentGroup.current" @click="this.SwitchProject(this.currentGroup.projectList[item-1].id)" class="scrollbar-item">{{ this.currentGroup.projectList[item-1].name }}</el-button>
      </el-scrollbar>
    </el-aside>
    <el-container class="second-container">
      <el-header height="20%" class="header-content">
        <el-container>
          <el-header height="20%" style="display: flex;justify-content: center;align-items: center;">
            <el-text class="group-title">{{ this.currentProject.name }}</el-text>
            <el-button type="primary" v-if="this.currentProject.id!=0" @click="this.OpenDialog(2)" style="height: 50px;"><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑项目信息</el-button>
          </el-header>
          <el-main>
            <el-text class="group-introduction">项目简介:{{ this.currentProject.introduction }}</el-text>
          </el-main>
        </el-container>
      </el-header>
      <el-container class="third-container">
        <el-aside v-if="this.listType" width="100%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="project-title">设计原型列表</el-text>
              <el-button v-if="this.currentProject.id!=0" type="primary" @click="this.OpenDialog(3)" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建页面</el-button>
              <el-button v-if="this.currentProject.id!=0" type="primary" @click="this.ChangeListType()" style="height: 40px;"><el-icon style="margin-right: 4px;"><Switch /></el-icon>设计原型列表</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in this.currentProject.graphCount" :key="item" class="project-list">
                <el-text class="project-name">{{ this.currentProject.graphList[item-1].name }}</el-text>
                <el-text class="creator-name">{{ this.currentProject.graphList[item-1].creator.username+' ' }}创建</el-text>
                <el-button @click="this.DeleteGraph(this.currentProject.graphList[item-1].graph_id)"><el-icon style="margin-right: 4px;"><Delete /></el-icon>删除页面</el-button>
                <el-button @click="this.Jump('/'+this.currentGroup.id+'/'+this.currentProject.id+'/'+this.currentProject.graphList[item-1].graph_id+'/DesignPage')"><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑页面</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
        <el-aside v-else width="100%" class="bottom-aside">
          <el-container class="forth-container">
            <el-header style="display: flex;justify-content: center;align-items: center;">
              <el-text class="project-title">文档列表</el-text>
              <el-button v-if="this.currentProject.id!=0" type="primary" @click="this.OpenDialog(4)" style="height: 40px;"><el-icon style="margin-right: 4px;"><Plus /></el-icon>新建文档</el-button>
              <el-button v-if="this.currentProject.id!=0" type="primary" @click="this.ChangeListType()" style="height: 40px;"><el-icon style="margin-right: 4px;"><Switch /></el-icon>共享文档列表</el-button>
            </el-header>
            <el-scrollbar>
              <div v-for="item in this.currentProject.textCount" :key="item" class="project-list">
                <el-text class="project-name">{{ this.currentProject.textList[item-1].name }}</el-text>
                <el-text class="creator-name">{{ this.currentProject.textList[item-1].creator.username+' ' }}创建</el-text>
                <el-button @click="this.DeleteText(this.currentProject.textList[item-1].text_id)"><el-icon style="margin-right: 4px;"><Delete /></el-icon>删除文档</el-button>
                <el-button @click="this.Jump('/'+this.currentGroup.id+'/'+this.currentProject.id+'/'+this.currentProject.textList[item-1].text_id+'/DocumentPage')"><el-icon style="margin-right: 4px;"><Edit /></el-icon>编辑文档</el-button>
              </div>
            </el-scrollbar>
          </el-container>
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
  <el-dialog v-model="this.updateProject.isOpen" title="编辑项目信息" width="500px">
    <el-form ref="updateProjectRef" :model="updateProject" :rules="updateProjectRules" label-width="70px">
        <el-form-item prop="name" label="项目名称" class="dialog-form-item">
          <el-input type="text" v-model="updateProject.name" placeholder="请输入项目名称" maxlength="20" class="dialog-input" />
        </el-form-item>
        <el-form-item prop="introduction" label="项目简介" class="dialog-form-item">
          <el-input type="textarea" v-model="updateProject.introduction" placeholder="请输入项目介绍" maxlength="200" show-word-limit="true" :autosize="{ minRows: 2, maxRows: 6 }" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="this.UpdateProject()" style="width: 100px;">保存编辑</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.createGraph.isOpen" title="创建页面原型" width="500px">
    <el-form ref="createGraphRef" :model="createGraph" :rules="createGraphRules" label-width="70px">
        <el-form-item prop="name" label="页面名称" class="dialog-form-item">
          <el-input type="text" v-model="createGraph.name" placeholder="请输入页面名称" maxlength="20" class="dialog-input" />
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="this.CreateGraph()" style="width: 100px;">创建页面原型</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="this.createText.isOpen" title="创建在线文档" width="500px">
    <el-form ref="createTextRef" :model="createText" :rules="createTextRules" label-width="85px">
        <el-form-item prop="name" label="文档名称" class="dialog-form-item">
          <el-input type="text" v-model="createText.name" placeholder="请输入文档名称" maxlength="20" class="dialog-input" style="width:385px"/>
        </el-form-item>
        <el-form-item prop="floder" label="所属文件夹" class="dialog-form-item">
          <el-select v-model="this.createText.floder" placeholder="空">

          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="this.CreateText()" style="width: 100px;">创建在线文档</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
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
  width: 38%;
  margin-left: 20px;
  display: flex;
  text-align: center;
  font-size:medium;
  font-weight: 500;
  color: black;
}
.creator-name{
  width: 38%;
  margin-left: 20px;
  display: flex;
  text-align: center;
  font-size:medium;
  font-weight: 500;
  color: black;
}
</style>

<script >
import store from '@/store';
import { ElMessage } from 'element-plus';
import { getUserGroup, checkUserInGroup } from '../api/user.js';
import { getGroupInformation } from '../api/group.js';
import { getProjectInformation, updateProject } from '../api/project.js';
import { createGraph, deleteGraph } from '../api/graph.js';
import { createText, deleteText } from '../api/text.js';

export default{
  data(){
    return{
      listType: true,
      uid: store.state.uid,
      group:{
        current: 0,
        list: [],
        count: 0,
      },
      currentGroup:{
        id: '',
        current: 0,
        projectList: '',
        projectCount: 0,
      },
      currentProject:{
        id: 0,
        name: '您还没有任何项目',
        introduction: '快去创建一个项目吧',
        graphCount: 0,
        textCount: 0,
        flodercount: 0,
        graphList: [],
        textList: [],
        floderList: [],
      },
      switchGroup:{
        isOpen: false,
      },
      createProject:{
        isOpen: false,
        name: '',
        introduction: '',
      },
      updateProject:{
        isOpen: false,
        name: '',
        introduction: '',
      },
      createGraph:{
        isOpen: false,
        name: '',
      },
      createText:{
        isOpen: false,
        name: '',
        floder: '',
      },
      updateProjectRules:{
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
              callback("请输入项目简介");
            }
            callback()
          }, type: 'string', trigger: 'blur'}],
      },
      createGraphRules:{
        name:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入页面名称");
            }
            callback()
          }, type: 'string', trigger: 'blur'}],
      },
      createTextRules:{
        name:[{
          validator: (rule, value, callback) => {
            if(value === ''){
              callback("请输入文档名称");
            }
            callback()
          }, type: 'string', trigger: 'blur'}],
      }
    }
  },
  methods:{
    ChangeListType(){
      this.listType=!this.listType;
    },
    SwitchGroup(){

    },
    SwitchProject(projectid){
      var promise=checkUserInGroup(this.uid,this.currentGroup.id);
      promise.then((result) => {
        if(result.code==0){
          this.Load(true, this.currentGroup.id, projectid);
        }
        else{
          this.Load(true, this.currentGroup.id, projectid);
        }
      })
    },
    CreateProject(){

    },
    UpdateProject(){
      this.$refs.updateProjectRef.validate((valid) => {
        if(valid){
          var promise1=checkUserInGroup(this.uid,this.currentGroup.id);
          promise1.then((value) => {
            if(value.code==0){
              var promise2=updateProject(this.currentProject.id, this.updateProject.name, this.updateProject.introduction);
              promise2.then((result) => {
                if(this.MessageCatch(result, true)){
                  this.Load(false, this.currentGroup.id, this.currentProject.id);
                }
              })
            }
            else{
              this.Load(true, this.currentGroup.id, this.currentProject.id);
            }
            this.updateProject.isOpen=false;
          })
        }
      })
    },
    CreateGraph(){
      this.$refs.createGraphRef.validate((valid) => {
        if(valid){
          var promise1=checkUserInGroup(this.uid,this.currentGroup.id);
          promise1.then((value) => {
            if(value.code==0){
              var promise2=createGraph(this.createGraph.name, this.currentProject.id, '', '');
              promise2.then((result) => {
                if(this.MessageCatch(result, true)){
                  this.Load(false, this.currentGroup.id, this.currentProject.id);
                }
              })
            }
            else{
              this.Load(true, this.currentGroup.id, this.currentProject.id);
            }
            this.createGraph.isOpen=false;
          })
        }
      })
    },
    DeleteGraph(graphid){
      var promise1=checkUserInGroup(this.uid,this.currentGroup.id);
      promise1.then((value) => {
        if(value.code==0){
          console.log(graphid);
          var promise2=deleteGraph(graphid, this.currentProject.id);
          promise2.then((result) => {
            if(this.MessageCatch(result, true)){
              this.Load(false, this.currentGroup.id, this.currentProject.id);
            }
          })
        }
        else{
          this.Load(true, this.currentGroup.id, this.currentProject.id);
        }
      })
    },
    CreateText(){
      this.$refs.createTextRef.validate((valid) => {
        if(valid){
          var promise1=checkUserInGroup(this.uid,this.currentGroup.id);
          promise1.then((value) => {
            if(value.code==0){
              var promise2=createText(this.createText.name, this.currentProject.id, '/'+this.createText.floder);
              promise2.then((result) => {
                if(this.MessageCatch(result, true)){
                  this.Load(false, this.currentGroup.id, this.currentProject.id);
                }
              })
            }
            else{
              this.Load(true, this.currentGroup.id, this.currentProject.id);
            }
          })
          this.createText.isOpen=false;
        }
      })
    },
    DeleteText(textid){
      var promise1=checkUserInGroup(this.uid,this.currentGroup.id);
      promise1.then((value) => {
        if(value.code==0){
          console.log(textid);
          var promise2=deleteText(textid);
          promise2.then((result) => {
            if(this.MessageCatch(result, true)){
              this.Load(false, this.currentGroup.id, this.currentProject.id);
            }
          })
        }
        else{
          this.Load(true, this.currentGroup.id, this.currentProject.id);
        }
      })
    },
    OpenDialog(opcode){
      if(opcode==0){
        this.switchGroup.isOpen=true;
      }
      else if(opcode==1){
        this.createProject.name='';
        this.createProject.introduction='';
        this.createProject.isOpen=true;
      }
      else if(opcode==2){
        this.updateProject.name=this.currentProject.name;
        this.updateProject.introduction=this.currentProject.introduction;
        this.updateProject.isOpen=true;
      }
      else if(opcode==3){
        this.createGraph.name='';
        this.createGraph.isOpen=true;
      }
      else{
        this.createText.name='';
        this.createText.floder='';
        this.createText.isOpen=true;
      }
    },
    Jump(url){
      console.log(url);
      this.$router.push(url);
    },
    Load(changeGroup,groupid,projectid){
      if(changeGroup==true){
        this.LoadGroup(groupid,projectid);
      }
      else{
        this.LoadProject(groupid,projectid);
      }
    },
    LoadGroup(groupid,projectid){
      var promise11=getUserGroup();
      promise11.then((result) =>{
        if(this.MessageCatch(result,false)){
          this.group.list=result.data;
          this.group.count=this.group.list.length;
          for(var i=0;i<this.group.count;i++){
            if(this.group.list[i].id==groupid){
              this.currentGroup.id=groupid;
              this.group.current=i;
              break;
            }
            if(this.group.count-i==1){
              if(groupid>0){
                ElMessage({
                  message: '您不在该团队中，已重新加载您所在团队',
                  grouping: true,
                  type: 'warning',
                })
              }
              this.currentGroup.id=this.group.list[0].id;
              this.group.current=0;
            }
          }
          if(this.group.count>0){
            this.LoadProject(this.currentGroup.id,projectid);
          }
          else{
            this.currentGroup.id=0;
            this.currentGroup.projectList=[];
            this.currentGroup.projectCount=0;
            this.currentProject.id=0;
            this.currentProject.graphList=[];
            this.currentProject.graphCount=0;
            this.currentProject.textList=[];
            this.currentProject.textCount=0;
            this.currentProject.name="您还没有任何项目";
            this.currentProject.introduction="快去创建一个项目吧";
            this.Jump('/'+this.uid+'/'+this.currentGroup.id+'/MyProject/'+this.currentProject.id);
          }
        }
      })
    },
    LoadProject(groupid,projectid){
      var promise1=getGroupInformation(groupid);
      promise1.then((result) => {
        if(this.MessageCatch(result,false)){
          this.currentGroup.projectList=result.data.project_list;
          this.currentGroup.projectCount=this.currentGroup.projectList.length;
          for(var i=0;i<this.currentGroup.projectCount;i++){
            if(this.currentGroup.projectList[i].project_id==projectid){
              this.currentProject.id=projectid;
              this.currentGroup.current=i;
              break;
            }
            if(this.currentGroup.projectCount-i==1){
              if(projectid>0){
                ElMessage({
                  message: '该项目不存在，已重新加载存在项目',
                  grouping: true,
                  type: 'warning',
                })
              }
              this.currentProject.id=this.currentGroup.projectList[0].project_id;
              this.currentGroup.current=0;
            }
          }
          if(this.currentGroup.projectCount>0){
            var promise2=getProjectInformation(this.currentProject.id);
            promise2.then((value) => {
              if(this.MessageCatch(value,false)){
                console.log(value);
                this.currentProject.name=value.data.name;
                this.currentProject.introduction=value.data.introduction;
                this.currentProject.graphCount=0;
                this.currentProject.textCount=0;
                this.currentProject.graphList=value.data.graph_list;
                this.currentProject.textList=value.data.text_list;
                this.currentProject.graphCount=this.currentProject.graphList.length;
                this.currentProject.textCount=this.currentProject.textList.length;
              }
            })
          }
          else{
            this.currentProject.id=0;
            this.currentProject.graphList=[];
            this.currentProject.graphCount=0;
            this.currentProject.textList=[];
            this.currentProject.textCount=0;
            this.currentProject.name="您还没有任何项目";
            this.currentProject.introduction="快去创建一个项目吧";
          }
          this.Jump('/'+this.uid+'/'+this.currentGroup.id+'/MyProject/'+this.currentProject.id);
        }
      })
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
    var groupid=this.$route.params.groupid;
    var projectid=this.$route.params.projectid;
    if(store.state.isLogin==false){
      this.$router.push('/');
    }
    else if(store.state.uid!=this.uid){
      this.$router.push('/'+store.state.uid+'/MyProject');
      this.uid=store.state.uid;
    }
    else{
      this.Load(true,groupid,projectid);
    }
  }
}
</script>
  