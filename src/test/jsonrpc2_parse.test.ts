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

const fixture = {
    unknown: '100',
    request_1 : '{"jsonrpc": "2.0", "method": "add", "params": [1, 2], "id": 100}',
    response_1 : '{"jsonrpc": "2.0", "result": [], "id": 100}',
    response_error_1 : '{"jsonrpc": "2.0", "error": { "code":-1000, "message": "error" }, "id": 100}',
    notification_1 : '{"jsonrpc": "2.0", "method": "add", "params": [1, 2]}',
    notification_2 : '{"jsonrpc": "2.0", "method": "add"}',
    batch_1 : '[{"jsonrpc": "2.0", "method": "add", "params": [1, 1], "id": 100}]',
}

describe('jsonrpc_type success', () => {
    it('autodetect', () => {
        assert(autoDetect(JSON.parse(fixture.unknown)) === rpctype.JSON_TYPE.UNKNOWN)
        assert(autoDetect(JSON.parse(fixture.request_1)) === rpctype.JSON_TYPE.REQUEST)
        assert(autoDetect(JSON.parse(fixture.response_1)) === rpctype.JSON_TYPE.RESPONSE)
        assert(autoDetect(JSON.parse(fixture.response_error_1)) === rpctype.JSON_TYPE.RESPONSE_ERROR)
        assert(autoDetect(JSON.parse(fixture.notification_1)) === rpctype.JSON_TYPE.NOTIFICATION)
        assert(autoDetect(JSON.parse(fixture.notification_2)) === rpctype.JSON_TYPE.NOTIFICATION)
        assert(autoDetect(JSON.parse(fixture.batch_1)) === rpctype.JSON_TYPE.BATCH)
    })
    it('resolveResponseError', () => {
        const res = resolveResponseError(JSON.parse(fixture.response_error_1))
        assert(res.jsonrpc === "2.0")
        assert(res.error.code === -1000)
        assert(res.error.message === 'error')
    })
    it('resolveResponse', () => {
        const res = resolveResponse<any[]>(JSON.parse(fixture.response_1))
        assert(res.jsonrpc === "2.0")
        assert(res.result.length === 0)
    })
    it('resolveRequest', () => {
        const res = resolveRequest<number[]>(JSON.parse(fixture.request_1))
        assert(res.jsonrpc === "2.0")
        assert(res.method === "add")
        assert(res.id === 100)
        if(res.params){
            assert(res.params.length === 2)
            assert(res.params[0] === 1)
            assert(res.params[1] === 2)
        }
    })
    it('resolveRequestWithParams', () => {
        const res = resolveRequestWithParams<number[]>(JSON.parse(fixture.request_1))
        assert(res.jsonrpc === "2.0")
        assert(res.method === "add")
        assert(res.id === 100)
        assert(res.params.length === 2)
        assert(res.params[0] === 1)
        assert(res.params[1] === 2)
    })
    it('resolveNotification1', () => {
        const res = resolveNotificationWithParams<number[]>(JSON.parse(fixture.notification_1))
        assert(res.jsonrpc === "2.0")
        assert(res.method === "add")
        assert(res.params.length === 2)
        assert(res.params[0] === 1)
        assert(res.params[1] === 2)
    })
    it('resolveNotification2', () => {
        const res = resolveNotification(JSON.parse(fixture.notification_2))
        assert(res.jsonrpc === "2.0")
        assert(res.method === "add")
        assert(res.params === void 0)
    })
    it('resolveBatch', () => {
        const res = resolveBatch(JSON.parse(fixture.batch_1))
        const type_list = res.map( obj => autoDetect(obj))
        assert(type_list[0] === rpctype.JSON_TYPE.REQUEST)
    })
    it('error_code', () => {
        assert(detectErrorCodeType(-32700) === rpctype.ERROR_REASON.PARSE_ERROR)
        assert(detectErrorCodeType(-32600) === rpctype.ERROR_REASON.INVALID_REQUEST)
        assert(detectErrorCodeType(-32601) === rpctype.ERROR_REASON.METHOD_NOT_FOUND)
        assert(detectErrorCodeType(-32602) === rpctype.ERROR_REASON.INVALID_PARAMS)
        assert(detectErrorCodeType(-32603) === rpctype.ERROR_REASON.INTERNAL_ERROR)
        assert(detectErrorCodeType(-32000) === rpctype.ERROR_REASON.SERVER_ERROR)
        assert(detectErrorCodeType(-32099) === rpctype.ERROR_REASON.SERVER_ERROR)
        assert(detectErrorCodeType(-1) === rpctype.ERROR_REASON.USER_DEFINE)
    })
})
describe('jsonrpc_type error', () => {
    it('resolveResponseError', () => {
        try{
            const res = resolveResponseError(JSON.parse(fixture.unknown))
            assert(0)
        }catch(e){
        }
    })
    it('resolveResponse', () => {
        try{
            const res = resolveResponse(JSON.parse(fixture.unknown))
            assert(0)
        }catch(e){
        }
    })
    it('resolveRequest', () => {
        try{
            const res = resolveRequest(JSON.parse(fixture.unknown))
            assert(0)
        }catch(e){
        }
    })
    it('resolveNotification', () => {
        try{
            const res = resolveNotification(JSON.parse(fixture.unknown))
            assert(0)
        }catch(e){
        }
    })
    it('resolveBatch', () => {
        try{
            const res = resolveBatch(JSON.parse(fixture.unknown))
            assert(0)
        }catch(e){
        }
    })
})
