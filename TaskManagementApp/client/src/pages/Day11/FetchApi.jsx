import React, { useEffect, useState } from 'react'

const FetchApi = () => {

const [data,setData]=useState([])

const [filter,setFilter]=useState("all")







    const FetchData= async()=>{

        const recipes=await fetch('https://dummyjson.com/recipes')
        const res=await recipes.json()

        console.log(res)
        setData(res.recipes)




    }


useEffect(()=>{


    (async()=>{

        FetchData()
    })();
},[])

const filteredData=data.filter((e)=>{


    if(filter!=='classic') return true

    const name=e.name.toLowerCase()
    const word="classic"

    for(let i=0;i<word.length;i++){
        if(name[i]!==word[i])

            return false
    }
    return true
})

//   const filteredData = data.filter((e) => {
//     if (filter !== "classic") return true

//     const name = e.name.toLowerCase()
//     const word = "classic"

//     for (let i = 0; i < word.length; i++) {
//       if (name[i] !== word[i]) return false
//     }

//     return true
//   })



  return (
 <>


 <div className='white flex justify-between items-center p-5 '>

<div className='text-2xl font-bold'>
    RECIPES
</div>

<div>
<button onClick={()=>setFilter("all")} className="bg-white px-3 py-1"> all</button>
<button onClick={()=>setFilter("classic")} className="bg-white px-3 py-1"> Classic</button>

</div>


</div>




<div className='flex flex-wrap justify-center gap-7 p-10 bg-gray-100'>


  {filteredData.map((e, i) => (
    <div 
      key={i} 
      className='bg-white rounded-xl  flex flex-col items-center p-6 w-72 gap-4'>
<img  src={e.image} 
     className='w-full h-40 rounded-lg object-cover'
      />
      <h1 className='font-semibold text-lg text-center'> {e.name}</h1>
  <p className='text-xs text-gray-600 text-center'>
        {e.ingredients.slice(0,5).join(", ")}...
      </p>
<button  className='bg-green-500 text-white px-4 py-2 rounded-lg'> View Recipe </button>
    </div>


  ))}

</div>


 
 </>
  )
}

export default FetchApi
