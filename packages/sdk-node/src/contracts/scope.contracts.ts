export const SCOPE_WIDGETS_READ_ONLY = 'widgets:read';
export const SCOPE_WEBHOOKS_READ_ONLY = 'wwebhooks:read';
export const SCOPE_WEBHOOKS_WRITE = 'wwebhooks:read';

export type ChatHQAppClientScope =
    | typeof SCOPE_WIDGETS_READ_ONLY
    | typeof SCOPE_WEBHOOKS_READ_ONLY
    | typeof SCOPE_WEBHOOKS_WRITE;

export const APP_SCOPES_ALL: ChatHQAppClientScope[] = [
    SCOPE_WIDGETS_READ_ONLY,
    SCOPE_WEBHOOKS_READ_ONLY,
    SCOPE_WEBHOOKS_WRITE
];
