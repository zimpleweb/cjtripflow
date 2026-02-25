<script>
  import { onMount } from 'svelte';
  export let activities;

  let filtered = activities;
  let region = '';
  let type = '';
  let groupSize = '';

  const regions = [...new Set(activities.map(a => a.region))];
  const types = [...new Set(activities.map(a => a.type))];

  function filterActivities() {
    filtered = activities.filter(a => 
      (region ? a.region === region : true) &&
      (type ? a.type === type : true) &&
      (groupSize ? a.groupSize <= parseInt(groupSize) : true)
    );
  }
</script>

<div class="filter-form">
  <select bind:value={region} on:change={filterActivities}>
    <option value="">All Regions</option>
    {#each regions as r}
      <option value={r}>{r}</option>
    {/each}
  </select>
  <select bind:value={type} on:change={filterActivities}>
    <option value="">All Types</option>
    {#each types as t}
      <option value={t}>{t}</option>
    {/each}
  </select>
  <input type="number" bind:value={groupSize} placeholder="Max Group Size" on:input={filterActivities} />
</div>

<style>
  .filter-form { display: flex; gap: 1rem; margin-bottom: 2rem; }
  select, input { padding: 0.8rem; border: 1px solid var(--accent); border-radius: 8px; }
</style>