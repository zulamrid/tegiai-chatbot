import logo from './logo.svg';
import './App.css';
import React from 'react';
import { FaPlay, FaMicrophone } from "react-icons/fa";




function App() {

  const [isTalk, setIsTalk] = React.useState(false)
  const [words, setWords] = React.useState('')

  const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  const recog = new SpeechRecognition()

  const start = () => {
    recog.start()
  }

  recog.onstart = function () {
    console.log("Voice is activated")
    setIsTalk(true)
  }

  recog.onresult = function (event) {

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
      {/* <button className="btn" onClick={start}  disabled = {isTalk} ><BiMicrophone size={60} color="white" /></button>
      <h3 style={{ color:'#636e72' }}> {isTalk ? "Talking..." : "Click button above to talk"} </h3>
      <h2>{words}</h2> */}
      <div className="chat-box">
        akaka
      </div>
      <div className="text-box">
        <div className="rec-container">
          <FaMicrophone size={25} color="red" onClick={start} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Input your message here" />
        </div>
        <div className="button-container">
          <button><FaPlay size={15} color="white" /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
