import * as React from 'react'
import { useSelector } from 'react-redux'
import { IState } from 'src/_redux/types'
import { useTrigger } from 'src/_redux/useTrigger'
import { ComposeWrapper } from './ComposeWrapper'
import './Compose.less'



export const Compose = () => {
    const { subject, body, to } = useSelector(
        (state: IState ) => ({
            subject: state.compose.subject,
            body: state.compose.body,
            to: state.compose.to
    }))
    const trigger = useTrigger();

    React.useEffect(()=> {
        trigger('setContent', 'init', null);
    },[])

    return (
        <div className='popupwindow'>
        <div className='root'>
            <div className='composeWrap'>
            <div className='subject'>
                <input defaultValue={subject} name="Subject" className='textInput' onChange={(e)=> trigger('setContent', 'setForm', {
                    'input': 'subject',
                    'text': e.target.value
                })} />
            </div>
            <textarea defaultValue={body} name="Body" 
            onChange={(e)=> trigger('setContent', 'setForm', {
                'input': 'body',
                'text': e.target.value
            })}
                   className='body'
                />
            </div>
            <button onClick={()=> trigger('setContent','closeWindow', null)}>Закрыть</button>
        </div>
        </div>
    )
}