/**
 * A data contract for the `Webhooks` type.
 */
export interface IWebhookBillingSubscription {
    _id: string;
    /**
     * The date and time the record was created.
     */
    createdAt: Date;
    /**
     * The date and time the record was last modified.
     */
    updatedAt: Date;
    /**
     * An identifier for the user or service account that created the record.
     */
    createdBy?: string;
    /**
     * And identifier for the user or service account that last updated the record.
     */
    updatedBy?: string;
    /**
     * The Id of the account the event subscription should be attached to.
     * Use the special value `__ADMIN` for admin-level events.
     */
    accountId: string;

    /**
     * The name of the event this webhook subscription listens for.
     */
    event: string;

    /**
     * A list of one or more URLs to deliver matching events to.
     */
    urls: string[];
}
