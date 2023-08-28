import { post, get} from './api';

export function createText(name,introduction,content,project_id){
	var data=new FormData();
	data.append("name",name);
	data.append("introduction",introduction);
	data.append("content",content);
	data.append("project_id",project_id);
	return post('/api/text/create/',data);
}

export function deleteText(text_id){
	var data=new FormData();
	data.append("text_id",text_id);
	return post('/api/text/delete/',data);
}

export function getAText(text_id,project_id){
	return get('/api/text/gettext/?text_id='+text_id+'&project_id='+project_id);
}

export function getAllText(project_id){
	return get('/api/text/gettexts/?project_id='+project_id);
}

export function saveText(text_id,project_id,content){
	var data=new FormData();
	data.append("text_id",text_id);
	data.append("project_id",project_id);
	data.append("content",content);
	return post('/api/text/save/',data);
}
