import React, { useRef } from 'react'

const FeedbackForm = () => {

  const inputRef = useRef(null)
  const textareaRef = useRef(null)
  const showref = useRef(null)

  const handleclick = () => {

    const name = inputRef.current.value
    const feedback = textareaRef.current.value

  
    showref.current.innerText = 
      `Name: ${name} Feedback: ${feedback}`

   inputRef.current.value = ""
textareaRef.current.value = ""
  }

  return (
    <>
      <div className='bg-gray-200 flex flex-col gap-3 w-80 m-5 justify-center items-center p-5 rounded-2xl'>
        
        <input 
          ref={inputRef}
          type="text" 
          className='bg-white text-black p-2 rounded-md w-full'
          placeholder='Enter name'
        />

        <textarea 
          ref={textareaRef}
          className='bg-white text-black p-2 rounded-md w-full'
          placeholder="Write feedback"
        />

        <button 
          onClick={handleclick} 
          className='bg-green-500 text-white px-4 py-2 rounded-xl'
        >
          Show Data
        </button>

      </div>

      <p ref={showref} className="ml-5"></p>
    </>
  )
}

export default FeedbackForm