import React, { useState } from 'react'

const CRUD = () => {

    const [formData,setFormData]=useState({id:null,name:"",email:""})
    const [saveData,setSaveData]=useState([])




    const HandleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }

    const HandleAdd=(e)=>{
        e.preventDefault()
      

        const USers={...formData,
            id:Date.now()}

            const addUsers=[...saveData,USers]

            setSaveData(addUsers)

            localStorage.setItem("Register",JSON.stringify(addUsers))



    }


  return (
   <>
      <form>
  <div className=" flex justify-center items-center  min-h-screen"> 

    <div className='flex flex-col w-80 gap-2'>
    <input type="text"
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              placeholder='Enter the Name'
              name="name"
                onChange={HandleChange}
 />
        <input type="text"
                  className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                  name="email"
                  placeholder='Enter Email id'
                  onChange={HandleChange}

 />

<button  className='bg-black rounded-xl text-white p-2'
onClick={HandleAdd}
>Submit</button>

   </div>

</div>
   </form>

<table className="w-full mt-10 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
  <thead className="bg-black text-white">
    <tr>
      <th className="p-3 border">S.no</th>
      <th className="p-3 border">Name</th>
      <th className="p-3 border">Email</th>
    </tr>
  </thead>

  <tbody className="bg-white">
    <tr>
      <td colSpan="3" className="p-3">
        <div className="flex flex-col gap-2">
          {saveData.map((e, i) => (
            <div
              key={e.id}
              className="grid grid-cols-3 text-center bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition"
            >
              <span>{i + 1}</span>
              <span>{e.name}</span>
              <span>{e.email}</span>
            </div>
          ))}
        </div>
      </td>
    </tr>
  </tbody>
</table>


   </>
  )
}

export default CRUD

// /
// 4 button = red 
// geenr = greewn 
// blue 

