<template>
  <div class="searchContainer">
    <el-input v-model="searchInput" placeholder="Please input" style="width: 300px; margin-left: 50px;" clearable />
    <el-button type="primary" class="searchButton" @click="searchGroup">搜索</el-button>
  </div>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;">
    <div v-for="(item, i) in nowGroupArray" :key="i" class="infinite-list-item">
      <li style="text-align: center;width: 350px;height:20px ; margin-top: -30px;" @click="chooseGroup(item)">{{ item.name
      }}</li>
      <el-divider style="margin-top: -60px;display: flex;" />
    </div>
  </ul>
  <div class="textarea" @scroll="loadMore">
    <div class="eachMessageContainer" v-for="(item, index) in nowChosenGroup.contentArray" :key="index">
      <div class="bubble left">
        <a class="avatar" href><img src="https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg"
            alt /></a>
        <div class="wrap">
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-input v-model="messageInput" placeholder="" class="messageContainer" />
  <el-button type="primary" plain class="sendButton" @click="sendMessage">发送</el-button>
  <div class="searchContainer" style="left: 1065px;">
    <el-input v-model="searchInput" placeholder="Please input" style="width: 300px; margin-left: 50px;" clearable />
    <el-button type="primary" class="searchButton" @click="searchGroup">搜索</el-button>
  </div>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;left: 1080px;">
    <div v-for="(item, i) in nowGroupArray" :key="i" class="infinite-list-item">
      <li style="text-align: center;width: 350px;height:20px ; margin-top: -30px;" @click="chooseGroup(item)">{{ item.name
      }}</li>
      <el-divider style="margin-top: -60px;display: flex;" />
    </div>
  </ul>
</template>
  
<script>
import { ref } from 'vue'
export default {
  mounted() {
    this.scrollToBottom();
  },
  data() {
    return {
      messageInput : '',
      nowChosenGroup: '',
      searchInput: '',
      count: ref(20),
      tempGroupArray: [],
      nowGroupArray: [],
      allGroupArray: [
        {
          name: "group1",
          contentArray: [
            {
              "name": "123",
              "url": "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              "content": 123,
              "time": "2021-7-12 17:12:12"
            },
          ]
        },
        {
          name: "group2",
          contentArray: [
            {
              "name": "123",
              "url": "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              "content": "123",
              "time": "2021-7-12 17:12:12"
            },
          ]
        },
        {
          name: "group3",
          contentArray: [
            {
              "name": "123",
              "url": "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              "content": 123,
              "time": "2021-7-12 17:12:12"
            },
          ]
        },
        {
          name: "group1",
          contentArray: [
            {
              "name": "123",
              "url": "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              "content": 123,
              "time": "2021-7-12 17:12:12"
            },
            {
              "name": "456",
              "url": "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              "content": "123",
              "time": "2021-7-12 17:12:46"
            }
          ]
        },
        {
          name: "group1",
          contentArray: [
            {
              "name": "123",
              "url": "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              "content": 123,
              "time": "2021-7-12 17:12:12"
            },
            {
              "name": "456",
              "url": "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              "content": "123",
              "time": "2021-7-12 17:12:46"
            }
          ]
        },
        {
          name: "group1",
          contentArray: [
            {
              "name": "123",
              "url": "https://img0.baidu.com/it/u=3953639057,245238928&fm=15&fmt=auto&gp=0.jpg",
              "content": 123,
              "time": "2021-7-12 17:12:12"
            },
            {
              "name": "456",
              "url": "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
              "content": "123",
              "time": "2021-7-12 17:12:46"
            }
          ]
        },
      ]
    }
  },
  created() {
    this.nowGroupArray = this.allGroupArray;
    this.nowChosenGroup = this.nowGroupArray[0];
  },
  methods: {
    sendMessage() {
      const now = new Date();

      const year = now.getFullYear();
      const month = now.getMonth() + 1; // 月份从0开始，所以要加1
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      var newObj = {
        "name": 'kangjiaqi',
        "url": "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
        "content": this.messageInput,
        "time": `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      }
      this.nowChosenGroup.contentArray.push(newObj)
      this.messageInput = ''
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const scrollableContainer = document.querySelector('.textarea');
        scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
      });
    },
    test() {
      let scrollingElement = document.querySelector('.textarea')
      console.log(scrollingElement);
    },
    loadMore() {
      let scrollingElement = document.querySelector('.textarea')
      if (scrollingElement.scrollTop === 0) {
        // 执行加载操作
      }
    },
    load() {
    },
    searchGroup() {
      this.nowGroupArray = [];
      for (var i = 0; i < this.allGroupArray.length; i++) {
        if (this.allGroupArray[i].name.indexOf(this.searchInput) >= 0) {
          this.nowGroupArray.push(this.allGroupArray[i]);
        }
      }
      console.log(this.nowGroupArray)
    },
    chooseGroup(item) {
      this.nowChosenGroup = item;
      console.log(this.nowChosenGroup);
    }
  },
  watch: {
    // 监视属性名
    searchInput: function (newVal, oldVal) {
      if (oldVal != '' && newVal == '') {
        this.nowGroupArray = this.allGroupArray
      }
    }
  }
}
</script>
  
<style>
.bubble {
  padding: 6px;
  overflow: hidden;
  position: relative;
}

.bubble:after {
  clear: both;
  content: '';
}

.bubble a.avatar {
  display: block;
  height: 44px;
  width: 44px;
  border-radius: 2px;
  overflow: hidden;
}

.bubble a.avatar>img {
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
}

.bubble .content:before {
  content: '';
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
  height: 70px;
  width: 100%;
}

.sendButton {
  position: absolute;
  display: flex;
  top: 625px;
  left: 1040px;
}

.messageContainer {
  position: absolute;
  display: flex;
  height: 100px;
  width: 700px;
  left: 415px;
  top: 515px;
}

.textarea {
  flex-direction: column;
  position: absolute;
  overflow: auto;
  /* 启用垂直滚动 */
  left: 415px;
  top: 165px;
  display: flex;
  height: 350px;
  width: 700px;
  background-color: #f0f9eb;
}

.searchButton {
  margin-left: 50px;
  margin-top: 10px;
}

.searchContainer {
  position: absolute;
  display: flex;
  left: 0px;
  top: 165px;
  height: 50px;
  width: 415px;
}

.infinite-list {
  position: absolute;
  top: 200px;
  left: 10px;
  height: 400px;
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
