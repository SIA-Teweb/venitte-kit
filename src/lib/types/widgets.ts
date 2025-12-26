import type { Component, ComponentIcon } from '@lucide/svelte';
import type { Image } from './general';
import type { ComponentTypeProp } from './ui';

export interface LightboxProps {
	images: Image[];
	index: number;
	close?: () => void;
}

export interface ToastProps {
	title?: string;
	description: string;
	icon?: Component;
}

export type PopoverInitProps<T> = {
	target: HTMLElement;
	width?: 'parent';
	content: ComponentTypeProp<T>;
	onClose?: () => void;
};

export interface DialogProps<P> {
	id: string;
	title: string;
	content: string | ComponentTypeProp<P>;
	icon?: typeof ComponentIcon;
}

export type DialogInitProps = Omit<DialogProps<unknown>, 'id'>;
