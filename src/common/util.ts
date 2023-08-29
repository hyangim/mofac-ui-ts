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