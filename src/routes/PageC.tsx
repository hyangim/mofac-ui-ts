import React,{useState} from 'react';
import axios from 'axios';
import xml2js from 'xml2js';


const fetchtempData  =  async(name:string) => {
  // const [xmlData, setXmlData] = useState({});
  const baseUrl = "http://apis.data.go.kr"
  const url = baseUrl+"/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=%EC%84%9C%EC%9A%B8&pageNo=1&numOfRows=100&returnType=xml&serviceKey=LFz9dGOoxURk2A8NOdddde%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&ver=1.0"
  // const url = baseUrl+"/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=%EC%84%9C%EC%9A%B8&pageNo=1&numOfRows=100&returnType=xml&serviceKey=LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&ver=1.0"
  try{
    const res = await axios.get(url);  
    // return res.data.response.body.items;
    
    let parser = new xml2js.Parser();
    debugger;
    parser.parseString(res.data,
      function (err, result) {
        console.log('result : '+result);
        if (result.response.header[0].resultCode==='00' && result.response.body[0].items[0].item) {
          return result;
        }
        return err;
      }
    );      
    // parser.parseString(
    //   `<email>
    //      <to>Test</to>
    //      <from>Test1</from>
    //      <heading>Test email</heading>
    //      <body>Email regards to xml data parsing in React</body>
    //      </email>`,
    //   function (err, result) {
    //     console.log('result : '+result);
    //     if (result) {
    //       return result;
    //     }
    //     return err;
    //   }
    // );      

    debugger;
    // console.log(res.data.response.body.items);
    // return res.data.response.body.items;
  }catch(error){
    console.log(error);
    return error;
  }
}

function PageC() {

  const xmlData = fetchtempData('dd');  
  // const fetchtempData  = async (name:string) => {

  return (
    <div>
      Parse XML using ReactJs
      {JSON.stringify(xmlData)}
    </div>
  );
  const data = fetchtempData("서울");
  // console.log(data);
  //   return (
  //     <div>
  //           <li>This is page PageC</li>
  //     </div>
  //   );
  
  }
  
  export default PageC;