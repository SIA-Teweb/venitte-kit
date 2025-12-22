import type { ImageSizeEnum } from '$lib/enums/images';

interface ImageThumbnail {
	size: ImageSizeEnum;
	link: string;
}

export interface Image {
	main: string;
	thumbnails: ImageThumbnail[];
}
