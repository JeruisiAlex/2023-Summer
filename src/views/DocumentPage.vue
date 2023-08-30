<template>
    <div style="height: 30px;">
        <el-row style=" color: black;">
            <el-col :span="14" style="font-size: large; font-weight: bold; text-overflow: ellipsis;-o-text-overflow: ellipsis; white-space: nowrap; max-width: 100%; display: block;">{{ fileName }}</el-col>
            <el-col :span="10" style="text-align: right;" >
              <el-popover
                :visible="atVisible"
                placement="bottom"
                :title="groupName"
                :width="200"
                content="this is content, this is content, this is content"
              >
                <template #reference>
                  <el-button type="warning" @click="atDocument()" size="small">
                    @邀请
                  </el-button>
                </template>
                <el-scrollbar max-height="500px">
                  <div class="notification-item" 
                    v-for="(item, index) in this.groupMembersList"
                    :key="index" :title="item.username" @click="atDocumentPost(item.id)">
                    {{ item.username }}
                  </div>
                </el-scrollbar>
              </el-popover>
              
              <el-button type="primary" @click="saveDocument()" size="small">
                保存<el-icon class="el-icon--right"><Upload /></el-icon>
              </el-button>
            <!-- </el-col> -->
            <!-- <el-col :span="4" :offset="0" style="text-align: right; font-size: small;"> -->
                Mode: <el-switch
                    v-model="value1"
                    inline-prompt
                    active-text="浅色"
                    inactive-text="暗黑"
                    style="--el-switch-on-color: #2a9feb; --el-switch-off-color: #24292e"
                    @click="changeDisplayMode()"
                />
            </el-col>
        </el-row>
    </div>
    <div id="vditor" name="description" style="z-index: 999;" tabindex="0" @keydown="keyListener"></div>
    <!-- <el-button @click="setEditArea()">(测试用)改变富文本编辑器内容</el-button>
    <el-button @click="getEditArea()">(测试用)提取富文本编辑器内容</el-button>
    <el-button @click="exportDocument1()">(测试用)使失效</el-button>
    <el-button @click="exportDocument2()">(测试用)使生效</el-button>
    <span>{{ editorContent }}</span> -->
    <!-- <div>{{ cursorPosition }}</div> -->
</template>

<style scoped>
.notification-item {
  align-items: center;
  /*justify-content: center;*/
  height: 30px;
  line-height: 30px;
  margin: 5px;
  /*padding-left: 5px;*/
  text-align: center;
  border-radius: 4px;
  color: black;
  transition: 0.5s;
  overflow: hidden;
  border-bottom: rgba(42, 159, 235, 0.5) 1px solid;
}

.notification-item:hover {
  cursor: pointer;
  background: rgba(236, 245, 255, 1);
  /* color: rgb(42, 159, 235); */
  transition: 0.2s;
}
</style>

<script>
  import Vditor from "vditor"
  import "vditor/dist/index.css"
  import { getAText, saveText} from '../api/text.js';
  import store from "@/store";
  import {getGroupInformation} from '../api/group.js';
  let ws;
  let wsd;
