<script lang="ts">
  let age: number = 20;
  const totalMonths: number = 1080; // 90 years * 12 months
  const monthsPerRow: number = 36; // 3 years per row
  const rows: number = 30; // 90 years / 3 years per row

  $: monthsLived = age * 12;

  function handleAgeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    age = Math.min(90, Math.max(0, parseInt(input.value) || 0));
  }
</script>

<div class="max-w-6xl mx-auto p-4 flex flex-col items-center">
  <h1 class="text-2xl font-bold text-center mb-4">A 90-Year Human Life in Months</h1>
  <div class="mb-4">
    <label for="age" class="mr-2">Your age:</label>
    <input
      type="number"
      id="age"
      bind:value={age}
      on:input={handleAgeChange}
      class="border rounded px-2 py-1 bg-slate-800"
      min="0"
      max="90"
    />
  </div>
  <div class="flex flex-col gap-[2px] mb-4">
    {#each Array(rows) as _, rowIndex}
      <div class="flex gap-[2px]">
        {#each Array(monthsPerRow) as _, colIndex}
          {@const monthIndex = rowIndex * monthsPerRow + colIndex}
          <div 
            class="w-2 h-2 rounded-full" 
            class:bg-red-500={monthIndex < monthsLived} 
            class:bg-blue-500={monthIndex >= monthsLived}
          ></div>
        {/each}
      </div>
    {/each}
  </div>
  <div class="mt-4 text-center text-sm">
    <p class="text-orange-500">Each row is 36 months = 3 years</p>
    <p>Months lived: {monthsLived}</p>
    <p>Months remaining: {totalMonths - monthsLived}</p>
  </div>
</div>