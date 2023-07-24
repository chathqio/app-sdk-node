import { describe, expect, expectTypeOf, it } from 'vitest';
import { config } from 'dotenv';

import { AppClientOptions } from '../contracts';

import { ChatHQAppClient } from './chathq-app-client.service';

config();

const env = process.env;
const APP_CLIENT_ID /*     */ = env.VITE_TEST_APP_CLIENT_ID;
const APP_CLIENT_SECRET /* */ = env.VITE_TEST_APP_CLIENT_SECRET;
const SSO_TOKEN /*         */ = env.VITE_TEST_SSO_TOKEN;
const BASE_URL /*          */ = env.VITE_TEST_BASE_URL;

const OPTIONS_FROM_ENV: AppClientOptions = {
    appClientId: APP_CLIENT_ID,
    appClientSecret: APP_CLIENT_SECRET,
    baseUrl: BASE_URL
};

function serviceFactory(options: any = {}) {
    return () =>
        new ChatHQAppClient({
            ...OPTIONS_FROM_ENV,
            ...options
        });
}

describe(ChatHQAppClient.name, () => {
    describe('constructor', () => {
        it('should succeed with options from ENV', () => {
            const service = serviceFactory()();
            expect(service).toBeInstanceOf(ChatHQAppClient);
        });

        it('should fail when options are not valid', () => {
            expect(
                serviceFactory({
                    appClientId: null,
                    appClientSecret: null
                })
            ).toThrow();
        });
    });

    describe('generateAccessToken', () => {
        it('should succeed with options from ENV', async () => {
            const service = serviceFactory()();
            const ssoToken = await service.generateAccessToken(SSO_TOKEN);

            expectTypeOf(ssoToken).toBeObject();
            expect(ssoToken).toHaveProperty('accessToken');
            expect(ssoToken).toHaveProperty('accountId');

            expect(ssoToken.accessToken).toBeDefined();
            expectTypeOf(ssoToken.accessToken).toBeString();

            expect(ssoToken.accountId).toBeDefined();
            expectTypeOf(ssoToken.accountId).toBeString();
        });
    });
});
