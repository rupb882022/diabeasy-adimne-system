import {Axios} from './Axios'

export const  Get_all_food=(name)=>{
  return Axios(`Food/${name}/all/-1`,'Get');
}

export const  Get_all_categories=()=>{
  return Axios(`Food/Category`,'Get');
}
export const  Get_all_unit=()=>{
  return Axios(`Food/getUnitOfMeasure`,'Get');
}
export const  Get_all_comments=()=>{
  return Axios(`forum`,'Get');
}
export const  Get_admin_details=()=>{
  return Axios(`User/admin_details`,'Get');
}
export const  Delete_Comment=(comment_id)=>{
  return Axios(`forum/Delete/${comment_id}`,'Delete');
}
export const  Delete_food=(name,id)=>{
  return Axios(`Food/delete${name}/${id}`,'Delete');
}
export const  addCategory=(categoryName,categoryId,body)=>{
  return Axios(`Food/addCategory/${categoryName}/${categoryId}`,'Put',body);
}
export const  deleteCategory=(categoryId,body)=>{
  return Axios(`Food/deleteCategory/${categoryId}`,'Delete',body);
}
export const  checkAdmin=(userName,password)=>{
  return Axios(`User/checkAdmin/${userName}/${password}`,'Get');
}
export const  getReports=()=>{
  return Axios(`User/alert/-1`,'Get');
}