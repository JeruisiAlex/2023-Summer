<template>
  <div
    v-if="!isShowAll"
    style="
      position: absolute;
      top: 0;
      min-width: 1200px;
      width: 100%;
      height: 100%;
      z-index: 9999;
    "
  >
    <div
      v-loading="!isShowAll"
      element-loading-text="正在加载..."
      style="height: 100%; width: 100%"
    ></div>
  </div>
  <el-dialog
    v-model="chooseGroupDialog"
    title="选择聊天"
    style="width: 300px; border-radius: 20px; box-shadow: 4px 4px 10px #409eff"
  >
    <div
      style="
        height: 50px;
        width: 200px;
        border-bottom-style: solid;
        border-bottom-color: #dedfe0;
        border-bottom-width: 1px;
        margin-left: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      "
      v-for="(item, index) in allGroupArray"
      :key="index"
      @click="transferSingleMessage(operateMessage[0], item)"
    >
      <p style="text-align: center">
        {{ item.group.name }}
      </p>
    </div>
  </el-dialog>
  <div
    class="clickRightMenu"
    v-if="clickRightMenu == true && muchSelectModel == false"
    :style="{ top: topNum + 'px', left: leftNum + 'px' }"
  >
    <el-button
      type="primary"
      plain
      class="messageOptionButton"
      text
      style="margin-left: 0px"
      @click="deleteSingleMessage(operateMessage[0])"
      >删除</el-button
    >
    <el-button
      type="primary"
      plain
      class="messageOptionButton"
      text
      style="margin-left: 0px"
      @click="openMuchSelectModel"
      >多选</el-button
    >
    <el-button
      type="primary"
      plain
      class="messageOptionButton"
      text
      style="margin-left: 0px"
      @click="
        chooseGroupDialog = true;
        muchSelectModel = false;
      "
      >转发</el-button
    >
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>{{ dialogMessage }}</span>
  </el-dialog>
  <div class="searchContainer" @mousedown="removeMenu">
    <div class="title">
      {{ nowChosenGroup.name }}
      <el-button
        type="primary"
        class="searchChatButton"
        @click="getNeighborChaMessage(-1)"
        style="left: 390px; position: absolute; top: 18px"
        v-if="this.searchPosition !== -1"
        >上一条</el-button
      >
      <el-input
        v-model="searchChatInput"
        placeholder="搜索聊天记录"
        style="
          width: 200px;
          left: 500px;
          position: absolute;
          height: 40px;
          top: 15px;
        "
        clearable
      />
      <el-button
        type="primary"
        class="searchChatButton"
        @click="searchChatMessage"
        style="left: 730px; position: absolute; top: 18px"
        v-if="this.searchPosition === -1"
        >搜索</el-button
      >
      <el-button
        type="primary"
        class="searchChatButton"
        @click="getNeighborChaMessage(1)"
        style="left: 720px; position: absolute; top: 18px"
        v-if="this.searchPosition !== -1"
        >下一条</el-button
      >
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
  <el-scrollbar height="550px" class="GroupList" @mousedown="removeMenu">
    <div
      v-for="(item, i) in nowGroupArray"
      :key="i"
      style="
        flex-direction: column;
        display: flex;
        align-content: start;
        width: 220px;
      "
    >
      <div class="dotDiv" v-if="item.unreadMessage != 0"></div>
      <p
        @click="chooseGroup(item, i)"
        class="scrollbar-demo-item"
        :id="'groupList' + i"
      >
        {{ item.group.name }}
        <span class="unreadSpan" v-if="item.unreadMessage != 0">
          [{{ item.unreadMessage }}条]
        </span>
      </p>
    </div>
  </el-scrollbar>
  <div class="textarea" @scroll="loadMore" @mousedown="removeMenu">
    <div
      class="eachMessageContainer"
      v-for="(item, index) in groupMessage[nowWs].content"
      :key="index"
      v-if="nowWs != -1"
    >
      <div
        class="timeContainer"
        v-if="isTimeDifferenceGreaterThan5Second(index)"
      >
        <div>
          {{ item.time }}
        </div>
      </div>
      <div class="bubble left" v-if="item.name !== $store.state.userName">
        <el-checkbox
          v-model="muchSelect[index]"
          class="mt-2"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
          style="float: left; margin-right: 15px"
          v-if="muchSelectModel == true"
          @change="chooseThisMessage(item, muchSelect[index])"
        />
        <a class="avatar" @click="jumpPersonalPage(item)"
          ><img
            :src="item.icon"
            @click="jumpPersonalPage(item)"
            style="cursor: pointer"
        /></a>
        <div class="wrap">
          <div class="nameContainer">{{ item.name }}</div>
          <div class="content" @contextmenu.prevent="rightClick($event, item)">
            {{ item.content }}
          </div>
        </div>
      </div>
      <div class="bubble right" v-else>
        <el-checkbox
          v-model="muchSelect[index]"
          class="mt-2"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
          style="float: right; margin-left: 15px"
          v-if="muchSelectModel == true"
          @change="chooseThisMessage(item, muchSelect[index])"
        />
        <a class="avatar" @click="jumpPersonalPage(item, item.time)"
          ><img
            :src="item.icon"
            @click="jumpPersonalPage(item)"
            style="cursor: pointer"
        /></a>
        <div class="wrap">
          <div class="nameContainer">{{ item.name }}</div>
          <div class="content" @contextmenu.prevent="rightClick($event, item)">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-input
    v-model="messageInput"
    placeholder=""
    class="messageContainer"
    @mousedown="removeMenu"
    v-if="muchSelectModel == false"
  />
  <div
    class="messageContainer"
    @mousedown="removeMenu"
    style="background-color: #ecf5ff; display: flex"
    v-if="muchSelectModel == true"
  >
    <div class="selectModelOption">
      <div
        style="
          background-color: white;
          height: 50px;
          width: 50px;
          margin-left: 25px;
          margin-top: 15px;
          border-radius: 50%;
          margin-bottom: 8px;
          cursor: pointer;
        "
        id="icon1"
        @mouseover="overTochangeIconColor('icon1')"
        @mouseleave="leaveTochangeIconColor('icon1')"
        @click="deleteMuchMessage"
      >
        <el-icon style="margin-left: 18px; margin-top: 18px"
          ><Delete
        /></el-icon>
      </div>
      <span
        style="
          margin-toptop: 15px;
          height: 20px;
          width: 100px;
          margin-left: 37px;
          font-size: 10px;
        "
        >删除</span
      >
    </div>
    <div class="selectModelOption">
      <div
        style="
          background-color: white;
          height: 50px;
          width: 50px;
          margin-left: 25px;
          margin-top: 15px;
          border-radius: 50%;
          margin-bottom: 8px;
          cursor: pointer;
        "
        id="icon2"
        @mouseover="overTochangeIconColor('icon2')"
        @mouseleave="leaveTochangeIconColor('icon2')"
      >
        <el-icon style="margin-left: 18px; margin-top: 18px"
          ><ArrowRight
        /></el-icon>
      </div>
      <span
        style="
          margin-toptop: 15px;
          height: 20px;
          width: 100px;
          margin-left: 26px;
          font-size: 10px;
        "
        >逐条转发</span
      >
    </div>
    <div class="selectModelOption">
      <div
        style="
          background-color: white;
          height: 50px;
          width: 50px;
          margin-left: 25px;
          margin-top: 15px;
          border-radius: 50%;
          margin-bottom: 8px;
          cursor: pointer;
        "
        id="icon3"
        @mouseover="overTochangeIconColor('icon3')"
        @mouseleave="leaveTochangeIconColor('icon3')"
      >
        <el-icon style="margin-left: 18px; margin-top: 18px"
          ><Expand
        /></el-icon>
      </div>
      <span
        style="
          margin-toptop: 15px;
          height: 20px;
          width: 100px;
          margin-left: 26px;
          font-size: 10px;
        "
        >合并转发</span
      >
    </div>
    <div class="selectModelOption">
      <div
        style="
          background-color: white;
          height: 50px;
          width: 50px;
          margin-left: 25px;
          margin-top: 15px;
          border-radius: 50%;
          margin-bottom: 8px;
          cursor: pointer;
        "
        id="icon4"
        @mouseover="overTochangeIconColor('icon4')"
        @mouseleave="leaveTochangeIconColor('icon4')"
        @click="returnNomalModel"
      >
        <el-icon style="margin-left: 18px; margin-top: 18px"
          ><CloseBold
        /></el-icon>
      </div>
      <span
        style="
          margin-toptop: 15px;
          height: 20px;
          width: 100px;
          margin-left: 37px;
          font-size: 10px;
        "
        >取消</span
      >
    </div>
  </div>
  <el-button
    type="primary"
    plain
    class="sendButton"
    @click="sendMessage"
    @keydown.enter="enter_up()"
    v-if="muchSelectModel == false"
    >发送</el-button
  >
  <div
    class="teamGroupTitle"
    @mousedown="removeMenu"
    v-if="groupOrPerson == false"
  >
    团队成员
  </div>
  <div class="personalInfoContainer" v-if="this.groupOrPerson == true">
    <div class="personalIconContainer">
      <img :src="nowPerson.icon_address" style="border-radius: 50%" />
    </div>
    <div class="personDetailInfoContainer">
      <pre class="eachInfoItem">昵称     {{ nowPerson.username }}</pre>
      <pre class="eachInfoItem">名字     {{ nowPerson.true_name }}</pre>
      <pre class="eachInfoItem">电话     {{ nowPerson.phone }}</pre>
      <pre class="eachInfoItem">邮箱     {{ nowPerson.email }}</pre>
      <pre class="eachInfoItem">
