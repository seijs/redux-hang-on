import * as React from 'react'
import { shallowEqual } from 'react-redux'
import { useSelector } from 'react-redux'
import { IState } from 'src/_redux/types'
import './style.less'


export const Window = () => {

    const {content, isOpen} = useSelector((state: IState)=> 
        ({content: state.popup.content, isOpen: state.popup.isOpen}), shallowEqual)

    return isOpen ? (
        <div className='popupBackground'>
            <div className='popupWindow'>{content}</div>
        </div>
    ): null
} 