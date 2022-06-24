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