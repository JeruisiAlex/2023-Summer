import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    token: '',
    uid: 0,
    userName: '',
    userImage: '',
    hasMessage: false,
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
  },
  actions: {

  },
  modules: {

  },

})
