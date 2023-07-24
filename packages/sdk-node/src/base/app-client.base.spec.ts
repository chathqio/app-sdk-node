import { describe, expect, it } from 'vitest';

import type { AppClientOptions } from '../contracts';

import { ChatHQAppClientBase } from './app-client.base';

const APP_CLIENT_ID_OK_______ = 'xxxxxxxxxxxxxxxx';
const APP_CLIENT_ID_TOO_SHORT = 'xxxxxxxxxxxxxxx';
const APP_CLIENT_ID_TOO_LONG_ = 'xxxxxxxxxxxxxxxxY';

const APP_CLIENT_SECRET_OK_______ = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const APP_CLIENT_SECRET_TOO_SHORT = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const APP_CLIENT_SECRET_TOO_LONG_ = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxY';

class MockService extends ChatHQAppClientBase {
    constructor(options: AppClientOptions) {
        super(options);
    }
}

function serviceFactory(options: any) {
    return () => new MockService(options);
}

describe('ChatHQAppClientBase', () => {
    describe('appClientId validation', () => {
        it('should fail when appClientId not provided', () => {
            expect(
                serviceFactory({
                    appClientSecret: APP_CLIENT_SECRET_OK_______
                })
            ).toThrowError();
        });

        it('should fail when appClientId is not a string', () => {
            expect(
                serviceFactory({
                    appClientSecret: APP_CLIENT_SECRET_OK_______,
                    appClientId: 123
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientSecret: APP_CLIENT_SECRET_OK_______,
                    appClientId: true
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientSecret: APP_CLIENT_SECRET_OK_______,
                    appClientId: null
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientSecret: APP_CLIENT_SECRET_OK_______,
                    appClientId: undefined
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientSecret: APP_CLIENT_SECRET_OK_______,
                    appClientId: new Object()
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientSecret: APP_CLIENT_SECRET_OK_______,
                    appClientId: []
                })
            ).toThrowError();
        });

        it('should fail when appClientId is too short', () => {
            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_TOO_SHORT,
                    appClientSecret: APP_CLIENT_SECRET_OK_______
                })
            ).toThrowError();
        });

        it('should fail when appClientId is too long', () => {
            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_TOO_LONG_,
                    appClientSecret: APP_CLIENT_SECRET_OK_______
                })
            ).toThrowError();
        });
    });

    describe('appClientSecret validation', () => {
        it('should fail when appClientSecret not provided', () => {
            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______
                })
            ).toThrowError();
        });

        it('should fail when appClientSecret is not a string', () => {
            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: 123
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: true
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: null
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: undefined
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: new Object()
                })
            ).toThrowError();

            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: []
                })
            ).toThrowError();
        });

        it('should fail when appClientSecret is too short', () => {
            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: APP_CLIENT_SECRET_TOO_SHORT
                })
            ).toThrowError();
        });

        it('should fail when appClientSecret is too long', () => {
            expect(
                serviceFactory({
                    appClientId: APP_CLIENT_ID_OK_______,
                    appClientSecret: APP_CLIENT_SECRET_TOO_LONG_
                })
            ).toThrowError();
        });
    });
});
