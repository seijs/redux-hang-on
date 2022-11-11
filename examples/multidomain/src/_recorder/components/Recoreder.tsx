import * as React from 'react'
import { shallowEqual } from 'react-redux'
import { useSelector } from 'react-redux'
import store, { dispatch } from 'src/_redux'
import { IState } from 'src/_redux/types'
import { useTrigger } from 'src/_redux/useTrigger'
import './style.less'

export const Recorder = () => {
   

    const recorderState = useSelector((state: IState)=> state.recorder)
    const trigger = useTrigger()


    React.useEffect(()=>{
        trigger('record', 'init', null)
    },[])
    return (<div className='recorder'>
                <div>{recorderState.time}</div>
                <button onClick={()=> trigger('record','act', null)}>Начать</button>
                {recorderState.isRecording ? <div>Идет запись</div>: null}
            </div>
            )

}