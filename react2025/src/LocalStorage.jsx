import React, { useEffect, useState, useRef } from 'react'
function LocalStorage() {
  const inputRef = useRef(null)
  const [name,setName] = useState(() => {
    const savedName = localStorage.getItem("name");
    return savedName ? JSON.parse(savedName) : [];
  }
  );
  
  useEffect(() => {
      localStorage.setItem("name", JSON.stringify(name)); 
  }, [name]);
  const handleSubmit = () => {
    if (inputRef.current.value) {
      setName([...name, inputRef.current.value]);
      inputRef.current.value = '';
    } else {
      alert("Please enter a name");
    }
  }
  const deleteUser = (NAME) => {
    const newNames = name.filter((index) => {
      return NAME !== index;
    });
    setName(newNames);
  }
  return (
    <>
    <input  ref={inputRef}/>
    <button onClick={handleSubmit}>add</button>
    <button onClick={()=> {localStorage.removeItem('name')
                           setName([])
                           }}>delete all </button>
    {
      name.map((student,index) =>{
      return( 
      <>
      <h1 key={index} className='text-gray-50'>Name: {student}</h1>
      <button onClick={()=>deleteUser(student)}>remove</button>
      </>
      )
      })
    } 
    </>
  )
}

export default LocalStorage