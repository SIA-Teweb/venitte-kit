import type { ComponentIcon } from '@lucide/svelte';
import type { Component, Snippet } from 'svelte';

type Preset = 'primary' | 'tonal' | 'ghost';

export interface ButtonProps {
	type?: 'submit' | 'reset' | 'button';
	label?: string;
	icon?: typeof ComponentIcon;
	afterIcon?: typeof ComponentIcon;
	preset?: Preset;
	full?: boolean;
	isMenu?: boolean;
	iconSized?: boolean;
	disabled?: boolean;
	onclick?: (event: Event) => void;
	class?: string;
}

type BadgePreset = 'tonal' | 'warning' | 'icon';

export interface BadgeProps {
	icon?: typeof ComponentIcon;
	preset?: BadgePreset;
	children: Snippet;
	onclick?: (event: Event) => void;
}

export interface InputProps {
	icon?: typeof ComponentIcon;
	afterIcon?: typeof ComponentIcon;
	value?: string;
	placeholder?: string;
	full?: boolean;
	ref?: HTMLElement;
	name?: string;
	class?: string;
	oninput?: (event: Event) => void;
	onfocus?: (event: Event) => void;
	onclick?: (event: Event) => void;
}

export interface MenuButtonProps {
	icon: typeof ComponentIcon;
	label?: string;
	isActive?: boolean;
	onclick: (event: Event) => void;
	children?: Snippet;
}

export interface SideBarProps extends SideBarInitProps {
	close: () => void;
}

export type ComponentTypeProp<P> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: Component<any>;
	props?: P;
};

export interface SideBarInitProps {
	id: string;
	side?: 'left' | 'right';
	title?: string;
	content: ComponentTypeProp<unknown>;
}

export interface SelectOption {
	label: string;
	value: string | number;
	active?: boolean;
	disabled?: boolean;
}
