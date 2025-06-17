import React, { useCallback, useEffect, useState } from 'react';
function Data() {
  const [imageUrl, setImageUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [ans, setAns] = useState('');
  const [options, setOptions] = useState([]); 
  useEffect(() => {
    fetch('https://v3.football.api-sports.io/players?league=39&season=2023', {
      method: 'GET',
      headers: {
        'x-apisports-key': 'ed25920c960dba1882cec645b79157df',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    })
      .then(res => {
        if (!res.ok) {
          console.log('Error:', res.status, res.statusText);
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setImageUrl(data.response[1].player.photo);
        setData(data.response);
        console.log(data.response);
        const index = Math.floor(Math.random() * data.response.length); 
        options[Math.floor(Math.random()*4)] = data.response[index].player.name;
        for(let i=0; i<4; i++){
          const randomIndex = Math.floor(Math.random() * data.response.length)
          if(options[i] !== data.response[index].player.name)
          setOptions(prevOptions => [...prevOptions, data.response[randomIndex].player.name]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  // const change = useCallback(() => {
  //       const index = Math.floor(Math.random() * data.length);
  //       setImageUrl(data[index].player.photo);
  //       setAns(data[index].player.name);
  //       options[Math.floor(Math.random() * 4)] = data[index].player.name;
  //       for(let i=0; i<3; i++){
  //         const randomIndex = Math.floor(Math.random() * data.length);
  //         if(options[i] !== data[randomIndex].player.name)
  //         setOptions(prevOptions => [...prevOptions, data[randomIndex].player.name]);
  //       }
  // },[data])
  return(
  <div className="h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <img
        className="w-20 h-20 rounded-full"
        src={imageUrl}
        alt="Player"
      />
      <button>{options[0]}</button>
      <button>{options[1]}</button>
      <button>{options[2]}</button>
      <button>{options[4]}</button>
    </div>
  </div>
);
}

export default Data;
