<div class="flex flex-col gap-10">
	<div class="w-1/3 placeholder animate-pulse h-9"></div>
	<div class="flex flex-col gap-2">
		{#each Array(24) as _}
			<div
				class="h-5 placeholder animate-pulse w-full nth-[8n]:w-2/3 nth-[10n]:h-8 nth-[10n]:my-2 nth-[10n]:w-1/3"
			></div>
		{/each}
	</div>
</div>
