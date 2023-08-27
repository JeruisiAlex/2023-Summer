<template>
  <div class="searchContainer">
    <div class="title">
      {{ nowChosenGroup.name }}
    </div>
    <el-input
      v-model="searchInput"
      placeholder="搜索"
      style="width: 150px"
      clearable
    />
    <el-button type="primary" class="searchButton" @click="searchGroup"
      >搜索</el-button
    >
  </div>
  <el-scrollbar height="550px" class="GroupList">
    <p
      v-for="(item, i) in nowGroupArray"
      :key="i"
      @click="chooseGroup(item, i)"
      class="scrollbar-demo-item"
      :id="'groupList' + i"
    >
      {{ item.name }}
    </p>
  </el-scrollbar>
  <div class="textarea" @scroll="loadMore">
    <div
      class="eachMessageContainer"
      v-for="(item, index) in nowChosenGroup.contentArray"
      :key="index"
    >
      <div class="timeContainer">
        <div v-if="isTimeDifferenceGreaterThan5Second(index)">
          {{ item.time }}
        </div>
      </div>
      <div class="bubble left">
        <a class="avatar" href
          ><img
            :src="item.url"
            alt
        /></a>
        <div class="wrap">
          <div class="nameContainer">{{ item.name }}</div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-input v-model="messageInput" placeholder="" class="messageContainer" />
  <el-button type="primary" plain class="sendButton" @click="sendMessage"
    >发送</el-button
  >
  <div class="teamGroupTitle">
    团队成员
  </div>
  <div class="searchContainer" style="left: 1055px; top: 90px; height: 40px">
    <el-input
      v-model="searchInput"
      placeholder="搜索"
      style="width: 300px; margin-left: 50px"
      clearable
    />
    <el-button type="primary" class="searchButton" @click="searchGroup"
      >搜索</el-button
    >
  </div>
  <el-scrollbar
    height="470px"
    class="GroupList"
    style="left: 1100px; top: 130px"
  >
    <p
      v-for="item in 20"
      :key="item"
      class="scrollbar-demo-item"
      style="width: 350px"
    >
      {{ item }}
    </p>
  </el-scrollbar>
</template>

<script scoped>
let ws;
import { ref } from "vue";

