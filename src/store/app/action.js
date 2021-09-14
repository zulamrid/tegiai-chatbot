import axios from 'axios';
import alertwav from './../../assets/wav/alert.wav';
import {
    translate
} from './api';

const url = 'https://tegiai-gi4coglcca-de.a.run.app';
const translate_url = 'http://localhost:6789'

const storeDataChat = (payload) => ({
    type: 'STORE_CHAT',
    datas: payload
})

const setLoading = () => ({
    type: 'LOADING'
})

let audio = new Audio(alertwav)

export const storeChat = (payload) => {
    return (dispatch) => {
        axios.post(`${translate_url}/translate`, {
            'text': payload.text,
            'tolang': 'kor'
        })
            .then(res => {
                let dataToPush = {
                    'is_user': true,
                    'text': payload.text,
                    'korean': res.data.body
                }
                dispatch(storeDataChat(dataToPush))
                dispatch(setLoading())
            })
        axios.post(`${url}/add_input`, {
            'text': payload.text
        })
            .then(res => {
                let lastIndex = res.data.messages.length - 1
                axios.post(`${translate_url}/translate`, {
                    'text': res.data.messages[lastIndex].text,
                    'tolang': 'kor'
                })
                    .then(res2 => {
                        let dataToPush = {
                            'is_user': false,
                            'text': res.data.messages[lastIndex].text,
                            'korean': res2.data.body
                        }
                        dispatch(storeDataChat(dataToPush))
                    })

                audio.play()
            })
        dispatch(setLoading)
    }
}


