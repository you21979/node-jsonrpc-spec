// http://www.jsonrpc.org/specification_v1

export interface IBase<T>{
    id: T
}

export interface IError{
    code: number
    message: string
}

export interface IBaseRequest<T1, T2> extends IBase<T1>{
    method: string
    params: T2
}

export interface IBaseResponse<T1, T2, T3> extends IBase<T1>{
    result: T2
    error: T3
}

export interface IRequest<T1, T2> extends IBaseRequest<T1, T2>{}

export interface INotification<T> extends IBaseRequest<null, T>{}

export interface IResponse<T1, T2> extends IBaseResponse<T1, T2, null>{}

export interface IResponseError<T> extends IBaseResponse<T, null, IError>{}

export enum JSON_TYPE{
    UNKNOWN,
    REQUEST,
    RESPONSE,
    NOTIFICATION,
    RESPONSE_ERROR,
}

