import { toaster } from '$lib/stores/toaster';
import type { ToastProps } from '$lib/types/widgets';
import { CircleAlert, CircleCheckBig, CircleXIcon } from '@lucide/svelte';
import type { Component } from 'svelte';

type Kind = 'success' | 'error' | 'info';

const preset: Record<Kind, { color: string; icon: Component }> = {
	success: { color: 'var(--color-success-700)', icon: CircleCheckBig },
	error: { color: 'var(--color-error-700)', icon: CircleXIcon },
	info: { color: 'var(--color-warning-700)', icon: CircleAlert }
};

const showToast =
	(kind: Kind) =>
	({ title, description, icon }: ToastProps) =>
		toaster.info({
			title,
			description,
			meta: { ...preset[kind], icon: icon ?? preset[kind].icon }
		});

export const showSuccessToast = showToast('success');
export const showErrorToast = showToast('error');
export const showInfoToast = showToast('info');
