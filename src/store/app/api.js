import axios from 'axios';

const translate_url = 'http://localhost:6789'

export const translate = async (payload) => {
    let data
    console.log(payload)

    await axios.post(`${translate_url}/translate`, {
        'text': payload.text,
        'tolang': 'kor'
    })
        .then(res => {
            let dataToPush = {
                'is_user': true,
                'text': payload.text,
                'korean': res.data.body
            }
            
            data = dataToPush
            console.log(data)
            return data
        })
}