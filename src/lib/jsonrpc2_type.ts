// http://www.jsonrpc.org/specification

export interface IBase{
    jsonrpc: '2.0'
}

export interface IError{
    code: number
    message: string
}

export interface IBaseRequest<T> extends IBase{
    method: string
}

export interface IBaseResponse extends IBase{
    id: number
}

export interface IRequest<T> extends IBaseRequest<T>{
    id: number
    params?: T
}

export interface IRequestWithParams<T> extends IBaseRequest<T>{
    id: number
    params: T
}

export interface INotification<T> extends IBaseRequest<T>{
    params?: T
}

export interface INotificationWithParams<T> extends IBaseRequest<T>{
    params: T
}

export interface IResponse<T> extends IBaseResponse{
    result: T
}

export interface IResponseError extends IBaseResponse{
    error: IError
}

export enum ERROR_REASON{
    USER_DEFINE,
    PARSE_ERROR,
    INVALID_REQUEST,
    METHOD_NOT_FOUND,
    INVALID_PARAMS,
    INTERNAL_ERROR,
    SERVER_ERROR,
}

export enum JSON_TYPE{
    UNKNOWN,
    BATCH,
    REQUEST,
    RESPONSE,
    NOTIFICATION,
    RESPONSE_ERROR,
}

