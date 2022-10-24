import * as React from 'react';
import { useTrigger } from "src/_redux/useTrigger";
import { useSelector } from "react-redux";
import { IState } from "src/_redux/types";




export const LettersList = () => {
    const trigger = useTrigger();

    const { letters, isLoading } = useSelector(
        (state: IState ) => ({letters: state.letters.lettersList.data, 
            isLoading:state.letters.lettersList.loading 
        }))
    
      React.useEffect(()=> {
        trigger('lettersList', 'init', null as never);
      },[])
      
      return (
        <div>
             <div>Letters</div>
            {isLoading ? <div>Загрузка ...</div>: null}
            <div>
            { letters && letters.length ?  letters.map(l => 
                <div key={l.uid}>{l.subject}</div>
            ): null}
            </div>
        </div>
      );
}