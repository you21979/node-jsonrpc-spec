import {
    IError,
    IBaseRequest,
    IBaseResponse,
    BatchStorage,
} from './jsonrpc2_type'

import {
    makeRequest,
    makeResponse,
    makeResponseError,
    makeNotification,
} from './jsonrpc2_util'

export class BatchRequest {
    private id: number
    private list: BatchStorage
    constructor(id: number = 0){
        this.id = id
        this.list = []
    }
    private add(obj: IBaseRequest): BatchRequest{
        this.list.push(obj)
        return this
    }
    get(): BatchStorage {
        return this.list
    }
    request<T>(method: string, params?: T): BatchRequest{
        const id = this.id++
        return this.add(makeRequest<T>(id, method, params))
    }
    notification<T>(method: string, params?: T): BatchRequest{
        return this.add(makeNotification<T>(method, params))
    }
}

export class BatchResponse {
    private list: BatchStorage
    constructor(){
        this.list = []
    }
    private add(obj: IBaseResponse | IBaseRequest): BatchResponse{
        this.list.push(obj)
        return this
    }
    get(): BatchStorage {
        return this.list
    }
    responseError(id: number, code: number, message: string): BatchResponse{
        return this.add(makeResponseError(id, code, message))
    }
    response<T>(id, result: T): BatchResponse{
        return this.add(makeResponse<T>(id, result))
    }
    notification<T>(method: string, params?: T): BatchResponse{
        return this.add(makeNotification<T>(method, params))
    }
}

