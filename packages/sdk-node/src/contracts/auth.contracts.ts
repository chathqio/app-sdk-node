/**
 * A contract for a function that returns an object with HTTP headers.
 */
export type AuthStrategy = (tokenOrApiKey?: string) => Record<string, string>;

/**
 * A data contract for the input data of the getAccessToken operation.
 */
export type GetAccessTokenInput = {
    /**
     * An SSO token for the user's account that is specific to an app client.
     */
    userAppToken: string;

    /**
     * (Optional) Extra claims to include in the access token body.
     */
    extraClaims?: Record<string, any>;
};

export type GenerateAccessTokenResponse = {
    /**
     * A ChatHQ Portal API Access Token for the user's account.
     */
    accessToken: string;
};

/**
 * A data contract for the result of the getAccessToken operation.
 */
export type GenerateAccessTokenResult = GenerateAccessTokenResponse & {
    /**
     * The ID of the user's account, as expected by the ChatHQ Portal API.
     */
    accountId: string;
};
