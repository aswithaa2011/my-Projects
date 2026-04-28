import React, { useRef } from 'react'

const SearchForm = () => {


    const searchref=useRef(null)
    const showref=useRef(null)
    
    const handleclick=()=>{

showref.current.innerText = searchref.current.value
        alert(searchref.current.value)
    }




  return (
 <>
 <input 
          ref={searchref}
          type="text" 
          className='bg-white text-black p-2 rounded-md w-full'
          placeholder='Enter name'
        />
   <button 
          onClick={handleclick} 
          className='bg-green-500 text-white px-4 py-2 rounded-xl'
        >
          Show Data
        </button>

        <p ref={showref}></p>

 </>
  )
}

export default SearchForm
