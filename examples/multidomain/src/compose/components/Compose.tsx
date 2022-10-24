import * as React from 'react'




export const Compose = () => {

    return (
        <div>
            <input name="Subject"/>
            <input name="Body" 
                   multiple  
                   height={'20rem'} 
                   width={'100%'} 
                   style={{margin:'2rem'}}
                />
        </div>
    )
}