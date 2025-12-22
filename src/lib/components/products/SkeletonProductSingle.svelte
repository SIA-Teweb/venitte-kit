<div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
	<div class="flex gap-2">
		<div class="hidden md:flex flex-col gap-2 w-[100px]">
			{#each Array(4) as _}
				<div class="aspect-square object-contain w-full placeholder animate-pulse"></div>
			{/each}
		</div>
		<div class="w-full snap-x snap-mandatory overflow-scroll flex aspect-square no-scrollbar">
			<div class="flex-none w-full snap-center">
				<div class="aspect-square object-contain w-full placeholder animate-pulse"></div>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="w-full h-6 animate-pulse placeholder"></div>
		<div class="w-[60%] h-8 animate-pulse placeholder"></div>
		<div class="w-full h-36 animate-pulse placeholder rounded-2xl"></div>
		<div class="flex gap-2">
			<div class="w-40 h-8 animate-pulse placeholder"></div>
			<div class="w-30 h-8 animate-pulse placeholder"></div>
		</div>
		{#each Array(8) as _}
			<div class="not-last:w-full w-[60%] h-4 animate-pulse placeholder"></div>
		{/each}
	</div>
</div>
