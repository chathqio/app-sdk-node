/**
 * A data contract for the `WebhookSubscription` API object.
 */
export interface IWebhookSubscription {
    /**
     * The account ID in ObjectId (long) format.
     */
    _id: string;

    /**
     * The account ID in base64url (short) format.
     */
    id: string;

    /**
     * The Id of the account the event subscription is or should be attached to.
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
}
