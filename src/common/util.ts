import { isNullishCoalesce } from 'typescript';
import {GRADE_TYPE} from '../common/global';

export const gradeClasType = (grade:string, gbn:string) => {
    switch (parseInt(grade)) {
      case 1:
        return gbn===null?GRADE_TYPE[1] : gbn+GRADE_TYPE[1];
      case 2:
        return gbn===null?GRADE_TYPE[2] : gbn+GRADE_TYPE[2];
      case 3:
        return gbn===null?GRADE_TYPE[3] : gbn+GRADE_TYPE[3];
      case 4:
        return gbn===null?GRADE_TYPE[4] : gbn+GRADE_TYPE[4];
      default:
        return "";
    }
 };


 export const nvl = (value:string) => {
  if(value !== null && value !== undefined) {
    return value;
  } else {
    return '-';
  }
};

export const getToday = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth()+1;
  let day = now.getDate();
  if(month<10){
    return year + '-' + 0+month + '-' + day;  
  }else{
    return year + '-' + month + '-' + day;  
  }
  
};