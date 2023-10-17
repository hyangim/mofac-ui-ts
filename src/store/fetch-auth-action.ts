import axios, { AxiosError,AxiosResponse }  from 'axios';

type ServerError = { status:number, message: string };
type LoginFailType = { status: number, error: string,};

interface FetchData {
  method: string,
  url: string,
  data? : {},
  header : {},
}

const fetchAuth = async (fetchData: FetchData) => {
  const method = fetchData.method;
  const url = '/mofacApi'+fetchData.url;
  const data = fetchData.data;
  const header = fetchData.header;
  
  try {
    const response:AxiosResponse<any, any> | false =
    (method === 'get' && (await axios.get(url, header))) ||
    (method === 'post' && (await axios.post(url, data, header))) ||
    (method === 'put' && (await axios.put(url, data, header))) ||
    (method === 'delete' && (await axios.delete(url, header))
    );
    if(response && response.data.error) {
      console.log((response.data as LoginFailType).error);
      alert("Wrong ID or Password");
      return null;
    }

    if (!response) {
      alert("false!");
      return null;
    }

    return response;

  } catch(err) {
    
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>;
      const response = serverError.response as AxiosResponse<any, any>;
      if(response.status===401){
        alert(response.status);
        return null;
      }else if (serverError && serverError.response) {
        console.log(serverError.response);
        // alert("failed!"+JSON.stringify(serverError.response.data.message));        
        alert("failed!"+serverError.response.data.message);
        return null;
      }
    }

    console.log(err);
    alert("failed!");
    return null;
  }
  
}

const GET = ( url:string, header:{} ) => {
  const response = fetchAuth({ method: 'get', url, header });
  return response;
};

const POST = ( url:string, data: {}, header:{}) => {
  const response = fetchAuth({ method: 'post', url, data, header })
  return response;
};

const PUT = async ( url:string, data: {}, header:{}) => {
  const response = fetchAuth({ method: 'put', url, data, header });
  return response;
};

const DELETE = async ( url:string, header:{} ) => {
  const response = fetchAuth({ method: 'delete', url, header });
  return response;
};

export { GET, POST, PUT, DELETE }