import React, { useRef } from 'react'

const CounterApp = () => {

  

  const CountRef=useRef(0)
  const showref=useRef("")

  const HandleClick=()=>{

    CountRef.current+=1
    console.log(CountRef.current)
    showref.current.innerText=CountRef.current
  }
  


  return (
    <div>
    
    <h1 >check console</h1>

    <p ref={showref}>start time</p>

    <button  onClick={HandleClick} className='bg-black rounded-2xl p-2 text-white'>click here</button>
    </div>
  )
}

export default CounterApp
