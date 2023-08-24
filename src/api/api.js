import axios from 'axios'


export async function post(url,data){
    var getdata='';
    await axios.post('http://8.130.25.189'+url,data).then(response=>{postdata=response.data});
    return postdata;
}

export async function get(url){
    var postdata='';
    await axios.get('http://8.130.25.189'+url).then(response=>{getdata=response.data});
    return getdata;
}