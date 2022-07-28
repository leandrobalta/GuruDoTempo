import {FiSearch } from "react-icons/fi"
import "./style.css"
import React, { useState } from "react"
import api from "./apiservices/weatherApi"

function App() {

  const [input, setInput] = useState('');
  const [infoinput, setinfoinput] = useState();
  const [condition, setcondition] = useState();
  const [wordtranslated, setwordtranslated] = useState();

  async function Search(){

    console.log("Pt-Br: Na primeira busca de cidade, a descrição geral irá ficar indefinida por erro da request API, porém as demais funcionaram normalmente")
    console.log("En: In the first city search, the general description will be undefined due to an API request error, but the others worked normally")

    if (input === ''){
      alert("Digite alguma Localização :/")
      console.log("The input location is null")
      return;
    }

    try{
      const response = await api.get(`${input}`);
      console.log("[Response Log] ->", response)
      setinfoinput(response.data)
      setcondition(response.data.current.condition.text);

      TranslateFromEnToPt(condition);

      setInput('')
    }
    catch{
      alert("Error with searching...")
      console.log("Error requesting the API")
      setInput('')
    }
  } 

  async function TranslateFromEnToPt(word){

    const url = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'fae4be3267msh5f827c29c91e5a5p13cf13jsn8300a8898851',
        'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
      },
      body: JSON.stringify({from: "en", to: "pt", e: "", q: `${word}`})
};

    fetch(url, options)
       .then(res => res.json())
       .then(json => setwordtranslated(json))
       .catch(err => console.error('error:' + err)); 

    console.log(wordtranslated);
    
        }
     
  return (
    <div className="App">
      <h1 className="title">Guru do Tempo</h1>
      <div className="AppInput">
        <input
        type = "text"
        placeholder = "Digite sua Cidade..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <button onClick={Search}>
         <FiSearch size={20} color="#000"/>
        </button>
      </div>
      {
        infoinput ?  
        <main className="main">
        <h1>Cidade: {infoinput.location.name} - {infoinput.location.country}</h1>
        <span>Descrição Geral:  {condition.text} - {wordtranslated}</span>
        <span>Temperatura: {infoinput.current.temp_c}° Celsius</span>
        <span>Sensação Térmica: {infoinput.current.feelslike_c}° Celsius</span>
        <span>Umidade: {infoinput.current.humidity}% do ar</span>
        </main> : <React.Fragment/>
      }
    </div>
  );

}
export default App;