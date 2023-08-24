import { post, get} from './api';

export async function userRister(username,password_1,password_2,email,vcode){
    var data=new FormData();
    data.append("username",username);
    data.append("password_1",password_1);
    data.append("password_2",password_2);
    data.append("email",email);
    data.append("vcode",vcode);
    return await post('/api/user/register/',data);
}

export async function userLogin(username,password){
    var data=new FormData();
    data.append("username",username);
    data.append("password",password);
    return await post('/api/user/login/',data);
}

export async function sendVCode(email,func){
    var data=new FormData();
    data.append("email",email);
    data.append("func",func);
    return await post('/api/user/send_vcode/',data);
}

export async function findPassword(email,vcode,password_1,password_2){
    var data=new FormData();
    data.append("email",email);
    data.append("vcode",vcode);
    data.append("password_1",password_1);
    data.append("password_2",password_2);
    return await post('/api/user/find_password/',data);
}