export function clickOutside(node: Node) {
	const handleClick = ((event: Event) => {
		if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', node as CustomEventInit));
		}
	}) as EventListener;

	document.addEventListener('pointerdown', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('pointerdown', handleClick, true);
		}
	};
}
