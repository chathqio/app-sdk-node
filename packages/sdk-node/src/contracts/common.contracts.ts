/**
 * A shorthand for `Omit<T2, keyof T1> & T1`.
 */
export type Spread<T1, T2> = Omit<T2, keyof T1> & T1;

export type PaginatedList<T> = {
    /**
     * The items in the current page
     */
    items: T[];

    /**
     * The total number of items in the list
     */
    count: number;

    /**
     * The number of items per page
     */
    limit: number;

    /**
     * The zero-based offset of the current page
     */
    offset: number;
};
