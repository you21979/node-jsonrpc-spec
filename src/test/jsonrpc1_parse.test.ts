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

const fixture = {
    unknown: '100',
    request_1 : '{"method": "add", "params": [1, 2], "id": 100}',
    response_1 : '{"result": [], "error": null, "id": 100}',
    response_error_1 : '{"result": null, "error": { "code":-1000, "message": "error" }, "id": 100}',
    notification_1 : '{"method": "add", "params": [1, 2], "id": null}',
    notification_2 : '{"method": "add", "params": null, "id": null}',
}

describe('jsonrpc_type success', () => {
    it('autodetect', () => {
        assert(autoDetect(JSON.parse(fixture.unknown)) === rpctype.JSON_TYPE.UNKNOWN)
        assert(autoDetect(JSON.parse(fixture.request_1)) === rpctype.JSON_TYPE.REQUEST)
        assert(autoDetect(JSON.parse(fixture.response_1)) === rpctype.JSON_TYPE.RESPONSE)
        assert(autoDetect(JSON.parse(fixture.response_error_1)) === rpctype.JSON_TYPE.RESPONSE_ERROR)
        assert(autoDetect(JSON.parse(fixture.notification_1)) === rpctype.JSON_TYPE.NOTIFICATION)
        assert(autoDetect(JSON.parse(fixture.notification_2)) === rpctype.JSON_TYPE.NOTIFICATION)
    })
    it('resolveResponseError', () => {
        const res = resolveResponseError(JSON.parse(fixture.response_error_1))
        assert(res.error.code === -1000)
        assert(res.error.message === 'error')
    })
    it('resolveResponse', () => {
        const res = resolveResponse<number, any[]>(JSON.parse(fixture.response_1))
        assert(res.result.length === 0)
    })
    it('resolveRequest', () => {
        const res = resolveRequest<number, number[]>(JSON.parse(fixture.request_1))
        assert(res.method === "add")
        assert(res.id === 100)
        if(res.params){
            assert(res.params.length === 2)
            assert(res.params[0] === 1)
            assert(res.params[1] === 2)
        }
    })
    it('resolveNotification', () => {
        const res = resolveNotification<null>(JSON.parse(fixture.notification_2))
        assert(res.method === "add")
        assert(res.params === null)
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
})