性别     {{ nowPerson.gender == "M" ? "男" : "女" }}</pre
      >
    </div>
  </div>

  <div
    class="searchContainer"
    style="left: 1055px; top: 90px; height: 40px"
    @mousedown="removeMenu"
    v-if="groupOrPerson == false"
  >
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
    @mousedown="removeMenu"
    v-if="groupOrPerson == false"
  >
    <p
      v-for="(item, index) in nowGroupMember.member"
      :key="index"
      class="scrollbar-demo-item"
      style="width: 350px"
    >
      <img :src="item.icon_address" class="userIcon" />
      <span>
        {{ item.username }}
      </span>
    </p>
  </el-scrollbar>
</template>

<script scoped>
import { ref } from "vue";
import store from "@/store";
import { getGroupInformation } from "../api/group";
import { getUserChatRoom } from "../api/user";
import { all } from "axios";
export default {
  mounted() {
    this.openDB();
    this.judgeSamePerson();
    this.getMygroup();
    this.closeWeb();
    setTimeout(() => {
      this.getAllGroupMember();
      this.prepareGroupMessage();
      this.scrollToBottom();
      this.websocketInit();
      this.websocketOpen();
      this.websocketOnMessage();
      this.isShowAll = true;
    }, 2000);
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    window.addEventListener("keydown", this.enter_up);
  },
  data() {
    return {
      chooseGroupDialog: false,
      messageInput: "",
      nowChosenGroup: "",
      searchInput: "",
      count: ref(20),
      tempGroupArray: [],
      nowGroupArray: [],
      allGroupArray: [],
      allGroupMember: [],
      nowGroupMember: {
        type: "",
        member: [],
      },
      nowWs: -1,
      groupMessage: [],
      groupSize: 0,
      wsArray: [],
      searchChatInput: "",
      searchPosition: -1,
      targetBox: [],
      dialogMessage: "",
      dialogVisible: false,
      showDot: true,
      messageStorageDb: "",
      isShowAll: false,
      clickRightMenu: false,
      topNum: 0,
      leftNum: 0,
      operateMessage: [],
      muchSelect: [],
      muchSelectModel: false,
      groupOrPerson: false,
      nowPerson: "",
    };
  },
  unmounted() {
    window.removeEventListener("keydown", this.enter_up, false);
  },
  beforeRouteUpdate(to, form, next) {
    this.closeWeb();
    setTimeout(() => {
      next();
    }, 50);
  },
  beforeRouteLeave(to, form, next) {
    this.closeWeb();
    setTimeout(() => {
      next();
    }, 50);
  },
  onBeforeUnmount() {
    this.closeWeb();
  },
  methods: {
    transferSingleMessage(item, group) {
      var index;
      for (var i = 0; i < this.wsArray.length; i++) {
        const url = this.wsArray[i].url;
        const match = url.match(/\/group\/(\d+)/);
        const teamNumber = match[1];
        if (group.group.id == teamNumber) {
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1; // 月份从0开始，所以要加1
          const day = now.getDate();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();
          var timestamp1 =
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
          var newObj = {
            type: "chat",
            data: {
              user_id: store.state.uid,
              group_id: teamNumber,
              content: item.content,
              timestamp: timestamp1,
            },
          };
          console.log(JSON.stringify(newObj));
          try {
            this.wsArray[i].send(JSON.stringify(newObj));
            this.chooseGroupDialog = false;
          } catch {
            this.dialogMessage = "网络错误";
          }
        }
      }
    },
    deleteMuchMessage() {
      for (var i = 0; i < this.operateMessage.length; i++) {
        this.deleteSingleMessage(this.operateMessage[i]);
      }
    },
    returnNomalModel() {
      this.operateMessage = [];
      for (var i = 0; i < this.muchSelect.length; i++) {
        this.muchSelect[i] = false;
      }
      this.muchSelectModel = false;
    },
    leaveTochangeIconColor(eleId) {
      var ele = document.querySelector("#" + eleId);
      ele.style.backgroundColor = "white";
    },
    overTochangeIconColor(eleId) {
      var ele = document.querySelector("#" + eleId);
      ele.style.backgroundColor = "#c6e2ff";
    },
    chooseThisMessage(item, newVal) {
      if (newVal == true) this.operateMessage.push(item);
      else {
        var temp = this.operateMessage.filter((i) => i.time != item.time);
        this.operateMessage = temp;
      }
    },
    openMuchSelectModel() {
      this.muchSelectModel = true;
      this.operateMessage = [];
      for (var i = 0; i < this.muchSelect.length; i++) {
        this.muchSelect[i] = false;
      }
    },
    deleteSingleMessage(item) {
      this.muchSelectModel = false;
      for (var i = 0; i < this.groupMessage[this.nowWs].content.length; i++) {
        var temp = this.groupMessage[this.nowWs].content.filter(
          (i) => i.time != item.time
        );
        this.groupMessage[this.nowWs].content = temp;
      }
      var objectStore = this.db
        .transaction("message", "readwrite")
        .objectStore("message");
      objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          if (cursor.value.time == item.time) {
            cursor.delete();
          } else {
            cursor.continue();
          }
        } else {
          console.log("没有更多数据了！");
        }
      };
    },
    removeMenu() {
      if (this.muchSelectModel == false) {
        this.clickRightMenu = false;
        this.operateMessage = [];
      }
    },
    rightClick(e, item) {
      this.topNum = e.pageY - 60;
      this.leftNum = e.pageX - 20;
      this.clickRightMenu = true;
      this.operateMessage.push(item);
    },
    websocketOpen() {
      var that = this;
      for (let i = 0; i < this.allGroupArray.length; i++) {
        const group = this.allGroupArray[i];
        this.wsArray[i].onopen = () => {
          console.log("websocket " + i + " 已开启");
          const newObj = {
            type: "history",
            user_id: store.state.uid,
            group_id: that.allGroupArray[i].group.id,
          };
          try {
            this.wsArray[i].send(JSON.stringify(newObj));
          } catch {
            this.dialogMessage = "网络错误";
            this.dialogVisible = true;
          }
        };
      }
    },
    addToDB(item) {
      var request = this.db
        .transaction(["message"], "readwrite")
        .objectStore("message")
        .add({
          groupid: item.id,
          userName: item.userName,
          userIcon: item.userIcon,
          content: item.content,
          time: item.time,
        });
      var that = this;
      request.onsuccess = function (event) {
        console.log("数据写入成功");
      };

      request.onerror = function (event) {
        console.log("数据写入失败");
      };
    },
    openDB() {
      var request = window.indexedDB.open("message");
      request.onupgradeneeded = function (event) {
        this.db = event.target.result;
        var objectStore;
        if (!this.db.objectStoreNames.contains("message")) {
          objectStore = this.db.createObjectStore("message", {
            autoIncrement: true,
          });
          objectStore.createIndex("groupid", "groupid", { unique: false });
        }
      };
      request.onsuccess = function (event) {
        this.db = event.target.result;
      }.bind(this); // Bind the function to the correct 'this' context
    },
    enter_up(e) {
      if (e.keyCode == 13) {
        this.sendMessage();
      }
    },
    async beforeunloadHandler(e) {
      await this.closeWeb(); // 退出登录接口
      window.close();
    },
    closeWeb() {
      if (this.nowWs != -1) {
        var leaveObj = {
          type: "change",
          change: "leave",
          user_id: store.state.uid,
          group_id: this.nowChosenGroup.id,
        };
        try {
          this.wsArray[this.nowWs].send(JSON.stringify(leaveObj));
        } catch {
          this.dialogMessage = "网络错误";
          this.dialogVisible = true;
        }
      }
    },
    findNowchat() {
      for (var i = 0; i < this.groupMessage.length; i++) {
        if (this.groupMessage[i].id == this.nowChosenGroup.id) {
          return this.groupMessage[i];
        }
      }
    },
    getNeighborChaMessage(num) {
      if (this.searchPosition === 0 && num === -1) {
        this.dialogMessage = "这是第一条";
        this.dialogVisible = true;
        return;
      }
      if (this.searchPosition === this.targetBox.length - 1 && num === 1) {
        this.dialogMessage = "这是最后一条";
        this.dialogVisible = true;
        return;
      }
      this.searchPosition += num;
      const container = document.querySelector(".textarea");
      const targetBoxTop = this.targetBox[this.searchPosition].offsetTop;
      const containerTop = container.offsetTop;
      const scrollTop = targetBoxTop - containerTop;
      container.scrollTop = scrollTop;
    },
    searchChatMessage() {
      if (this.searchChatInput == "") {
        return;
      }
      var temp = document.querySelector(
        "#app > main > div > div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > div.textarea > div:nth-child(1) > div.bubble.right > div > div.content"
      );
      if (temp == null) {
        return;
      }
      var index = 1;
      while (temp != null) {
        if (temp.textContent.includes(this.searchChatInput) === true) {
          this.targetBox.push(
            document.querySelector(
              "#app > main > div > div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > div.textarea > div:nth-child(" +
                index +
                ")"
            )
          );
        }
        index++;
        temp = document.querySelector(
          "#app > main > div > div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > div.textarea > div:nth-child(" +
            index +
            ") > div.bubble.right > div > div.content"
        );
      }
      if (this.targetBox.length === 0) {
        this.dialogMessage = "没有对应消息";
        this.dialogVisible = true;
        return;
      }
      this.searchPosition = 0;
      const container = document.querySelector(".textarea");
      const targetBoxTop = this.targetBox[0].offsetTop;
      const containerTop = container.offsetTop;
      const scrollTop = targetBoxTop - containerTop;
      container.scrollTop = scrollTop;
    },
    jumpPersonalPage(item) {
      var uid;
      for (var i = 0; i < this.allGroupMember.length; i++) {
        if (this.nowChosenGroup.id === this.allGroupMember[i].id) {
          for (var j = 0; j < this.allGroupMember[i].member.length; j++) {
            if (this.allGroupMember[i].member[j].username == item.name)
              uid = this.allGroupMember[i].member[j].id;
          }
        }
      }
      this.$router.push("/" + uid + "/PersonalInfomation");
    },
    prepareGroupMessage() {
      for (var i = 0; i < this.allGroupArray.length; i++) {
        var obj = {
          id: this.allGroupArray[i].group.id,
          content: [],
        };
        this.groupMessage.push(obj);
      }
      var that = this;
      var objectStore = this.db.transaction("message").objectStore("message");
      objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          for (var i = 0; i < that.allGroupArray.length; i++) {
            if (that.groupMessage[i].id == cursor.value.groupid) {
              var newObj = {
                name: cursor.value.userName,
                icon: cursor.value.userIcon,
                content: cursor.value.content,
                time: cursor.value.time,
              };
              that.groupMessage[i].content.push(newObj);
              var judge = false;
              that.muchSelect.push(judge);
            }
          }
          cursor.continue();
        } else {
          console.log("没有更多数据了！");
        }
      };
    },
    getAllGroupMember() {
      for (var i = 0; i < this.allGroupArray.length; i++) {
        var obj = {
          groupid: this.allGroupArray[i].group.id,
          member: this.allGroupArray[i].group.member,
          type: this.allGroupArray[i].group.type,
        };
        this.allGroupMember.push(obj);
      }
      this.groupSize = this.allGroupArray.length;
    },
    getMygroup() {
      var request = getUserChatRoom();
      var groupTemp;
      request.then((result) => {
        groupTemp = result.data;
        for (var i = 0; i < groupTemp.length; i++) {
          var obj = {
            group: {
              id: groupTemp[i].group_id,
              name: groupTemp[i].name,
              member: groupTemp[i].member_info,
              type: groupTemp[i].type,
            },
            unreadMessage: 0,
          };
          this.allGroupArray.push(obj);
        }
        this.nowGroupArray = this.allGroupArray;
      });
    },
    judgeSamePerson() {
      if (store.state.isLogin === false) this.$router.push("/");
      var uid = this.$route.params.uid;
      if (uid != store.state.uid)
        this.$router.push("/" + store.state.uid + "/Chatroom");
    },
    isTimeDifferenceGreaterThan5Second(index) {
      if (index === 0) return true;
      var date1 = new Date(this.groupMessage[this.nowWs].content[index].time);
      var date2 = new Date(
        this.groupMessage[this.nowWs].content[index - 1].time
      );
      const timeDifferenceInMilliseconds = date1 - date2;
      const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
      return timeDifferenceInSeconds > 300;
    },
    receiveSingleMessage(parsedData) {
      var that = this;
      var uid = parsedData.user_id;
      if (uid) {
        var tid = parsedData.group_id;
        var username;
        var userIcon;
        var j = 0;
        var flag = false;
        for (j = 0; j < that.groupSize; j++) {
          if (that.allGroupMember[j].groupid == tid) {
            for (var k = 0; k < that.allGroupMember[j].member.length; k++) {
              if (that.allGroupMember[j].member[k].id === uid) {
                username = that.allGroupMember[j].member[k].username;
                userIcon = that.allGroupMember[j].member[k].icon_address;
                flag = true;
                break;
              }
            }
          }
          if (flag) break;
        }
        var newObj = {
          name: username,
          icon: userIcon,
          content: parsedData.content,
          time: parsedData.timestamp,
        };
        for (var m = 0; m < that.groupMessage.length; m++) {
          if (that.groupMessage[m].id == tid) {
            that.groupMessage[m].content.push(newObj);
          }
        }
        for (var m = 0; m < that.allGroupArray.length; m++) {
          if (
            that.allGroupArray[m].group.id === tid &&
            that.allGroupArray[m].group.id != this.nowChosenGroup.id
          ) {
            that.allGroupArray[m].unreadMessage++;
          }
        }
        var dbObj = {
          id: tid,
          userName: username,
          userIcon: userIcon,
          content: parsedData.content,
          time: parsedData.timestamp,
        };
        this.addToDB(dbObj);
      }
    },
    websocketInit() {
      for (var i = 0; i < this.allGroupArray.length; i++) {
        var ws = new WebSocket(
          "ws://8.130.25.189/ws/chat/group/" +
            this.allGroupArray[i].group.id +
            "/"
        );
        this.wsArray.push(ws);
      }
    },
    websocketOnMessage() {
      var that = this;
      for (var i = 0; i < this.allGroupArray.length; i++) {
        that.wsArray[i].onmessage = function (message) {
          var parsedData = JSON.parse(message.data);
          if (Array.isArray(parsedData.data) === true) {
            var dataArray = parsedData.data;
            for (var j = 0; j < dataArray.length; j++) {
              that.receiveSingleMessage(dataArray[j]);
            }
          } else that.receiveSingleMessage(parsedData);
          setTimeout(() => {
            const scrollableContainer = document.querySelector(".textarea");
            scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
          }, 50);
        };
        this.wsArray[i].onClose = function () {
          if (this.nowWs != -1) {
            var leaveObj = {
              type: "change",
              change: "leave",
              user_id: store.state.uid,
              group_id: this.nowChosenGroup.id,
            };
            try {
              this.wsArray[this.nowWs].send(JSON.stringify(leaveObj));
            } catch {
              this.dialogMessage = "网络错误";
              this.dialogVisible = true;
            }
          }
          console.log("websocket i 已关闭");
        };
      }
    },

    sendMessage() {
      if (this.nowWs === -1) {
        this.messageInput = "";
        return;
      }
      if (this.messageInput == "") {
        this.dialogMessage = "不能发送空白消息";
        this.dialogVisible = true;
        return;
      }
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // 月份从0开始，所以要加1
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      var timestamp1 =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      var newObj = {
        type: "chat",
        data: {
          user_id: store.state.uid,
          group_id: this.nowChosenGroup.id,
          content: this.messageInput,
          timestamp: timestamp1,
        },
      };
      const scrollableContainer = document.querySelector(".textarea");
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;

      try {
        this.wsArray[this.nowWs].send(JSON.stringify(newObj));
      } catch {
        this.dialogMessage = "网络错误";
        this.dialogVisible = true;
      }
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
        if (this.allGroupArray[i].group.name.indexOf(this.searchInput) >= 0) {
          this.nowGroupArray.push(this.allGroupArray[i]);
        }
      }
    },
    chooseGroup(item, i) {
      if (this.nowWs != -1) {
        var leaveObj = {
          type: "change",
          change: "leave",
          user_id: store.state.uid,
          group_id: this.nowChosenGroup.id,
        };
        try {
          this.wsArray[this.nowWs].send(JSON.stringify(leaveObj));
        } catch {
          this.dialogMessage = "网络错误";
          this.dialogVisible = true;
        }
        console.log("已经leave" + leaveObj);
      }
      item.unreadMessage = 0;
      this.nowWs = i;
      this.nowChosenGroup = item.group;
      for (var k = 0; k < this.nowGroupArray.length; k++) {
        var ele1 = document.getElementById("groupList" + k);
        ele1.style.background = "var(--el-color-primary-light-9)";
        ele1.style.color = "var(--el-color-primary)";
      }
      var ele = document.getElementById("groupList" + i);
      ele.style.background = "#409EFF";
      ele.style.color = "white";
      for (var i = 0; i < this.allGroupMember.length; i++) {
        if (item.group.id === this.allGroupMember[i].groupid) {
          this.nowGroupMember = this.allGroupMember[i];
          if (this.nowGroupMember.type == "Team") {
            this.groupOrPerson = false;
          } else {
            this.groupOrPerson = true;
            console.log(this.groupOrPerson);
            for (var j = 0; j < this.nowGroupMember.member.length; j++) {
              if (this.nowGroupMember.member[j].id != store.state.uid) {
                this.nowPerson = this.nowGroupMember.member[j];
              }
            }
          }
        }
      }
      var enterobj = {
        type: "change",
        change: "enter",
        user_id: store.state.uid,
        group_id: this.nowChosenGroup.id,
      };
      try {
        this.wsArray[this.nowWs].send(JSON.stringify(enterobj));
      } catch {
        this.dialogMessage = "网络错误";
        this.dialogVisible = true;
      }
      console.log("已发送enter", enterobj);
    },
  },
  watch: {
    // 监视属性名
    searchInput: function (newVal, oldVal) {
      if (oldVal != "" && newVal == "") {
        this.nowGroupArray = this.allGroupArray;
      }
    },
    searchChatInput: function (newVal, oldVal) {
      if (oldVal != newVal) {
        this.searchPosition = -1;
        const scrollableContainer = document.querySelector(".textarea");
        scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
        this.searchPosition = -1;
        this.targetBox = [];
      }
    },
  },
};
</script>

