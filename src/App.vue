<template style="margin: 0; padding: 0">
  <el-header style="height: 48px; background-color:rgb(42, 159, 235);">
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
        </el-popover>
      </div>
    </el-col>
    <el-col :span="1">
      <div class="grid-content header-icon">
        <el-popover
          placement="bottom"
          title="昵称"
          :width="200"
          trigger="hover"
          content="个人信息，修改密码，退出登录"
        >
        <template #reference>
          <el-icon><User /></el-icon>
        </template>
        </el-popover>
      </div>
    </el-col>
    </el-row>
  </el-header>
  <el-main>
    <router-view/>
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
        drawer: false,
      }
    },

    methods: {
      displayDrawer() {
        this.drawer = true;
      },
      undisplayDrawer() {
        this.drawer = false;
      },
    }
}
</script>
