import type { GroupedTranslation } from './translations';

export type PageResponse = {
	link: string;
	name: GroupedTranslation;
	text: GroupedTranslation;
};
