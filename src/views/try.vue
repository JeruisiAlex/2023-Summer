<template>
  <div
    style="background: red; width: 20px"
    @contextmenu.prevent="rightClick($event)"
  >
    点击
  </div>
  <div
    class="clickRightMenu"
    v-if="clickRightMenu == true"
    :style="{ top: topNum + 'px', left: leftNum + 'px' }"
  >
    <el-button
      type="primary"
      plain
      class="messageOptionButton"
      text
      style="margin-left: 0px"
      >Primary</el-button
    >
    <el-button
      type="primary"
      plain
      class="messageOptionButton"
      text
      style="margin-left: 0px"
      >Primary</el-button
    >
    <el-button
      type="primary"
      plain
      class="messageOptionButton"
      text
      style="margin-left: 0px"
      >Primary</el-button
    >
    <el-button
      type="primary"
      plain
      class="messageOptionButton"
      text
      style="margin-left: 0px"
      >Primary</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickRightMenu: false,
      topNum: 0,
      leftNum: 0,
    };
  },
  methods: {
    rightClick(e) {
      this.clickRightMenu = true;
      this.topNumber = e.pageY;
      this.leftNumber = e.pageX;
    },
  },
};
</script>
<style>
.messageOptionButton {
  position: relative;
  display: flex;
  height: 20px;
  width: 100px;
  margin-top: 10px;
}
.clickRightMenu {
  position: absolute;
  z-index: 9999;

  height: 130px;
  width: 100px;
  border-radius: 5px;
  background-color: #ecf5ff;
}
</style>
