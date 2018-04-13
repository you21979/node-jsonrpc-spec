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

import * as fs from 'fs'

describe('spec test', () => {
    const datadir = 'fixture/jsonrpc2'
    const data_request = fs.readFileSync(datadir + '/request.txt', 'utf8').split('\n').filter(v => v !== '')
    const data_response = fs.readFileSync(datadir + '/response.txt', 'utf8').split('\n').filter(v => v !== '')
    const data_response_error = fs.readFileSync(datadir + '/response_error.txt', 'utf8').split('\n').filter(v => v !== '')
    const data_notification = fs.readFileSync(datadir + '/notification.txt', 'utf8').split('\n').filter(v => v !== '')

    it('request', () => {
        data_request.forEach( line => {
            assert(autoDetect(JSON.parse(line)) === rpctype.JSON_TYPE.REQUEST)
        })
    })
    it('response', () => {
        data_response.forEach( line => {
            assert(autoDetect(JSON.parse(line)) === rpctype.JSON_TYPE.RESPONSE)
        })
    })
    it('notification', () => {
        data_notification.forEach( line => {
            assert(autoDetect(JSON.parse(line)) === rpctype.JSON_TYPE.NOTIFICATION)
        })
    })
    it('response_error', () => {
        data_response_error.forEach( line => {
            assert(autoDetect(JSON.parse(line)) === rpctype.JSON_TYPE.RESPONSE_ERROR)
        })
    })
})
