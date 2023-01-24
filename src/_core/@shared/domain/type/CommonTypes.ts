export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Replace<T, R> = Omit<T, keyof R> & R;
