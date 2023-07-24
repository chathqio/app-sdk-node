/**
 * A shorthand for `Omit<T2, keyof T1> & T1`.
 */
export type Spread<T1, T2> = Omit<T2, keyof T1> & T1;
