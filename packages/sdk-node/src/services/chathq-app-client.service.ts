import {
    IWebhookBillingSubscription,
    LivechatEventName
} from '@chathqio/app-sdk-contracts';

import { ChatHQAppClientBase } from '../base';
import {
    AppClientOptions,
    ListEngagementWidgetsInput,
    PaginatedList,
    WidgetSummary
} from '../contracts';
import { LIST_ENGAGMENT_WIDGETS_QUERY } from '../graphql';

const ENDPOINT_DATA_GRAPH = '/graphql';

const ENDPOINT_DATA_WEBHOOKS = '/webhooks';

export class ChatHQAppClient extends ChatHQAppClientBase {
    //#region Constructor

    constructor(options: AppClientOptions) {
        super(options);
    }

    //#endregion Constructor

    //#region Widgets

    /**
     * Get a list of widgets.
     */
    async listEngagementWidgets(
        accessToken: string,
        input: ListEngagementWidgetsInput
    ) {
        const { accountId, limit = 10, offset = 0 } = input;
        if (!accountId) {
            throw new Error('accountId is required');
        }

        const {
            data: { data }
        } = await this.post(ENDPOINT_DATA_GRAPH, accessToken, {
            query: LIST_ENGAGMENT_WIDGETS_QUERY,
            variables: {
                accountId,
                limit,
                offset
            }
        });

        const { items, ...pagination } = data?.account?.engagementWidgets;
        const widgets = items?.map((item: any) => ({
            id: item.id,
            name: item.data.config.name,
            locationId: item.data.config.name
        }));

        const result: PaginatedList<WidgetSummary> = {
            ...pagination,
            items: widgets
        };

        return result;
    }

    //#endregion Widgets

    //#region Webhooks
    async listWebhooks(accessToken: string) {
        try {
            const {
                data: { data }
            } = await this.get<{ data: IWebhookBillingSubscription[] }>(
                `${ENDPOINT_DATA_WEBHOOKS}/all`,
                accessToken,
                {}
            );

            return data;
        } catch (err) {
            throw err;
        }
    }

    async deleteAllWebhooks(accessToken: string) {
        try {
            const {
                data: { data }
            } = await this.delete<{
                data: {
                    acknowledged: boolean;
                    deletedCount: number;
                };
            }>(`${ENDPOINT_DATA_WEBHOOKS}/all`, accessToken, {});

            return data;
        } catch (err) {
            throw err;
        }
    }

    async createWebhook(
        accessToken: string,
        accountId: string,
        event: LivechatEventName,
        url: string
    ) {
        try {
            const {
                data: { data }
            } = await this.post<{ data: IWebhookBillingSubscription }>(
                ENDPOINT_DATA_WEBHOOKS,
                accessToken,
                {
                    accountId,
                    event,
                    url
                }
            );

            return data;
        } catch (err) {
            throw err;
        }
    }

    async getWebhook(
        accessToken: string,
        accountId: string,
        event: LivechatEventName,
        url: string
    ) {
        try {
            const requestParams = `accountId=${accountId}&event=${event}&url=${encodeURI(
                url
            )}`;
            const {
                data: { data }
            } = await this.get<{ data: { id: string } }>(
                `${ENDPOINT_DATA_WEBHOOKS}?${requestParams}`,
                accessToken
            );

            return data;
        } catch (err) {
            throw err;
        }
    }

    async deleteWebhook(
        accessToken: string,
        accountId: string,
        event: LivechatEventName,
        url: string
    ) {
        try {
            const {
                data: { data }
            } = await this.delete<{ data: IWebhookBillingSubscription }>(
                `${ENDPOINT_DATA_WEBHOOKS}`,
                accessToken,
                {
                    data: {
                        accountId,
                        event,
                        url
                    }
                }
            );

            return data;
        } catch (err) {
            throw err;
        }
    }

    async getWebhookEventNames(accessToken: string) {
        try {
            const {
                data: { data }
            } = await this.get<{ data: string[] }>(
                `${ENDPOINT_DATA_WEBHOOKS}/event-names`,
                accessToken,
                {}
            );

            return data;
        } catch (err) {
            throw err;
        }
    }

    //#endregion Webhooks
}
