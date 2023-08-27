import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    token: '',
    uid: 0,
    userName: '',
    userImage: '',
    hasMessage: false,
    notificationUnread: [],
    notificationRead: [],
  },
  getters: {

  },
  mutations: {
    Logout(state){
      state.isLogin=false;
      state.token='';
      state.uid=0;
      state.userName='';
      state.userImage='';
      state.hasMessage=false;
    },
    Login(state,token){
      var s=token.split('.');
      if(s[1].lenth%4!=0){
        var lenth=s[1].lenth%4;
        for(;lenth<4;lenth++){
          s[1]=s[1]+'=';
        }
        console.log(s[1]);
      }
      var message=JSON.parse(atob(s[1]));
      console.log(message);
      state.uid=message.id;
      state.userName=message.username;
      state.isLogin=true;
    },
    addNotificationUnread(state,data) {
      state.notificationUnread.unshift({ //对象数组
        id: data.id,
        t: data.type,
        b: data.by,
        f: data.forthing,
        c: data.content,
      });
    },
    addNotificationReadDirect(state,data) {
      state.notificationRead.unshift({ //对象数组
        id: data.id,
        t: data.type,
        b: data.by,
        f: data.forthing,
        c: data.content,
      });
    },
    addNotificationRead(state,id) {
      state.notificationUnread.some(function (value) {
        if (value.id === id) {
          state.notificationRead.push(value);
          state.notificationUnread.splice(state.notificationUnread.indexOf(value),1);
          return true;
        }
      });
    },
    deleteNotification(state,id) {
      var fromRead = false;
        state.notificationRead.some(function (value) {
          if (value.id === id) {
            state.notificationRead.splice(state.notificationRead.indexOf(value),1);
            fromRead = true;
            return true;
          }
        });
        if (fromRead === false)
          state.notificationUnread.some(function (value) {
            if (value.id === id) {
              state.notificationUnread.splice(state.notificationUnread.indexOf(value),1);
              return true;
            }
        });
    },
    setAllNotificationRead(state) {
      state.notificationUnread.some(function (value) {
          state.notificationRead.push(value);
      });
      state.notificationUnread=[];
    },
    deleteAllNotificationRead(state) {
      state.notificationRead=[];
    }
  },
  actions: {

  },
  modules: {

  },

})
