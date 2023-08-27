<template>
    <div style="height: 30px;">
        <el-row style=" color: black;">
            <el-col :span="20" style="font-size: large; font-weight: bold;">{{ fileName }}</el-col>
            <el-col :span="4" :offset="0" style="text-align: right; font-size: small;">
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
    <el-button @click="setEditArea()">(测试用)改变富文本编辑器内容</el-button>
    <el-button @click="getEditArea()">(测试用)提取富文本编辑器内容</el-button>
    <span>{{ editorContent }}</span>
</template>
<script>
  import Vditor from "vditor"
  import "vditor/dist/index.css"

export default {
  data(){
      return{
          contentEditor:"",
          value1: false,
          fileName: "Markdown在线编辑(以后这里会显示文件名)",
          editorContent:"",
      }
  },
  mounted(){
      this.contentEditor = new Vditor("vditor",{
          height:600,
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
              this.contentEditor.setValue("hello,Vditor+Vue!"),
              this.contentEditor.setTheme("dark")
          }
      })
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
