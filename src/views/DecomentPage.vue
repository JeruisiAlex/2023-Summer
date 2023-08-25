<template>
  <div id="vditor" name="description" ></div>
</template>
<script>
  import Vditor from "vditor"
  import "vditor/dist/index.css"
export default {
  data(){
      return{
          contentEditor:""
      }
  },
  mounted(){
      this.contentEditor = new Vditor("vditor",{
          height:600,
          toolbarConfig:{
              pin:true
          },
          cache:{
              enable:false
          },
          after:()=>{
              this.contentEditor.setValue("hello,Vditor+Vue!")
          }
      })
  },
  methods:{
  }
}
</script>