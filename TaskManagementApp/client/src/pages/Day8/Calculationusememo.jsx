import React, { useMemo, useState } from 'react'

const Calculationusememo = () => {

const [theme,setTheme]=useState(false)

const [number,setNumber]=useState(0)
const handleclick=()=>{

setTheme(!theme)


}

// const expensiveFunction=(number)=>{

//     let sum=0;
//     for(let i=1;i<=number;i++){
//         sum+=i

//     }
//     return sum
// }


const handleChange=(e)=>{

    setNumber(Number(e.target.value))
}

// const sumofnumber=expensiveFunction(number)

const sumofnumber=useMemo(()=>{

        let sum=0;
    for(let i=1;i<=number;i++){
        sum+=i
        console.log(sum);
        

    }
    return sum
},[number])

  return (
 <>
 

<div className={theme?"bg-amber-300 p-2":"bg-black p-2"}>

 <button  className='bg-green-400 p-2 m-3 rounded-xl' onClick={handleclick}>Theme change</button>




 </div>
 
 <div className='m-2 p-2 ' >

    <p> sum of numbers: {sumofnumber}</p>

    <input type="text" className='bg-black text-white p-2' onChange={handleChange} />
 </div>
 </>
  )
}

export default Calculationusememo;


