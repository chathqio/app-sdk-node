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
}