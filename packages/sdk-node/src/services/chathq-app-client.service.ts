import {
    IWebhookSubscription,
    LivechatEventName
} from '@chathq-oss/app-sdk-contracts';

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
     * Get a list of widgets in a ChatHQ Portal account.
     *
     * @param {string} accessToken The access token for the account.
     * @param {ListEngagementWidgetsInput} input Input data for the query. Includes the account ID, and pagination options.
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

    /**
     * List all webhooks for an account.
     *
     * Requires permissions:
     * - `webhooks:read`
     *
     * **NOTE:** `IWebhookSubscription` is defined in `@chathq-oss/app-sdk-contracts`.
     *
     * @param accessToken The access token for the account.
     * @param accountId The account ID in `base64url` format.
     */
    async listWebhooks(
        accessToken: string,
        accountId: string
    ): Promise<IWebhookSubscription[]> {
        const { data } = await this.get<IWebhookSubscription[]>(
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
        const { data } = await this.post<IWebhookSubscription>(
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
        const { data } = await this.get<IWebhookSubscription>(
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
        const { data } = await this.delete<IWebhookSubscription>(
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
        const { data } = await this.post<IWebhookSubscription>(
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
        const { data } = await this.post<IWebhookSubscription>(
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
