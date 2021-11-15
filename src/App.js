import React, { useState } from 'react';
import fetchItem from './actions/fetchItem';
import './App.css';
import Menu from './components/Menu';
import NotFound from './components/NotFound';
import Result from './components/Result';

function App() {
  const [ resultProps, setResultProps ] = useState({
    titulo: '', 
    estadisticas : []
  });

  const [ isFound, setIsFound ] = useState(true);

  const onChange = (e) =>{
    const form =e.target.closest('form');
    const formData =new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) data[key] = value;
    console.log({ data });
    return `${data.grupo}${data.id}`
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const url = onChange(e );
      const arr = await fetchItem(url);
      const [[,titulo]] = arr;
      setResultProps({titulo, estadisticas: arr.slice(1)})
    } catch {
      setIsFound(false)
    }
  }
  
  return (
    <>
    <form onChange={onChange} onSubmit={onSubmit}>
      <Menu />
      <label htmlFor="input-id">ID: </label>
      <input id="input-id" name="id" type="number"></input>
      <input type="submit" value="Search"/>
    </form>
    {isFound ? <Result {...resultProps}/> : <NotFound/>}
    </>
  );
}

export default App;