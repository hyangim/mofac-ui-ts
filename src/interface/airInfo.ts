export interface IStaionAirInfo{
  id:number,
  so2Grade: number,
  so2Value:string,
  coGrade: number,
  coValue:string,
  o3Grade: number,
  o3Value:string,
  no2Grade:number,
  no2Value:string, 
  pm10Grade:number,
  pm10Value:string, 
  pm25Grade:number,
  pm25Value:string,
  dataTime: string,
}

export interface ICityAirInfo extends IStaionAirInfo{
  sidoName:string,
  stationName:string,
}