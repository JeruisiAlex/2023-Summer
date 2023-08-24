import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    token: '',
    userName: '',
    userImage: '',
    hasMessage: false,
  },
  getters: {

  },
  mutations: {
    Logout(state){
      isLogin=false;
      token='';
      userName='';
      userImage='';
      hasMessage=false;
    },
    Login(state,token){
      var s=token.split('.',2);
      isLogin=true;
    },
  },
  actions: {

  },
  modules: {

  },

})
