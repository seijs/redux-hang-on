import {getActionType} from '../../utils'

export const  UpdateOn = (trigger, status: string | null) => {
    const actionType =  getActionType(trigger, status)
    return  (targetClass: any, propertyKey: string, descriptor: PropertyDescriptor)  => {
        if(!targetClass.updatable) {
             targetClass.updatable = {[actionType]: propertyKey}
         }
         else {
            targetClass.updatable = {...targetClass.updatable, [actionType]: propertyKey }
        }
    };
}