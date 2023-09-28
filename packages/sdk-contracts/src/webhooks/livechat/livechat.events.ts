export const EVENT_LIVECHAT_VISITOR_MESSAGE =
    'account.livechat.visitor_message';
export const EVENT_LIVECHAT_AGENT_MESSAGE = 'account.livechat.agent_message';
export const EVENT_LIVECHAT_SESSION = 'account.livechat.session';
export const EVENT_LIVECHAT_SESSION_START = 'account.livechat.session_start';
export const EVENT_LIVECHAT_SESSION_TAKEN = 'account.livechat.session_taken';
export const EVENT_LIVECHAT_SESSION_QUEUED = 'account.livechat.session_queued';
export const EVENT_LIVECHAT_SESSION_FORWARDED =
    'account.livechat.session_forwarded';
export const EVENT_LIVECHAT_EDIT = 'account.livechat.edit';
export const EVENT_LIVECHAT_LEAD_CAPTURE = 'account.livechat.lead_capture';

export type LivechatEventName =
    | typeof EVENT_LIVECHAT_VISITOR_MESSAGE
    | typeof EVENT_LIVECHAT_AGENT_MESSAGE
    | typeof EVENT_LIVECHAT_SESSION
    | typeof EVENT_LIVECHAT_SESSION_START
    | typeof EVENT_LIVECHAT_SESSION_TAKEN
    | typeof EVENT_LIVECHAT_SESSION_QUEUED
    | typeof EVENT_LIVECHAT_SESSION_FORWARDED
    | typeof EVENT_LIVECHAT_EDIT
    | typeof EVENT_LIVECHAT_LEAD_CAPTURE;

export const LivechatEventNames = [
    EVENT_LIVECHAT_VISITOR_MESSAGE,
    EVENT_LIVECHAT_AGENT_MESSAGE,
    EVENT_LIVECHAT_SESSION,
    EVENT_LIVECHAT_SESSION_START,
    EVENT_LIVECHAT_SESSION_TAKEN,
    EVENT_LIVECHAT_SESSION_QUEUED,
    EVENT_LIVECHAT_SESSION_FORWARDED,
    EVENT_LIVECHAT_EDIT,
    EVENT_LIVECHAT_LEAD_CAPTURE
] as const;

export type RCLivechatWebhookType =
    | 'LIVECHAT_VISITOR_MESSAGE'
    | 'LIVECHAT_AGENT_MESSAGE'
    | 'LIVECHAT_SESSION'
    | 'LIVECHAT_SESSION_START'
    | 'LIVECHAT_SESSION_TAKEN'
    | 'LIVECHAT_SESSION_QUEUED'
    | 'LIVECHAT_SESSION_FORWARDED'
    | 'LIVECHAT_EDIT'
    | 'LIVECHAT_LEAD_CAPTURE';

export const LivechatEventMap: Record<
    RCLivechatWebhookType,
    LivechatEventName
> = {
    LIVECHAT_VISITOR_MESSAGE: EVENT_LIVECHAT_VISITOR_MESSAGE,
    LIVECHAT_AGENT_MESSAGE: EVENT_LIVECHAT_AGENT_MESSAGE,
    LIVECHAT_SESSION: EVENT_LIVECHAT_SESSION,
    LIVECHAT_SESSION_START: EVENT_LIVECHAT_SESSION_START,
    LIVECHAT_SESSION_TAKEN: EVENT_LIVECHAT_SESSION_TAKEN,
    LIVECHAT_SESSION_QUEUED: EVENT_LIVECHAT_SESSION_QUEUED,
    LIVECHAT_SESSION_FORWARDED: EVENT_LIVECHAT_SESSION_FORWARDED,
    LIVECHAT_EDIT: EVENT_LIVECHAT_EDIT,
    LIVECHAT_LEAD_CAPTURE: EVENT_LIVECHAT_LEAD_CAPTURE
};