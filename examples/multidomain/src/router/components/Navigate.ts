import * as React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { IState } from 'src/_redux/types';
import { useTrigger } from 'src/_redux/useTrigger';

export const Navigate = () => {

    const navigate = useNavigate();
    const trigger = useTrigger();

    const {currentRoute} = useSelector((state: IState)=> ({currentRoute: state.router.currentRoute}))

    React.useEffect(()=> {
        trigger('route', 'init', null)
    },[])

    React.useEffect(()=> {
       navigate(currentRoute)
    },[currentRoute])

    return null

}