import React, { useState } from 'react'

const Task2 = () => {

  const [list,setList]=useState({product:"",price:""})

  const [saveData,setSaveData]=useState([])


     const handleChange=(e)=>{

      setList({...list,[e.target.name]:e.target.value})
     }
  

     const   handleClick=(e)=>{

      e.preventDefault()

      setSaveData(list)





     }


  return (
   <>
  

<div className='flex flex-col gap-10'>
  <form action="" onSubmit={handleClick}>

    <div className='flex flex-col gap-6 m-2 w-60'>
  <input type="text"
   name="product"
    value={list.product}
     onChange={handleChange}
     placeholder='Enter the product name'
     className="border-2 rounded gap-10 border-amber-300 p-3 "/>


    <input type="number" 
    name="price"  
    value={list.price} 
    onChange={handleChange}
      placeholder='Enter the price'
    className="border-2 rounded gap-10 border-amber-300 p-3 "/>


   </div>
    <input type="submit"  className="bg-amber-300 text-white p-2 rounded m-5" />

   </form>

   <h1>{saveData.product}</h1>
   <h1>{saveData.price}</h1>

   </div>
   </>
  )
}

export default Task2