export default {
  mounted() {
    this.scrollToBottom();
    this.websocketInit();
  },
  data() {
    return {
      messageInput: "",
      nowChosenGroup: "",
      searchInput: "",
      count: ref(20),
      tempGroupArray: [],
      nowGroupArray: [],
      allGroupArray: [
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://2023summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/user/3.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
          ],
        },
        {
          name: "group2",
          contentArray: [
            {
              name: "123",
              url: "http://2023summer-se-1316618142.cos.ap-beijing.myqcloud.com/icon/user/3.jpg",
              content: "123",
              time: "2021-7-12 17:12:12",
            },
          ],
        },
        {
          name: "group3",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
        {
          name: "group1",
          contentArray: [
            {
              name: "123",
              url: "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              content: 123,
              time: "2021-7-12 17:12:12",
            },
            {
              name: "456",
              url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              content: "123",
              time: "2021-7-12 17:12:46",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.nowGroupArray = this.allGroupArray;
    this.nowChosenGroup = this.nowGroupArray[0];
  },
  methods: {
    isTimeDifferenceGreaterThan5Second(index) {
      if (index === 0) return true;
      var date1 = new Date(this.nowChosenGroup.contentArray[index].time);
      var date2 = new Date(this.nowChosenGroup.contentArray[index - 1].time);
      const timeDifferenceInMilliseconds = date1 - date2;
      const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
      return timeDifferenceInSeconds > 5;
    },
    websocketInit() {
      var that = this;
      ws = new WebSocket("ws://8.130.25.189/ws/chat/team/1/");
      ws.onopen = function () {
        console.log("websockt已经打开");
      };
      ws.onmessage = function (message) {
        var parsedData = JSON.parse(message.data);
        var newObj = {
          name: parsedData.name,
          content: parsedData.content,
          time: parsedData.time,
        };
        that.nowChosenGroup.contentArray.push(newObj);
      };
      ws.onclose = function () {
        //服务器连接关闭
        console.log("websocket已关闭");
      };
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
    scrollToBottom() {
      this.$nextTick(() => {
        const scrollableContainer = document.querySelector(".textarea");
        scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
      });
    },
    loadMore() {
      let scrollingElement = document.querySelector(".textarea");
      if (scrollingElement.scrollTop === 0) {
        // 执行加载操作
      }
    },
    load() {},
    searchGroup() {
      this.nowGroupArray = [];
      for (var i = 0; i < this.allGroupArray.length; i++) {
        if (this.allGroupArray[i].name.indexOf(this.searchInput) >= 0) {
          this.nowGroupArray.push(this.allGroupArray[i]);
        }
      }
    },
    chooseGroup(item, i) {
      this.nowChosenGroup = item;
      for (var k = 0; k < this.nowGroupArray.length; k++) {
        var ele1 = document.getElementById("groupList" + k);
        ele1.style.background = "var(--el-color-primary-light-9)";
        ele1.style.color = "var(--el-color-primary)";
      }
      var ele = document.getElementById("groupList" + i);
      ele.style.background = "#409EFF";
      ele.style.color = "white";
    },
  },
  watch: {
    // 监视属性名
    searchInput: function (newVal, oldVal) {
      if (oldVal != "" && newVal == "") {
        this.nowGroupArray = this.allGroupArray;
      }
    },
  },
};
</script>

<style>
.nameContainer{
  margin-bottom: 5px;
  color: #c6c6c6;
  font-size: 13px;
}
.teamGroupTitle{
  text-align: center;
  position: absolute;
  display: flex;
  height: 60px;
  width: 400px;
  top: 10px;
  left: 1100px;
  border-bottom-style: solid;
  border-bottom-color: #79bbff;
  border-bottom-width: 2px;
  font-size: 30px;
}
.GroupList {
  position: absolute;
  top: 60px;
}
.scrollbar-demo-item {
  cursor: pointer;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-style: solid;
  border-color: #79bbff;
  border-radius: 5px;
  border-width: 1px;
}
.timeContainer {
  text-align: center;

  align-items: center;
  align-content: center;
  height: 30px;
  width: 100%;
  margin-top: 20px;
}

.title {
  font-size: 30px;
  position: absolute;
  display: flex;
  height: 60px;
  width: 800px;
  left: 260px;
  top: 0px;

  border-bottom-style: solid;
  border-bottom-color: #79bbff;
  border-bottom-width: 2px;
}

.bubble {
  padding: 6px;
  overflow: hidden;
  position: relative;
}

.bubble:after {
  clear: both;
  content: "";
}

.bubble a.avatar {
  display: block;
  height: 44px;
  width: 44px;
  border-radius: 2px;
  overflow: hidden;
}

.bubble a.avatar > img {
  width: 100%;
  height: 100%;
}

.bubble.left a.avatar {
  float: left;
}

.bubble.right a.avatar {
  float: right;
}

.bubble .content {
  width: auto;
  padding: 0.7em 0.5em;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid;
  position: relative;
  display: inline-block;
  word-wrap: break-word; /* 允许单词内换行 */
  max-width: 250px;  
}

.bubble .content:before {
  content: "";
  display: inline-block;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border: 1px solid transparent;
  border-radius: 3px;
  position: absolute;
  background-color: inherit;
  border-right-color: inherit;
  border-bottom-color: inherit;
}

.bubble.left {
  text-align: left;
}

.bubble.right {
  text-align: right;
}

.bubble.left .wrap {
  margin-left: 56px;
  margin-right: 56px;
}

.bubble.left .content {
  background: #fafafa;
  border-color: #c6c6c6;
}

.bubble.left .content:before {
  left: -6px;
  top: 16px;
  transform: rotate(135deg);
}

.bubble.right .wrap {
  margin-right: 56px;
  margin-left: 56px;
}

.bubble.right .content {
  background: #b3e866;
  border-color: #9ab96b;
  text-align: left;
}

.bubble.right .content:before {
  right: -6px;
  top: 16px;
  transform: rotate(-45deg);
}

.eachMessageContainer {
  height: 90px;
  width: 100%;
}

.sendButton {
  position: absolute;
  display: flex;
  top: 585px;
  left: 1000px;
}

.messageContainer {
  position: absolute;
  display: flex;
  height: 100px;
  width: 800px;
  left: 255px;
  top: 480px;
}

.textarea {
  flex-direction: column;
  position: absolute;
  overflow: auto;
  /* 启用垂直滚动 */
  left: 255px;
  top: 85px;
  display: flex;
  height: 380px;
  width: 800px;
  border-radius: 5px;
  border-color: #79bbff;
  border-width: 1px;
  border-style: solid;
}

.searchButton {
  margin-left: 20px;
  margin-top: 10px;
}

.searchContainer {
  position: absolute;
  display: flex;
  left: 0px;
  top: 10px;
  height: 50px;
  width: 415px;
  margin-left: 0px;
}

.infinite-list {
  position: absolute;
  top: 70px;
  left: -40px;
  height: 1000px;
  list-style: none;
  text-align: center;
}

.infinite-list .infinite-list-item {
  flex-direction: column;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 350px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
