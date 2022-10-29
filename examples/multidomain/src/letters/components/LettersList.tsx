import * as React from 'react';
import { useTrigger } from "src/_redux/useTrigger";
import { useSelector } from "react-redux";
import { IState } from "src/_redux/types";
import {ComposeGrid} from 'src/compose/components/ComposeGrid'



export const LettersList = () => {
    const trigger = useTrigger();

    const { letters, isLoading } = useSelector(
        (state: IState ) => ({letters: state.letters.lettersList.data, 
            isLoading:state.letters.lettersList.loading 
        }))
    
      React.useEffect(()=> {
        trigger('lettersList', 'init', null);
        trigger('setContent', 'init', null);
 
      },[])
      
      return (
        <div>
            <button onClick={() => trigger('setContent', 'openWindow', {id: '-1'})}>Create new</button>
             <div><ComposeGrid/></div>
            {isLoading ? <div>Loading ...</div>: null}
            <div>
            { letters && letters.length ?  letters.map(l => 
                <div key={l.uid} onClick={()=> trigger('setContent', 'openFromList', {
                  'body': l.body,
                  'subject': l.subject,
                })}>{l.subject} </div>
            ): null}
            </div>
        </div>
      );
}