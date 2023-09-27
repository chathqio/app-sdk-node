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

        const { items, ...pagination } = data?.engagementWidgets;
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
    async listWebhooks(accessToken: string, accountId: string) {
        const { data } = await this.get<IWebhookBillingSubscription[]>(
            `${accountId}/webhooks`,
            accessToken,
            {}
        );

        return data;
    }

    async createWebhook(
        accessToken: string,
        accountId: string,
        event: LivechatEventName,
        url: string
    ) {
        const { data } = await this.post<IWebhookBillingSubscription>(
            `${accountId}/webhooks`,
            accessToken,
            {
                event,
                url
            }
        );

        return data;
    }

    async getWebhook(
        accessToken: string,
        accountId: string,
        webhookId: string
    ) {
        const { data } = await this.get<IWebhookBillingSubscription>(
            `${accountId}/webhooks/${webhookId}`,
            accessToken
        );

        return data;
    }

    async deleteWebhook(
        accessToken: string,
        accountId: string,
        webhookId: string
    ) {
        const { data } = await this.delete<IWebhookBillingSubscription>(
            `${accountId}/webhooks/${webhookId}`,
            accessToken
        );

        return data;
    }

    async addWebhookSubscription(
        accessToken: string,
        accountId: string,
        webhookId: string,
        url: string
    ) {
        const { data } = await this.post<IWebhookBillingSubscription>(
            `${accountId}/webhooks/${webhookId}/add-subscription`,
            accessToken,
            {
                url
            }
        );

        return data;
    }

    async removeWebhookSubscription(
        accessToken: string,
        accountId: string,
        webhookId: string,
        url: string
    ) {
        const { data } = await this.post<IWebhookBillingSubscription>(
            `${accountId}/webhooks/${webhookId}/remove-subscription`,
            accessToken,
            {
                url
            }
        );

        return data;
    }

    async getWebhookEventNames(accessToken: string) {
        const { data } = await this.get<string[]>(
            `webhooks/event-names`,
            accessToken,
            {}
        );

        return data;
    }

    //#endregion Webhooks
}
