import * as assert from 'assert'
import * as rpctype from '../lib/jsonrpc1_type'
import {
    resolveResponseError,
    resolveResponse,
    resolveRequest,
    resolveNotification,
    makeRequest,
    makeResponse,
    makeNotification,
    makeResponseError,
    autoDetect,
} from '../lib/jsonrpc1_util'

describe('jsonrpc_type success', () => {
    it('makeResponseError', () => {
        const res = JSON.stringify(makeResponseError(0, -1000, 'unknown error'))
        assert(res === '{"result":null,"error":{"code":-1000,"message":"unknown error"},"id":0}')
    })
    it('makeResponse', () => {
        const res = JSON.stringify(makeResponse(0, 100))
        assert(res === '{"result":100,"error":null,"id":0}')
    })
    it('makeRequest1', () => {
        const res = JSON.stringify(makeRequest(0, 'add', null))
        assert(res === '{"method":"add","params":null,"id":0}')
    })
    it('makeRequest2', () => {
        const res = JSON.stringify(makeRequest<number[]>(0, 'add', [1,2]))
        assert(res === '{"method":"add","params":[1,2],"id":0}')
    })
    it('makeNotification1', () => {
        const res = JSON.stringify(makeNotification('add', null))
        assert(res === '{"method":"add","params":null,"id":null}')
    })
    it('makeNotification2', () => {
        const res = JSON.stringify(makeNotification<number[]>('add', [1,2]))
        assert(res === '{"method":"add","params":[1,2],"id":null}')
    })
})
