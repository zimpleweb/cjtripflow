<script>
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';
  export let activitySlug;
  let persons = 1;
  let date = '';
  let dateInput;

  onMount(() => {
    flatpickr(dateInput, { dateFormat: 'Y-m-d' });
  });

  async function submitForm() {
    const data = { activitySlug, persons, date };
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) alert('Quote requested!');
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <label>Number of Persons: <input type="number" bind:value={persons} min="1" max="12" /></label>
  <label>Date: <input bind:this={dateInput} type="text" placeholder="Select Date" /></label>
  <button type="submit" class="btn-primary">Request Quote</button>
</form>

<style>
  form { display: flex; flex-direction: column; gap: 1rem; max-width: 400px; }
  label { display: block; }
</style>