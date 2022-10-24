import { ILetter } from "src/letters/interfaces/Letter.interface";




export const loadLetters = async (): Promise<Array<ILetter>> => {

    
    const letters: Array<ILetter> = [
    {
        uid: 1,
        'body': 'Letter body',
        'from': 'ivanov@mail.ru',
        'subject': 'Hey there',
        'to': 'ananas@gmail.com'
    },
    {
        uid: 2,
        'body': 'Letter body',
        'from': 'ivanov@mail.ru',
        'subject': 'Hello1',
        'to': 'ananas@gmail.com'
    },
    {
        uid: 3,
        'body': 'Letter body',
        'from': 'no-reply@ozon.ru',
        'subject': 'Hello2',
        'to': 'asapovk@gmail.com'
    },
    {
        uid: 4,
        'body': 'Letter body',
        'from': 'ananas@gmail.com',
        'subject': 'Hello3',
        'to': 'ananas@gmail.com'
    },

]

    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(letters)
        } , 1000)
    })
}