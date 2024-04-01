export interface PlatformVariable<T = unknown> {
	key: string;
	proper_key: string;
	value: T;
	type: string;
}
