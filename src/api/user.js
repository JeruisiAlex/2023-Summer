import { post, get} from './api';

export function userRister(username,password_1,password_2,email,vcode){
    var data=new FormData();
    data.append("username",username);
    data.append("password_1",password_1);
    data.append("password_2",password_2);
    data.append("email",email);
    data.append("vcode",vcode);
    return post('/api/user/register/',data);
}

export function userLogin(username,password){
    var data=new FormData();
    data.append("username",username);
    data.append("password",password);
    return post('/api/user/login/',data);
}

export function sendVCode(email,func){
    var data=new FormData();
    data.append("email",email);
    data.append("func",func);
    return post('/api/user/send_vcode/',data);
}

export function findPassword(email,vcode,password_1,password_2){
    var data=new FormData();
    data.append("email",email);
    data.append("vcode",vcode);
    data.append("password_1",password_1);
    data.append("password_2",password_2);
    return post('/api/user/find_password/',data);
}