<template>
  <div id="app">
    <!-- <div
      style="
      position: absolute;
        top: 0px;
        width: 300px;
        background-color: white;
        height: 40px;
        z-index: 2;
      "
    ></div> -->
    <ng-form-design ref="formDesign" />
    <ng-form-build ref="formBuild" />
    <button @click="test1">test1</button>
    <button @click="test2">test2</button>
  </div>
</template>
<script>
import NgFormElementPlus from "ng-form-elementplus";
import "ng-form-elementplus/lib/style.css";
import ConvertJsonToTable from "../components/json-to-table";
import { ElButton } from "element-plus";
import html2canvas from "html2canvas";
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
      showPreview: false,
    };
  },
  methods: {
    getPicture() {
      var ele = document.querySelector(".el-dialog__body");
      if (ele) {
        html2canvas(ele)
          .then(function (canvas) {
            const imgUrl = canvas.toDataURL("image/jpeg", 1.0);
            const link = document.createElement("a");
            link.href = imgUrl;
            link.download = "exported_image.jpg"; // Set the download filename
            link.click();
          })
          .catch(function (error) {
            console.error("html2canvas error:", error);
          });
      } else {
        console.error("Element not found");
      }
    },
    test1() {
      this.temp = this.$refs.formDesign.getModel();
    },
    test2() {
      this.$refs.formDesign.initModel(this.temp);
    },
    init() {
      var ele = document.querySelector(
        "#app > section > header > div > div > div:nth-child(3) > span > button:nth-child(2)"
      );
      ele.addEventListener("click", () => {
        this.showPreview = true;

        var ele = document.querySelector(
          "body > div:nth-child(3) > div > div > header > button"
        );

        ele.addEventListener("click", () => {
          this.showPreview = false;
        });
        var dialog = document.querySelector("body > div:nth-child(3) > div");
        dialog.style.zIndex = "9999";

        var newElButton = document.createElement("button");
        newElButton.setAttribute("type", "primary");
        newElButton.setAttribute("class", "previewButton");
        newElButton.textContent = "导出图片";
        newElButton.addEventListener("click", this.getPicture);
        newElButton.style =
          "background-color : #409EFF;border : 0;color : white;border-radius : 2px;cursor: pointer;margin-left : 10px;height:24px;font-size:6px";
        newElButton.addEventListener("mouseover", () => {
          newElButton.style.backgroundColor = "#79bbff";
        });
        newElButton.addEventListener("mouseout", () => {
          newElButton.style.backgroundColor = "#409EFF";
        });
        var header = document.querySelector(
          "body > div:nth-child(3) > div > div > footer > span"
        );
        header.appendChild(newElButton);
        console.log(header);
      });
      var elementToDelete = document.querySelector(
        "#app > section > header > div > div > div:nth-child(1)"
      );
      console.log(elementToDelete);
      if (elementToDelete) {
        // 删除元素
        elementToDelete.remove();
      } else {
        console.log("未找到要删除的元素。");
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style></style>
