<template>
    <div style="height: 30px;">
        <el-row style=" color: black;">
            <el-col :span="14" style="font-size: large; font-weight: bold; text-overflow: ellipsis;-o-text-overflow: ellipsis; white-space: nowrap; max-width: 100%; display: block;">{{ fileName }}</el-col>
            <el-col :span="10" style="text-align: right;" >
              <el-button type="warning" @click="atDocument()" size="small">
                @邀请
              </el-button>
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
    <div id="vditor" name="description" style="z-index: 999;"></div>
    <!-- <el-button @click="setEditArea()">(测试用)改变富文本编辑器内容</el-button>
    <el-button @click="getEditArea()">(测试用)提取富文本编辑器内容</el-button>
    <el-button @click="exportDocument1()">(测试用)使失效</el-button>
    <el-button @click="exportDocument2()">(测试用)使生效</el-button>
    <span>{{ editorContent }}</span> -->
    <!-- <div>{{ cursorPosition }}</div> -->
</template>
<script>
  import Vditor from "vditor"
  import "vditor/dist/index.css"
  import { getAText, saveText} from '../api/text.js';
  import store from "@/store";
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
    atDocument() {
      var newObj = {
        type: "at_jump",
        at_type: "document",
        sender_id: store.state.uid,
        receiver_id: 4,
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
