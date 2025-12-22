import { browser } from '$app/environment';

export interface StorageItem<T> {
	value: T;
	/**
	 * In milliseconds.
	 */
	lifetime: number;
	/**
	 * Timestasmp in milliseconds.
	 */
	createdAt: number;
}

class AppStorage {
	public get<T>(key: string): T | null {
		if (!browser) {
			return null;
		}

		const encoded = localStorage.getItem(key);

		if (!encoded) {
			return null;
		}

		const { value, lifetime, createdAt }: StorageItem<T> = JSON.parse(encoded);

		if (lifetime && Date.now() - createdAt > lifetime) {
			localStorage.removeItem(key);

			return null;
		}

		if (value === undefined) {
			return null;
		}

		return value;
	}

	/**
	 * @param key
	 * @param value
	 * @param lifetime in milliseconds.
	 */
	public set<T>(key: string, value: T, lifetime?: number): void {
		if (!browser) {
			return;
		}

		localStorage.setItem(
			key,
			JSON.stringify({
				value,
				lifetime,
				createdAt: Date.now()
			})
		);
	}

	public remove(key: string): void {
		if (!browser) {
			return;
		}

		localStorage.removeItem(key);
	}
}

export default new AppStorage();
