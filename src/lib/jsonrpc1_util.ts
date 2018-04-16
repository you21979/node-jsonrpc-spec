import {
    JSON_TYPE,
    IError,
    IRequest,
    INotification,
    IResponse,
    IResponseError,
} from './jsonrpc1_type'

export const autoDetect = (obj: any): JSON_TYPE => {
    if(typeof obj !== 'object'){
        return JSON_TYPE.UNKNOWN
    }
    if(!('id' in obj)){
        return JSON_TYPE.UNKNOWN
    }
    if( ('error' in obj) && ('result' in obj)){
        if(obj['error'] !== null){
            return JSON_TYPE.RESPONSE_ERROR
        }else if(obj['result'] !== null) {
            return JSON_TYPE.RESPONSE
        }
    }
    else if(typeof obj['method'] === 'string'){
        if(obj['id'] === null){
            // This is different from the specification, but there is no other way to implement it
            return JSON_TYPE.NOTIFICATION
        }
        return JSON_TYPE.REQUEST
    }
    return JSON_TYPE.UNKNOWN
}

export const resolveRequest = <T1, T2>( obj: any ): IRequest<T1, T2> => {
    if(autoDetect(obj) === JSON_TYPE.REQUEST){
        return obj as IRequest<T1, T2>
    }
    throw new Error('invalid type')
}

export const resolveResponse = <T1, T2>( obj: any ): IResponse<T1, T2> => {
    if(autoDetect(obj) === JSON_TYPE.RESPONSE){
        return obj as IResponse<T1, T2>
    }
    throw new Error('invalid type')
}

export const resolveNotification = <T>( obj: any ): INotification<T> => {
    if(autoDetect(obj) === JSON_TYPE.NOTIFICATION){
        return obj as INotification<T>
    }
    throw new Error('invalid type')
}

export const resolveResponseError = <T>( obj: any ): IResponseError<T> => {
    if(autoDetect(obj) === JSON_TYPE.RESPONSE_ERROR){
        return obj as IResponseError<T>
    }
    throw new Error('invalid type')
}

export const makeRequest = <T>(id: number, method: string, params: T): IRequest<number, T> => {
    const obj: IRequest<number, T> = {
        method: method,
        params: params,
        id: id,
    }
    return obj
}

export const makeResponse = <T>(id: number, result: T): IResponse<number, T> => {
    const obj: IResponse<number, T> = {
        result: result,
        error: null,
        id : id,
    }
    return obj
}

export const makeNotification = <T>(method: string, params: T): INotification<T> => {
    const obj: INotification<T> = {
        method: method,
        params: params,
        id: null,
    }
    return obj
}

export const makeResponseError = (id: number, code: number, message: string): IResponseError<number> => {
    const error: IError = {
        code: code,
        message: message,
    }
    const obj: IResponseError<number> = {
        result: null,
        error: error,
        id : id,
    }
    return obj
}

