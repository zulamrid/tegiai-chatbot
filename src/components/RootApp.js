import React from 'react';
import { connect } from 'react-redux';
import { storeChat } from './../store/app/action';
import { FaPlay, FaMicrophone } from "react-icons/fa";
import axios from 'axios';

import loadgif from './../assets/gif/loading.gif'


export const RootApp = ({ datas_chat, storeChat, isLoadingChat }) => {
    const [words, setWords] = React.useState('')
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition()

    React.useEffect(() => {
        console.log(isLoadingChat)
        axios.post('https://tegiai-gi4coglcca-de.a.run.app/reset')
    }, [])

    const start = () => {
        recog.start()
    }

    recog.onstart = function () {
        console.log("Voice is activated")
    }

    recog.onresult = function (event) {
        const current = event.resultIndex;
        const message = event.results[current][0].transcript
        setWords(message)
        // readIttLoud(message)
        // setIsTalk(false)
        storeChat({ 'is_user': true, "text": message })
        setWords('')
    }


    const sendquestion = () => {
        storeChat({ 'is_user': true, "text": words })
        console.log(datas_chat)
        setWords('')
    }

    return (
        <div className="container">
            {/* <button className="btn" onClick={start}  disabled = {isTalk} ><BiMicrophone size={60} color="white" /></button>
        <h3 style={{ color:'#636e72' }}> {isTalk ? "Talking..." : "Click button above to talk"} </h3>
        <h2>{words}</h2> */}
            <div className="chat-box">
                <div className="ballon-container">

                    {datas_chat.length === 0 ?
                        <div className="no-msg"><span>No Message</span></div>
                        :
                        datas_chat.map((v, i) =>
                            v.is_user ?
                                <div className="ballon" key={i}>
                                    <div className="ballon-ava-left">

                                    </div>
                                    <div className="ballon-text-left">
                                        <span>{v.text}</span>
                                    </div>
                                </div>
                                :
                                <div className="ballon" key={i}>

                                    <div className="ballon-text-right">
                                        <span>{v.text}</span>
                                    </div>
                                    <div className="ballon-ava-right">

                                    </div>
                                </div>
                        )
                    }
                    {isLoadingChat ?
                        <div className="reply-loading">
                            <img src={loadgif} />
                        </div>
                        :
                        ""
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
    )
}

const mapStateToProps = ({ app }) => {
    return {
        datas_chat: app.datas_chat,
        isLoadingChat: app.isLoadingChat
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storeChat: (payload) => dispatch(storeChat(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootApp)