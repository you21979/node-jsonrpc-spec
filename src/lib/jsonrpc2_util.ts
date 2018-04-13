import {
    JSON_TYPE,
    IError,
    IRequest,
    IRequestWithParams,
    INotification,
    INotificationWithParams,
    IResponse,
    IResponseError,
    ERROR_REASON
} from './jsonrpc2_type'

export const autoDetect = (obj: any): JSON_TYPE => {
    if(obj instanceof Array){
        return JSON_TYPE.BATCH
    }
    if(typeof obj !== 'object'){
        return JSON_TYPE.UNKNOWN
    }
    if(obj['jsonrpc'] !== '2.0'){
        return JSON_TYPE.UNKNOWN
    }
    if( 'id' in obj ){
        if('result' in obj){
            return JSON_TYPE.RESPONSE
        }
        if('error' in obj){
            return JSON_TYPE.RESPONSE_ERROR
        }
        if(typeof obj['method'] === 'string'){
            return JSON_TYPE.REQUEST
        }
    }else if(typeof obj['method'] === 'string'){
        return JSON_TYPE.NOTIFICATION
    }
    return JSON_TYPE.UNKNOWN
}

export const detectErrorCodeType = (error_code: number): ERROR_REASON => {
    if(error_code === -32700) return ERROR_REASON.PARSE_ERROR
    else if(error_code === -32600) return ERROR_REASON.INVALID_REQUEST
    else if(error_code === -32601) return ERROR_REASON.METHOD_NOT_FOUND
    else if(error_code === -32602) return ERROR_REASON.INVALID_PARAMS
    else if(error_code === -32603) return ERROR_REASON.INTERNAL_ERROR
    else if(error_code <= -32000 && error_code >= -32099) return ERROR_REASON.SERVER_ERROR
    return ERROR_REASON.USER_DEFINE
}

export const resolveBatch = ( obj: any ): Array<any> => {
    if(autoDetect(obj) === JSON_TYPE.BATCH){
        return obj as Array<any>
    }
    throw new Error('invalid type')
}

export const resolveRequest = <T>( obj: any ): IRequest<T> => {
    if(autoDetect(obj) === JSON_TYPE.REQUEST){
        return obj as IRequest<T>
    }
    throw new Error('invalid type')
}

export const resolveRequestWithParams = <T>( obj: any ): IRequestWithParams<T> => {
    if(autoDetect(obj) === JSON_TYPE.REQUEST){
        if('params' in obj){
            return obj as IRequestWithParams<T>
        }
    }
    throw new Error('invalid type')
}

export const resolveResponse = <T>( obj: any ): IResponse<T> => {
    if(autoDetect(obj) === JSON_TYPE.RESPONSE){
        return obj as IResponse<T>
    }
    throw new Error('invalid type')
}

export const resolveNotification = <T>( obj: any ): INotification<T> => {
    if(autoDetect(obj) === JSON_TYPE.NOTIFICATION){
        return obj as INotification<T>
    }
    throw new Error('invalid type')
}

export const resolveNotificationWithParams = <T>( obj: any ): INotificationWithParams<T> => {
    if(autoDetect(obj) === JSON_TYPE.NOTIFICATION){
        if('params' in obj){
            return obj as INotificationWithParams<T>
        }
    }
    throw new Error('invalid type')
}

export const resolveResponseError = ( obj: any ): IResponseError => {
    if(autoDetect(obj) === JSON_TYPE.RESPONSE_ERROR){
        return obj as IResponseError
    }
    throw new Error('invalid type')
}

export const makeRequest = <T>(id: number, method: string, params?: T): IRequest<T> => {
    const obj: IRequest<T> = {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: id,
    }
    return obj
}

export const makeResponse = <T>(id: number, result: T): IResponse<T> => {
    const obj: IResponse<T> = {
        jsonrpc: '2.0',
        result: result,
        id : id,
    }
    return obj
}

export const makeNotification = <T>(method: string, params?: T): INotification<T> => {
    const obj: INotification<T> = {
        jsonrpc: '2.0',
        method: method,
        params: params,
    }
    return obj
}

export const makeResponseError = (id: number, code: number, message: string): IResponseError => {
    const error: IError = {
        code: code,
        message: message,
    }
    const obj: IResponseError = {
        jsonrpc: '2.0',
        error: error,
        id : id,
    }
    return obj
}