export default {
  data(){
      return{
          contentEditor: "",
          value1: false,
          fileName: "文档获取中…",
          editorContent: "",
          creator: 0,
          text_id: 0,
          project_id: 0,
          group_id: 0,
          cursorPosition: {top: 0, left: 0},
          edible: true,
          shareable: true,
          atVisible: false,
          groupMembersList: [],
          groupName: 'Group'
      }
  },
  mounted(){
    var url = this.$route.path;
    var infos = url.split('/');
    this.group_id = parseInt(infos[1]);
    this.project_id = parseInt(infos[2]);
    this.text_id = parseInt(infos[3]);
    this.websocketInit();
    this.contentEditor = new Vditor("vditor",{
        height:600,
        placeholder: "在这里开始编辑",
        toolbarConfig:{
            pin:true
        },
        preview:{
          theme:{
              current: "dark"
          }
        },
        cache:{
            enable: false
        },
        counter:{
          enable: true
        },
        after:()=>{
            this.contentEditor.setValue(""),
            this.contentEditor.setTheme("dark")
        }
    });

    var promise=getAText(parseInt(infos[3]),parseInt(infos[2]));
    console.log(infos);
    promise.then((result)=>{
      console.log(result);
      this.fileName = result.data.name;
      this.contentEditor.setValue(result.data.content);
      this.creator = result.data.creator;
    });

    setInterval(() => {
      this.editorContent = this.contentEditor.getValue();

      // this.cursorPosition = this.contentEditor.getCursorPosition();
    }, 500)
  },
  methods:{
    setEditArea() {
        this.contentEditor.setValue(this.editorContent);
    },
    getEditArea() {
        this.editorContent = this.contentEditor.getValue();
    },
    changeDisplayMode() {
        if (this.value1===true) {
            this.contentEditor.setTheme("light","light","light");
        }
        else {
            this.contentEditor.setTheme("dark","dark","dark");
        }
    },
    exportDocument1() {
        // var test = this.contentEditor.exportJSON(this.editorContent);
        // console.log(test);
        this.contentEditor.disabled();
    },
    exportDocument2() {
        // var test = this.contentEditor.exportJSON(this.editorContent);
        // console.log(test);
        this.contentEditor.enable();
    },
    websocketInit() {
      var that = this;
      // ws1 = new WebSocket("ws://8.130.25.189/ws/text/");
      ws = new WebSocket("ws://8.130.25.189/ws/notification/");
      ws.onopen = function () {
        console.log("文档@用websocket已经打开");
      };
      ws.onmessage = function (message) {
        var parsedData = JSON.parse(message.data);
        console.log(parsedData);
        // var newObj = {
        //   name: parsedData.name,
        //   content: parsedData.content,
        //   time: parsedData.time,
        // };
        // that.nowChosenGroup.contentArray.push(newObj);
      };
      ws.onclose = function () {
        //服务器连接关闭
        console.log("文档@用websocket已关闭");
      };
    },
    keyListener(event) {
      console.log("key_push");
      if (event.shiftKey && event.keyCode === 50) {
        console.log("同时按下 shift 和数字2键");
        this.atDocument();
        // 执行你想做的操作
      }
      else if (event.ctrlKey && event.key === 's'){
        event.preventDefault();
        this.saveDocument();
        console.log("同时按下 control 和 s 键");
      }
      else if (event.keyCode === 27)  {
        event.preventDefault();
        this.atVisible = false;
        console.log("按下 esc 键");
      }
    },
    atDocument() {
      var promise=getGroupInformation(this.group_id);
      promise.then((result)=>{
        this.groupMembersList=result.data.user_list;
        this.groupName=result.data.name;
        console.log(this.groupMembersList);
        this.atVisible = !this.atVisible;
      });
      // this.groupMembersList=[
      //       {
      //           "id": 3,
      //           "username": "TestKirby",
      //           "email": "13616991245@163.com",
      //           "true_name": "Ye Chengxuan",
      //           "icon_address": "2023summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/user/3.jpg",
      //           "position": "creator"
      //       },
      //       {
      //           "id": 4,
      //           "username": "Jeruisi",
      //           "email": "1525772623@qq.com",
      //           "true_name": "Chen Yanzhou",
      //           "icon_address": "2023summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/user/default_icon.jpg",
      //           "position": "admin"
      //       }
      //   ];
      // this.groupName='result.data.name';
      // console.log(this.groupMembersList);
      // this.atVisible = !this.atVisible;
    },
    atDocumentPost(receiver_id) {
      var newObj = {
        type: "at_jump",
        at_type: "document",
        sender_id: store.state.uid,
        receiver_id: receiver_id,
        team_id: this.group_id,
        project_id: this.project_id,
        document_id: this.text_id,
      }
      console.log(newObj);
      console.log("发送前");
      ws.send(JSON.stringify(newObj));
      console.log("发送后");
    },
    saveDocument() {
      var promise=saveText(this.text_id,this.project_id,this.contentEditor.getValue());
      promise.then((result)=>{
        console.log(result);
      }); 
    },
    getGroupMembers() {
      var promise=getGroupInformation(groupId);
      promise.then((result)=>{
        this.groupMembersList=result.data.user_list;
        this.groupName=result.data.name;
        console.log(this.groupMembersList);
      });
    },
    sendMessage() {
      const now = new Date();
      console.log(now)
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // 月份从0开始，所以要加1
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      var newObj = {
        name: "kangjiaqi",
        content: this.messageInput,
        time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        realtime : now
      };
      ws.send(JSON.stringify(newObj));
      this.messageInput = "";
    },
  }
}
</script>

<!-- 下面的是另一个支持协作的富文本编辑器，但是可惜它不支持markdown自动渲染，以后再说 -->
<!-- <template>
    <div ref="editorContainer"></div>
  </template>
  <script>
  import { defineComponent, ref, onMounted } from 'vue'
  import { createEditor } from '@textbus/editor';
  import '@textbus/editor/bundles/textbus.min.css';
  
  export default defineComponent({
    setup() {
      const editorContainer = ref();
      onMounted(() => {
        const editor = createEditor();
        editor.mount(editorContainer.value)
        editor.onChange.subscribe(() => {
          console.log(editor.getHTML());
        });
      })
  
      return {
        editorContainer
      }
    }
  })
  </script> -->
