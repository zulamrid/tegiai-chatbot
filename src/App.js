import logo from './logo.svg';
import './App.css';
import React from 'react';
import { FaPlay, FaMicrophone } from "react-icons/fa";
import axios from 'axios'

function App() {

  React.useEffect(() => {
    axios.post('https://tegiai-gi4coglcca-de.a.run.app/reset')
  }, [])

  const [isTalk, setIsTalk] = React.useState(false)
  const [words, setWords] = React.useState('')
  const [msg, setMsg] = React.useState([])

  const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  const recog = new SpeechRecognition()

  const start = () => {
    recog.start()
  }

  const getBot = (texts) => {
    const text = {
      texts
    }
    axios.post('https://tegiai-gi4coglcca-de.a.run.app/add_input', {
      "text" : texts
    })
    .then(res => {
      let lastIndex = res.data.messages.length - 1
      msg.push(res.data.messages[lastIndex])
      readIttLoud(res.data.messages[lastIndex].text)
      console.log(lastIndex)
    })
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
    msg.push({'is_user': true, "text": message})
    getBot(message)
      setWords('')
  }

  const reset = () => {
    alert("tes")
  }

  const readIttLoud = (message) => {

    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech)
  }

  const sendquestion = () => {
    console.log(msg)
    msg.push({'is_user': true, "text": words})
    getBot(words)
    setWords('')
  }


  return (
    <div className="container">
      {/* <button className="btn" onClick={start}  disabled = {isTalk} ><BiMicrophone size={60} color="white" /></button>
      <h3 style={{ color:'#636e72' }}> {isTalk ? "Talking..." : "Click button above to talk"} </h3>
      <h2>{words}</h2> */}
      <div className="chat-box">
        <div className="ballon-container">

          {msg.length === 0 ?
            "No Message"
            :
            msg.map((v, i) => 
              v.is_user ?
              <div className="ballon ">
                <div className="ballon-ava-left">

                </div>
                <div className="ballon-text-left">
                  <span>{v.text}</span>
                </div>
              </div>
              :
              <div className="ballon">

                <div className="ballon-text-right">
                  <span>{v.text}</span>
                </div>
                <div className="ballon-ava-right">

                </div>
              </div>

            
            )
          }

        </div>
      </div>
      <div className="text-box">
        <div className="rec-container">
          <FaMicrophone size={25} color="red" onClick={start} />
        </div>
        <div className="input-container">
          <input type="text" value={words} placeholder="Input your message here" onChange={(e) => setWords(e.target.value)} />
        </div>
        <div className="button-container">
          <button onClick={sendquestion}><FaPlay size={15} color="white" /></button>
        </div>
      </div>
    </div>

  );
}

export default App;
