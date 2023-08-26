import { post, get} from './api';

export function createProject(name,creator_id,introduction){
	var data=new FormData();
	data.append("name",name);
	data.append("creator_id",creator_id);
	data.append("introduction",introduction);
	return post('/api/project/create/',data);
}

export function deleteProject(project_id){
	var data=new FormData();
	data.append("project_id",project_id);
	return post('/api/project/delete/',data);
}

export function updateProject(project_id,name,introduction){
	var data=new FormData();
	data.append("project_id",project_id);
	data.append("name",name);
	data.append("introduction",introduction);
	return post('/api/project/update/',data);
}

