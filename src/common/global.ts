export const sections = [
    { title: '홈', url: '/' , icon: 'HouseIcon'},
    { title: '시도별', url: '/CityAirInfo', icon: 'ApartmentIcon' },
    { title: '측정소별', url: '/StationAirInfo' , icon: 'LocationOnIcon'},
    { title: 'Business', url: '/pageC' , icon: 'AcUnitIcon'},
  ];

  export const sidoNames = [
    { idx: 0, sidoName: '서울', sidoValue: '서울'},
    { idx: 0, sidoName: '부산', sidoValue: '부산'},
    { idx: 0, sidoName: '대구', sidoValue: '대구'},
    { idx: 0, sidoName: '인천', sidoValue: '인천'},
    { idx: 0, sidoName: '광주', sidoValue: '광주'},
    { idx: 0, sidoName: '대전', sidoValue: '대전'},
    { idx: 0, sidoName: '울산', sidoValue: '울산'},
    { idx: 0, sidoName: '경기', sidoValue: '경기'},
    { idx: 0, sidoName: '강원', sidoValue: '강원'},
    { idx: 0, sidoName: '충북', sidoValue: '충북'},
    { idx: 0, sidoName: '충남', sidoValue: '충남'},
    { idx: 0, sidoName: '전북', sidoValue: '전북'},
    { idx: 0, sidoName: '전남', sidoValue: '전남'},
    { idx: 0, sidoName: '경북', sidoValue: '경북'},
    { idx: 0, sidoName: '경남', sidoValue: '경남'},
    { idx: 0, sidoName: '제주', sidoValue: '제주'},
    { idx: 0, sidoName: '세종', sidoValue: '세종'},
  ];

  export const GRADE_TYPE = {
    1: "좋음",
    2: "보통",
    3: "나쁨",
    4: "매우나쁨",
  } as const;
  
  type GRADE_TYPE = typeof GRADE_TYPE[keyof typeof GRADE_TYPE];