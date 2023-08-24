<template style="margin: 0; padding: 0">
  <el-header v-if="header" style="height: 48px; background-color:rgb(42, 159, 235);">
    <el-row :gutter="10" style=" color: white;">
    <el-col :span="1" @click="displayDrawer">
      <div class="grid-content header-icon"><el-icon><Menu /></el-icon></div>
    </el-col>
    <el-col :span="6"><div class="grid-content" style="text-align: left;">Originate Pro</div></el-col>
    <el-col :span="15"><div class="grid-content"></div></el-col>
    <el-col :span="1">
      <div class="grid-content header-icon">
        <el-popover
          placement="bottom"
          title="我的通知"
          :width="300"
          trigger="hover"
          content="进一步分为已读通知和未读通知"
        >
        <template #reference>
          <el-icon><Bell /></el-icon>
        </template>
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1" @click="displayNotification(1)">未读通知</el-menu-item>
          <el-menu-item index="2" @click="displayNotification(2)">已读通知</el-menu-item>
        </el-menu>
        <el-scrollbar max-height="500px" v-if="notificationsDisplay===1">
          <div class="drawer-item" @click="undisplayDrawer">我的团队</div>
          <div class="drawer-item" @click="undisplayDrawer">我的聊天</div>
          <div class="drawer-item" @click="undisplayDrawer">我的项目</div>
        </el-scrollbar>
        <el-scrollbar max-height="500px" v-if="notificationsDisplay===2">
          <div class="drawer-item" @click="undisplayDrawer">我的团队</div>
          <div class="drawer-item" @click="undisplayDrawer">我的聊天</div>
          <div class="drawer-item" @click="undisplayDrawer">我的项目</div>
          <div class="drawer-item" @click="undisplayDrawer">我的团队</div>
          <div class="drawer-item" @click="undisplayDrawer">我的聊天</div>
          <div class="drawer-item" @click="undisplayDrawer">我的项目</div>
          <div class="drawer-item" @click="undisplayDrawer">我的团队</div>
          <div class="drawer-item" @click="undisplayDrawer">我的聊天</div>
          <div class="drawer-item" @click="undisplayDrawer">我的项目</div>
          <div class="drawer-item" @click="undisplayDrawer">我的团队</div>
          <div class="drawer-item" @click="undisplayDrawer">我的聊天</div>
          <div class="drawer-item" @click="undisplayDrawer">我的项目</div>
        </el-scrollbar>
        </el-popover>
      </div>
    </el-col>
    <el-col :span="1">
      <div class="grid-content header-icon">
        <el-popover
          placement="bottom"
          title=""
          :width="200"
          trigger="hover"
          content="个人信息，修改密码，退出登录"
        >
        <template #reference>
          <el-icon><User /></el-icon>
        </template>
          <div class="drawer-item">个人信息</div>
          <div class="drawer-item">修改密码</div>
          <div id="logout-button" class="drawer-item">退出登录</div>
        </el-popover>
      </div>
    </el-col>
    </el-row>
  </el-header>
  <el-main>
    <el-scrollbar>
    <router-view/>
    <div style="height: 2000px;">123</div>
    </el-scrollbar>
  </el-main>
  <el-drawer
    v-model="drawer"
    title="Originate Pro"
    direction="ltr"
    size="25%"
  >
    <div class="drawer-item" @click="undisplayDrawer">我的团队</div>
    <div class="drawer-item" @click="undisplayDrawer">我的聊天</div>
    <div class="drawer-item" @click="undisplayDrawer">我的项目</div>
  </el-drawer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


.el-header {
  position: relative;
  width: 100%;
  height: 48px;      
}

.el-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 48px;
  bottom: 0;
  overflow-y: scroll;
}


.el-row {
  /* margin-bottom: 20px; */
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  font-size: 24px;
  min-height: 48px;
  line-height: 48px;
}

.header-icon {
  margin-top: 4px;
  /* scale: 1.5; */
}

.header-icon:hover {
  cursor: pointer;
}

.drawer-item {
  /* display: flex; */
  align-items: center;
  /*justify-content: center;*/
  height: 50px;
  line-height: 50px;
  margin: 10px;
  /*padding-left: 5px;*/
  text-align: center;
  border-radius: 4px;
  color: black;
  transition: 0.5s;
  overflow: hidden;
}

.drawer-item:hover {
  cursor: pointer;
  background: rgba(125, 125, 125, 0.25);
  /* color: rgb(42, 159, 235); */
  transition: 0.2s;
}

.notifiction-set-holder {
  max-height: 600px;
  overflow: scroll;
  overflow-x: hidden;
}

#logout-button {
  color: red;
}

#logout-button:hover {
  background: rgba(255, 0, 0, 0.25);
}

</style>

<script>
import { ArrowDown, Menu, Bell, User} from '@element-plus/icons-vue';


export default {
    components: {
      ArrowDown, Menu, Bell, User
    },

    data () {
      return {
        sitename:"Originate Pro",
        header: true,
        drawer: false,
        notificationsDisplay: 1,
        notificationSets: {
          type: "",
          by: "",
          content: "",
          ms: [],
        },
        notificationUnread: {
          type: "",
          by: "",
          content: "",
          ms: [],
        },
        notificationRead: {
          type: "",
          by: "",
          content: "",
          ms: [],
        },
      }
    },

    methods: {
      displayDrawer() {
        this.drawer = true;
      },
      undisplayDrawer() {
        this.drawer = false;
      },
      displayNotification(type) {
        this.notificationsDisplay = type;
      },
      // 下列函数仅供测试
      
    }
}
</script>
