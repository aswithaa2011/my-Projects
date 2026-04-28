import React, { useReducer } from 'react'


    const initvalue="black"

    const reducer=(state,action)=>{

        if(action.type==="blue"){
            return {initvalue:action.type}
        }
        if(action.type==="yellow"){
            return {initvalue:action.type}

        }
        if(action.type==="red"){
            return{initvalue:action.type}
        }

        if(action.type==="green"){
            return{initvalue:action.type}
        }


    }

    
    const Changetype = () => {
         const [state,dispatch]=useReducer(reducer,initvalue)
  return (

    <>
    
    <button onClick={()=>dispatch({type:"blue"})}
    className='bg-black  text-white p-2 m-2 rounded w-20'    >
            blue</button>
        <button onClick={()=>dispatch({type:"green"})}
              className='bg-black text-white p-2 m-2 rounded w-20' >green</button>
    <button onClick={()=>dispatch({type:"yellow"})}
          className='bg-black text-white p-2 m-2 rounded w-20' >yellow</button>
    <button onClick={()=>dispatch({type:"red"})}
          className='bg-black text-white p-2 m-2 rounded w-20' >red</button>

    <div style={{color:state.initvalue}  }>
        
       <p className='font-bold p-2 text-2xl'> REACT</p>

    </div>

    
    </>
  )
    }
    
    export default Changetype
    
