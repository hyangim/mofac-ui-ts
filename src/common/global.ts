export const sections = [
    { title: '주간예보', url: '/' , icon: 'RestoreIcon'},
    { title: '시도별', url: '/CityAirInfo', icon: 'ApartmentIcon' },
    { title: '측정소별', url: '/StationAirInfo' , icon: 'LocationOnIcon'},
    { title: 'Business', url: '/pageC' , icon: 'AcUnitIcon'},
  ];

  export const GRADE_TYPE = {
    1: "좋음",
    2: "보통",
    3: "나쁨",
    4: "매우나쁨",
  } as const;
  
  type GRADE_TYPE = typeof GRADE_TYPE[keyof typeof GRADE_TYPE];