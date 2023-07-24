import { AxiosRequestConfig } from 'axios';
import z from 'zod';

import { AuthStrategy } from './auth.contracts';
import { Spread } from './common.contracts';

export const appClientOptionsSchema = z.object({
    appClientId: z
        .string({ required_error: 'appClientId is required' })
        .length(16, { message: 'appClientId must be 16 characters long' }),
    appClientSecret: z
        .string({ required_error: 'appClientSecret is required' })
        .length(32, { message: 'appClientSecret must be 32 characters long' }),
    authStrategy: z.function().optional(),
    baseUrl: z
        .string({
            invalid_type_error: 'baseUrl must be a string when provided'
        })
        .optional(),
    extraHeaders: z
        .record(z.string(), {
            invalid_type_error:
                'extraHeaders must be a record of strings when provided'
        })
        .optional()
});

/**
 * A contract for the options that can be passed to the constructor of
 * AppClient services.
 */
export type AppClientOptions = {
    /**
     * (Required) The ID of the App Client.
     */
    appClientId: string;

    /**
     * (Required) The secret key of the App Client.
     */
    appClientSecret: string;

    /**
     * (Optional) The authorization strategy to use.
     *
     * **NOTE:** Most of the time you won't need to provide an authorization
     * strategy, as the default strategy will work for most use cases. This
     * field is included only for future-proofing.
     */
    authStrategy?: AuthStrategy;

    /**
     * (Optional) The base URL of the API. Defaults to the ChatHQ Portal
     * API production URL.
     *
     * **NOTE:** Most of the time you won't need to provide a base URL
     * explictly, as the default onw will work for most use cases. This
     * field is included only for future-proofing.
     */
    baseUrl?: string;

    /**
     * (Optional) Any extra headers to be sent with every request.
     *
     * **NOTE:** These headers will be sent with every request, if you need
     * to send headers with only a specific request, use the `headers` field
     * of the `RequestOptions` object.
     */
    extraHeaders?: Record<string, string>;
};

/**
 * A contract for the options that can be passed to the request methods of
 * AppClient services.
 */
export type RequestOptions = Partial<
    Spread<
        { method: never; url: never; headers: Record<string, string> },
        AxiosRequestConfig
    >
>;
