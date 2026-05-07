import { useMemo, useState } from "react";



const FilterSearch = () => {

    const [namelist,setNameList]=useState([])
    const [input,setInput]=useState("")


    const Searchname=useMemo(()=>{

        const names=[]

for(let i=1;i<=5000;i++){

    names.push(`user_${i}`)

}

  return names

    },[])




  const handleClick=()=>{

    setNameList(Searchname)
  }
  
  const handlechange=(e)=>{
    setInput(e.target.value)

  }

  const filterdata=namelist.filter((f)=>f.toLowerCase().includes(input.toLowerCase()))

  return (
    <div>


        <div className="flex justify-between items-center p-1">
      
      <button onClick={handleClick} 
      className="bg-black rounded-2xl p-3 m-3 text-white justify-center text-left items-center ">
        Click to show names</button>

        <input type="text" className="border-2 rounded-xl h-10 w-60 " onChange={handlechange}  placeholder="Search"/>

        </div>

<div className="bg-black m-3 p-3 rounded-lg overflow-y-auto">
  <div className="flex flex-wrap gap-2 justify-start">
    {filterdata.map((e, i) => (
      <span
        key={i}
        className="text-white bg-gray-800 px-3 py-1 rounded-md text-sm"
      >
        {e}
      </span>
    ))}
  </div>
</div>

    </div>
  )
}

export default FilterSearch