<style scoped>
.eachInfoItem {
  color: #606266;
  font-size: 15px;
  width: 5px;
  margin-top: 20px;
  width: 300px;
  height: 40px;
}
.personDetailInfoContainer {
  align-items: center;
  align-content: center;
  border-top-style: solid;
  border-top-color: #c6e2ff;
  border-top-width: 2px;
  position: absolute;
  display: flex;
  height: 250px;
  width: 100px;
  top: 200px;
  width: 100%;
  flex-direction: column;
}
.personalInfoContainer {
  position: absolute;
  display: flex;
  height: 500px;
  top: 70px;
  width: 380px;
  left: 1100px;
  border-radius: 20px;
  box-shadow: 4px 4px 10px #409eff;
}
.personalIconContainer {
  position: absolute;
  display: flex;
  left: 120px;
  top: 50px;
  height: 120px;
  width: 120px;
  border-radius: 50%;
}
.selectModelOption {
  height: 100px;
  width: 100px;
  margin-left: 80px;
}
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
  height: 100px;
  width: 100px;
  border-radius: 5px;
  background-color: #ecf5ff;
}
body {
  margin: 0;
}
.unreadSpan {
  margin-left: 10px;
  font-size: 10px;
  color: gray;
}
.dotDiv {
  position: relative;
  display: flex;
  left: 195px;
  top: 20px;
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 50%;
}
.userIcon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 50px;
  left: 10px;
}
.nameContainer {
  margin-bottom: 5px;
  color: #c6c6c6;
  font-size: 13px;
}
.teamGroupTitle {
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
  box-shadow: 4px 4px 10px #409eff;
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
