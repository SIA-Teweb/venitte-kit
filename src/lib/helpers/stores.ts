export function createChangeDetector<T>(initialValue: T, keys: (keyof T)[]) {
	let previous = initialValue;

	return (current: T): boolean => {
		const hasChanged = keys.some((key) => current[key] !== previous[key]);

		if (hasChanged) {
			previous = current;
		}

		return hasChanged;
	};
}
