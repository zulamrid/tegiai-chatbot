import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BiMicrophone } from "react-icons/bi";




function App() {

  const [isTalk, setIsTalk] = React.useState(false)
  const [words, setWords] = React.useState('')

  const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  const recog = new SpeechRecognition()

  const start = () => {
    recog.start()
  }

  recog.onstart = function(){
    console.log("Voice is activated")
    setIsTalk(true)
  }

  recog.onresult = function(event){

    const current = event.resultIndex;
    const message = event.results[current][0].transcript
    setWords(message)
    readIttLoud(message)
    setIsTalk(false)

  }

  const readIttLoud = (message) => {

    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech)
  }


  return (
    <div className="container">
      <button className="btn" onClick={start} style={{ backgroundColor: isTalk ? '#ddd' : '#d63031'  }}  disabled = {isTalk} ><BiMicrophone size={60} color="white" /></button>
      <h3 style={{ color:'#636e72' }}> {isTalk ? "Talking..." : "Click button above to talk"} </h3>
      <h2>{words}</h2>
    </div>
  );
}

export default App;
