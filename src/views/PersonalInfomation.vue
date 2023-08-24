<template>
  <div>
    <div style="background-color: #fdf6ec;height: 620px;width: 1500px;">
      <div class="PersonTop">
        <div class="PersonTop_img">
        </div>
        <div class="PersonTop_text">
          <div class="user_text">
            <div class="user_name">
              <span style="font-size: 40px;">pluto</span>
            </div>
            <div>
              <!-- <img src="@/assets/img/V.png" class="user-v-img" /> -->
              <span class="user-v-font">优质媒体作者</span>
            </div>
            <div class="introduction">
              我是一个傻逼
            </div>
          </div>
          <div class="user_num">
            <div style="cursor: pointer;margin-left: 20px;">
              <div class="num_number">123</div>
              <span class="num_text">项目数量</span>
            </div>
            <el-button type="primary" style="margin-left: 20px;" @click="dialogFormVisible = true">编辑信息</el-button>
          </div>
        </div>
      </div>
      <div class="personBottom">
        <div class="nickname">
          <span class="title">
            昵称
          </span>
        </div>
        <div class="realname">
          <span class="title">
            姓名
          </span>
        </div>
        <div class="sex">
          <span class="title">
            性别
          </span>
        </div>
        <div class="email">
          <span class="title">
            邮箱
          </span>
        </div>
        <div class="phone">
          <span class="title">
            电话
          </span>
        </div>
        <div class="year">
          <span class="title">
            签名
          </span>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" title="修改个人信息">
    <el-form :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth">
        <el-input v-model="form.realname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-switch v-model="form.sex" class="mb-2" active-text="男" inactive-text="女" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="签名" :label-width="formLabelWidth">
        <el-input v-model="form.introduction" autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-upload ref="upload" class="upload-demo" action="http://8.130.25.189" :limit="1" :on-exceed="handleExceed"
          :auto-upload="false">
          <template #trigger>
            <el-button type="primary">select file</el-button>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="test">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
import { genFileId } from 'element-plus';
export default {
  name: "PersonalInfomation",
  components: {
  },
  data() {
    return {
      dialogFormVisible: ref(false),
      formLabelWidth: '140px',
      upload: ref(),
      form: reactive({
        nickname: '',
        realname: '',
        sex: ref(true),
        email: '',
        phone: '',
        introduction: '',
      }),
    }
  },
  methods: {
    test() {
      submitUpload()
      dialogFormVisible = false;
      console.log(upload);
    },
    handleExceed: (files) => {
      upload.value.clearFiles();
      const file = files[0];
      file.uid = genFileId();
      upload.value.handleStart(file);
    },
    submitUpload: () => {
      upload.value.submit();
    },
  }
}
</script> 
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.introduction {
  height: 60px;
  width: 420px;
  margin-left: 40px;
  text-align: left;
}

.title {
  height: 50px;
  width: 200px;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-justify: center;
  padding-top: 8px;
}

.nickname {
  height: 50px;
  width: 1000px;
  background-color: white;
  margin-top: -20px;
  position: absolute;
  display: flex;
}

.realname {
  height: 50px;
  width: 1000px;
  margin-top: 30px;
  background-color: #f4f4f5;
  position: absolute;
  display: flex;
}

.sex {
  height: 50px;
  width: 1000px;
  margin-top: 80px;
  background-color: white;
  position: absolute;
  display: flex;
}

.email {
  height: 50px;
  width: 1000px;
  margin-top: 130px;
  background-color: #f4f4f5;
  position: absolute;
  display: flex;
}

.phone {
  height: 50px;
  width: 1000px;
  margin-top: 180px;
  background-color: white;
  position: absolute;
  display: flex;
}

.year {
  height: 50px;
  width: 1000px;
  margin-top: 230px;
  background-color: #f4f4f5;
  position: absolute;
  display: flex;
}

.personBottom {
  width: 1000px;
  height: 200px;
  background-color: white;
  margin-top: 270px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.PersonTop {
  width: 1000px;
  height: 140px;
  padding-top: 20px;
  background-color: white;
  margin-top: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
}

.PersonTop_img {
  width: 150px;
  height: 120px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
}

.user_name {
  font-weight: bold;
}

.user-v {
  margin-bottom: -5px;
}

.user-v-img {
  width: 15px;
  height: 15px;
}

.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}

.user_qianming {
  font-size: 14px;
  color: #999;
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num>div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}

.el-menu-item>span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1000px;
  margin-top: 210px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.person_body_left {
  width: 27%;
  height: 600px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(left,
      rgb(42, 134, 141),
      #e9e625dc 20%,
      #3498db 40%,
      #e74c3c 60%,
      #09ff009a 80%,
      rgba(82, 196, 204, 0.281) 100%);
  /* -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite; */
}
</style>
