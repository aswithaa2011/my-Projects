import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"

const ProviderContext = ({children}) => {

 const [datas,setDatas] = useState(false)

const getData = () => {
  const dataget = localStorage.getItem("auth");

  if (!dataget) {
    setDatas({ status: false }); 
    return;
  }

  const changeData = JSON.parse(dataget);
  setDatas(changeData);
};

useEffect(()=>{
    (async ()=>{
        getData()
    })()
},[])


  return (
   <>
   <AuthContext.Provider value={{ datas, setDatas }}>
  {children}
   </AuthContext.Provider>
   </>
  )
}

export default ProviderContext
