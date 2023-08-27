<template>
  <div id="app">
    <ng-form-design ref="formDesign" renderPreview="false" />
    <ng-form-build ref="formBuild" />
    <button @click="test1">test1</button>
    <button @click="test2">test2</button>
  </div>
</template>
<script>
import NgFormElementPlus from "ng-form-elementplus";
import "ng-form-elementplus/lib/style.css";
import ConvertJsonToTable from "../components/json-to-table";
import {toHtml, toHtmlText} from "from-json-to-html"
export default {
  components: {
    // 注册插件提供的组件，如果需要的话
    NgFormElementPlus,
    ConvertJsonToTable,
  },
  data() {
    return {
      models: {},
      formTemplate: {},
      temp: "",
    };
  },
  methods: {
    test1() {
      this.temp = this.$refs.formDesign.getModel();
      var generatedHtmltext = toHtmlText(JSON.stringify(this.temp.list))
      // var table = ConvertJsonToTable(JSON.stringify(this.temp), 'jsonTable', null, 'Download')
      console.log(generatedHtmltext);
    },
    test2() {
      this.$refs.formDesign.initModel(this.temp);
    },
  },
};
</script>
