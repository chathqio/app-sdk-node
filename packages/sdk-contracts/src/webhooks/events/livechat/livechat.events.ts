export declare const LIVECHAT_VISITOR_MESSAGE = 'LIVECHAT_VISITOR_MESSAGE';
export declare const LIVECHAT_AGENT_MESSAGE = 'LIVECHAT_AGENT_MESSAGE';
export declare const LIVECHAT_SESSION = 'LIVECHAT_SESSION';
export declare const LIVECHAT_SESSION_START = 'LIVECHAT_SESSION_START';
export declare const LIVECHAT_SESSION_TAKEN = 'LIVECHAT_SESSION_TAKEN';
export declare const LIVECHAT_SESSION_QUEUED = 'LIVECHAT_SESSION_QUEUED';
export declare const LIVECHAT_SESSION_FORWARDED = 'LIVECHAT_SESSION_FORWARDED';
export declare const LIVECHAT_EDIT = 'LIVECHAT_EDIT';
export declare const LIVECHAT_LEAD_CAPTURE = 'LIVECHAT_LEAD_CAPTURE';

export type LivechatEventName =
    | typeof LIVECHAT_AGENT_MESSAGE
    | typeof LIVECHAT_EDIT
    | typeof LIVECHAT_LEAD_CAPTURE
    | typeof LIVECHAT_SESSION
    | typeof LIVECHAT_SESSION_FORWARDED
    | typeof LIVECHAT_SESSION_QUEUED
    | typeof LIVECHAT_SESSION_START
    | typeof LIVECHAT_SESSION_TAKEN
    | typeof LIVECHAT_VISITOR_MESSAGE;
