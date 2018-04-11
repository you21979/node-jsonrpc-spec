import * as assert from 'assert'
import * as rpctype from '../lib/jsonrpc2_type'
import {
    resolveResponseError,
    resolveResponse,
    resolveRequestWithParams,
    resolveRequest,
    resolveNotification,
    resolveNotificationWithParams,
    resolveBatch,
    makeRequest,
    makeResponse,
    makeNotification,
    makeResponseError,
    autoDetect,
    detectErrorCodeType
} from '../lib/jsonrpc2_util'

describe('jsonrpc_type success', () => {
    it('makeResponseError', () => {
        const res = JSON.stringify(makeResponseError(0, -1000, 'unknown error'))
        assert(res === '{"jsonrpc":"2.0","error":{"code":-1000,"message":"unknown error"},"id":0}')
    })
    it('makeResponse', () => {
        const res = JSON.stringify(makeResponse<number>(0, 100))
        assert(res === '{"jsonrpc":"2.0","result":100,"id":0}')
    })
    it('makeRequest1', () => {
        const res = JSON.stringify(makeRequest(0, 'add'))
        assert(res === '{"jsonrpc":"2.0","method":"add","id":0}')
    })
    it('makeRequest2', () => {
        const res = JSON.stringify(makeRequest<number[]>(0, 'add', [1,2]))
        assert(res === '{"jsonrpc":"2.0","method":"add","params":[1,2],"id":0}')
    })
    it('makeNotification1', () => {
        const res = JSON.stringify(makeNotification('add'))
        assert(res === '{"jsonrpc":"2.0","method":"add"}')
    })
    it('makeNotification2', () => {
        const res = JSON.stringify(makeNotification<number[]>('add', [1,2]))
        assert(res === '{"jsonrpc":"2.0","method":"add","params":[1,2]}')
    })
})
