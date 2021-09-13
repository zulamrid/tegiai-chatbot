import './App.css';
import { Provider } from 'react-redux';

import Store from './store/createStore';
import RootApp from './components/RootApp';

function App() {

  // React.useEffect(() => {
  //   axios.post('https://tegiai-gi4coglcca-de.a.run.app/reset')
  // }, [])

  // const [isTalk, setIsTalk] = React.useState(false)
  
  // const [msg, setMsg] = React.useState([])

 

  
  // const getBot = (texts) => {
  //   const text = {
  //     texts
  //   }
  //   axios.post('https://tegiai-gi4coglcca-de.a.run.app/add_input', {
  //     "text" : texts
  //   })
  //   .then(res => {
  //     let lastIndex = res.data.messages.length - 1
  //     msg.push(res.data.messages[lastIndex])
  //     readIttLoud(res.data.messages[lastIndex].text)
  //     console.log(lastIndex)
  //   })
  // }
  

  

  // const reset = () => {
  //   alert("tes")
  // }

  // const readIttLoud = (message) => {

  //   const speech = new SpeechSynthesisUtterance();
  //   speech.text = message;
  //   speech.volume = 1;
  //   speech.rate = 1;
  //   speech.pitch = 1;

  //   window.speechSynthesis.speak(speech)
  // }




  return (
    <Provider store={Store}>
        <RootApp />
    </Provider>
);
}

export default App;
