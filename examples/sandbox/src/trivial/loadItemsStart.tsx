import * as React from 'react'
import { useTrigger } from 'src/_redux/useTrigger'


export const Component = () => {
    const trigger = useTrigger()

    return (
        <button>load</button>
    )
}