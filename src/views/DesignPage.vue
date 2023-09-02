<template>
  <div id="app">
    <ng-form-design ref="formDesign" disabled="true" />
    <ng-form-build ref="formBuild" disabled=true />
  </div>
</template>
<script>
import NgFormElementPlus from "ng-form-elementplus";
import "ng-form-elementplus/lib/style.css";
import ConvertJsonToTable from "../components/json-to-table";
import html2canvas from "html2canvas";
import store from "@/store";
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
      showPreview: false,
      selectBox: "",
      widthForChange: 800,
      pageWidth: 320,
      pageHeight: 0,
      isSelfOptionShow: false,
      inputHeightBox: "",
      inputWidthBox: "",
      mutipleIcon: "",
      commitButton: "",
    };
  },
  methods: {
    saveJson() {
      var projectId = this.$route.params.projectid;
      var designId = this.$route.params.designid;
      var JSONChar = this.$refs.formDesign.getModel();
      console.log(JSONChar);
      var passObj = {
        content: JSON.stringify(JSONChar),
        graph_id: designId,
        project_id: projectId,
      };
    },
    getPicture() {
      var ele = document.querySelector(".el-dialog__body");
      if (ele) {
        var that = this;
        html2canvas(ele)
          .then(function (canvas) {
            const imgUrl = canvas.toDataURL("image/jpeg", 1.0);
            const link = document.createElement("a");
            console.log(imgUrl)
            link.href = imgUrl;
            var str = that.selectBox.value;
            link.download = "exported_image." + str; // Set the download filename
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
      this.$refs.formDesign.getModel();
    },
    test2() {
      this.$refs.formDesign.initModel();
    },
    hideButton() {
      this.inputHeightBox.style.display = "none";
      this.inputWidthBox.style.display = "none";
      this.mutipleIcon.style.display = "none";
      this.commitButton.style.display = "none";
    },
    createSelectBox() {
      var selectElement = document.createElement("select");
      var option1 = document.createElement("option");
      option1.value = "jpg";
      option1.text = "jpg";
      var option2 = document.createElement("option");
      option2.value = "png";
      option2.text = "png";
      selectElement.appendChild(option1);
      selectElement.appendChild(option2);
      selectElement.classList.add("custom-select");
      return selectElement;
    },
    createSelecChangetBox() {
      var selectElement = document.createElement("select");
      var option1 = document.createElement("option");
      option1.value = "page";
      option1.text = "网页 1440×1204";
      var option2 = document.createElement("option");
      option2.value = "ipad";
      option2.text = "ipad mini 1024×768";
      var option3 = document.createElement("option");
      option3.value = "phone";
      option3.text = "iPhone 13 Pro Max 428×926";
      var option4 = document.createElement("option");
      option4.value = "self";
      option4.text = "自定义";
      selectElement.appendChild(option1);
      selectElement.appendChild(option2);
      selectElement.appendChild(option3);
      selectElement.appendChild(option4);
      selectElement.classList.add("Change-select");
      var that = this;
      selectElement.addEventListener("change", () => {
        var eleAsidRight = document.querySelector(
          "#app > section > main > section > aside.el-aside.properties-panel"
        );
        var eleAsidLeft = document.querySelector(
          "#app > section > main > section > aside.el-aside.item-panel"
        );
        if (selectElement.value == "page") {
          eleAsidRight.style = "width : 320px";
          eleAsidLeft.style = "width : 320px";
          that.pageWidth = 320;
          that.hideButton();
        } else if (selectElement.value == "ipad") {
          eleAsidRight.style = "width : 220px";
          eleAsidLeft.style = "width : 220px";
          that.pageWidth = 220;
          that.hideButton();
        } else if (selectElement.value == "phone") {
          eleAsidRight.style = "width : 480px";
          eleAsidLeft.style = "width : 480px";
          that.pageWidth = 480;
          that.hideButton();
        } else if (selectElement.value == "self") {
          this.inputHeightBox.style.display = "flex";
          this.inputWidthBox.style.display = "flex";
          this.mutipleIcon.style.display = "flex";
          this.commitButton.style.display = "flex";
        }
      });
      return selectElement;
    },
    createInputHeight() {
      var selectElement = document.createElement("input");
      selectElement.classList.add("inputHeight");
      return selectElement;
    },
    createInputWidth() {
      var selectElement = document.createElement("input");
      selectElement.classList.add("inputWidth");
      return selectElement;
    },
    init() {
      var elementToDelete = document.querySelector(
        "#app > section > header > div > div > div:nth-child(1)"
      );
      if (elementToDelete) {
        // 删除元素
        elementToDelete.remove();
      } else {
        console.log("未找到要删除的元素。");
      }
      var buttonSpan = document.querySelector(
        "#app > section > header > div > div > div:nth-child(2) > span"
      );
      var saveButton = document.querySelector(
        "#app > section > header > div > div > div:nth-child(2) > span > button:nth-child(3)"
      );
      var tempButton = saveButton.cloneNode(true); // Perform a deep clone
      tempButton.childNodes[1].textContent = "保存";
      buttonSpan.appendChild(tempButton);
      console.log(saveButton);
      tempButton.addEventListener("click", () => {
        this.saveJson();
      });
      var changeWitdhSpan = document.querySelector(
        "#app > section > header > div > div > div:nth-child(1)"
      );
      changeWitdhSpan.style = "height : 40px;";
      var changWidBox = this.createSelecChangetBox();
      changeWitdhSpan.appendChild(changWidBox);
      this.inputHeightBox = this.createInputHeight();
      this.inputWidthBox = this.createInputWidth();
      this.mutipleIcon = document.createElement("span");
      this.commitButton = document.createElement("button");
      this.commitButton.classList.add("commitButton");
      this.mutipleIcon.classList.add("mutipleIcon");
      this.mutipleIcon.textContent = "×";
      this.commitButton.textContent = "确定";
      var that = this;
      this.commitButton.addEventListener("click", () => {
        var eleAsidRight = document.querySelector(
          "#app > section > main > section > aside.el-aside.properties-panel"
        );
        var eleAsidLeft = document.querySelector(
          "#app > section > main > section > aside.el-aside.item-panel"
        );
        that.pageWidth = 0.77 * that.inputWidthBox.value;
        eleAsidRight.style.width = that.pageWidth + "px";
        eleAsidLeft.style.width = that.pageWidth + "px";
      });
      changeWitdhSpan.appendChild(this.inputHeightBox);
      changeWitdhSpan.appendChild(this.inputWidthBox);
      changeWitdhSpan.appendChild(this.mutipleIcon);
      changeWitdhSpan.appendChild(this.commitButton);
      var eleThingContainer = document.querySelector(
        ".el-main.center-panel.form-main"
      );
      console.log(eleThingContainer.style.width);
      var ele1 = document.querySelector(
        "#app > section > header > div > div > div:nth-child(2) > span > button:nth-child(2)"
      );
      
      ele1.addEventListener("click", () => {
        this.showPreview = true;
        var ele;
        ele = document.querySelector(
          "body > div:nth-child(4) > div > div > header > button"
        );
        ele.addEventListener("click", () => {
          this.showPreview = false;
        });
        var dialog = document.querySelector("body > div:nth-child(4) > div");
        var temp = document.querySelector("body > div:nth-child(4) > div > div")
        temp.style.width = (1440 - that.pageWidth * 2) + "px";
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
        this.selectBox = this.createSelectBox();
        var header = document.querySelector(
          "body > div:nth-child(4) > div > div > footer > span"
        );
        header.appendChild(newElButton);
        header.appendChild(this.selectBox);
        console.log(header);
      });
    },
  },
  mounted() {
    if(store.state.isLogin == false)
    this.$router.push("/")
    this.init();
  },
};
</script>
<style>
.commitButton {
  cursor: pointer;
  position: absolute;
  display: none;
  top: 9px;
  left: 1370px;
  height: 24px;
  width: 50px;
  background-color: #409eff;
  color: white;
  border-radius: 5px;
  border: 0;
  box-shadow: 2px 2px 5px #409eff;
}
.mutipleIcon {
  position: absolute;
  display: none;
  border: 0;
  left: 1280px;
  top: 13px;
}
.inputHeight {
  position: absolute;
  display: none;
  height: 20px;
  width: 40px;
  left: 1220px;
  top: 10px;
  border-radius: 5px;
  box-shadow: 4px 4px 10px #b1b3b8;
  border: 0;
}
.inputWidth {
  position: absolute;
  display: none;
  height: 20px;
  width: 40px;
  left: 1300px;
  top: 10px;
  border-radius: 5px;
  box-shadow: 4px 4px 10px #b1b3b8;
  border: 0;
}
.custom-select {
  margin-left: 10px;
  height: 24px;
  background-color: #409eff;
  color: white;
  border: 0;
  border-radius: 3px;
}
.Change-select {
  margin-left: 10px;
  height: 24px;
  background-color: #409eff;
  color: white;
  border-color: #409eff;
  border-radius: 3px;
  margin-left: 1000px;
  margin-top: 8px;
  box-shadow: 2px 2px 5px #409eff;
}
</style>
