/**
 * Input data for the `listEngagementWidgets` query.
 */
export type ListEngagementWidgetsInput = {
    /**
     * The ID of the ChatHQ account
     */
    accountId: string;

    /**
     * The offset to start from. Defaults to 0.
     */
    offset?: number;

    /**
     * The maximum number of widgets to return per page. Defaults to 10.
     */
    limit?: number;
};

export type WidgetSummary = {
    /**
     * The ID of the widget
     */
    id: string;

    /**
     * The name of the widget
     */
    name: string;

    /**
     * Whether the widget is enabled
     */
    enabled: boolean;
};
