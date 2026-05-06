import React, { useState } from 'react'

const Task1 = () => {
    const [Data,setData]=useState({username:"",age:"",email:""})
    const [showdata,setShowData]=useState([])


    const HandleChange=(e)=>{

        setData({...Data,[e.target.name]:e.target.value})
        

    }
   

    const HandleSubmit=(e)=>{
        e.preventDefault()

        
        setShowData(Data)

        console.log(Data);
        



        
        
    }

  return (
    <>
    
   

<h1 className="text-xl p-3      ">Form Rendering using useState()</h1>
    <div>

        <form action=""  onSubmit={HandleSubmit}>

            <div className="flex flex-col ">

        <input
         type="text"  name="username" 
         placeholder="Enter ur Name" 
         value={Data.username} 
         onChange={HandleChange} 
         className="border w-50 m-2"
         
         />


         <input type="number" 
          name="age"
           placeholder="Enter ur age" 
            value={Data.age} 
         onChange={HandleChange}
            className="border w-50 m-2" /> 


           <input type="email"  
           name="email"
            placeholder="Enter ur email"  
            value={Data.email}
              onChange={HandleChange} 
                className="border w-50 m-2" /> 

           </div>
        
    <input type="submit"  className="bg-black text-white p-2 rounded m-5" />


         

     </form>
   



     <h1>{showdata.username}</h1>
      <h1>{showdata.age}</h1>
     <h1>{showdata.email}</h1>

    </div>
    
    </>
  )
}


export default Task1
