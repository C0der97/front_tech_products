<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchCategories, deleteCategory } from '$lib/api';

  let categories = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      categories = await fetchCategories();
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  async function handleDelete(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
    try {
      await deleteCategory(id);
      categories = categories.filter((category) => category.id !== id);
    } catch (e: any) {
      alert(e.message);
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Categorías</h1>
    <a
      href="/categories/new"
      class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
    >
      Nueva Categoría
    </a>
  </div>

  {#if loading}
    <div class="text-center py-8">
      <p class="text-gray-600">Cargando categorías...</p>
    </div>
  {:else if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each categories as category (category.id)}
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800">{category.name}</h2>
            <div class="mt-4 flex space-x-2">
              <a
                href="/categories/{category.id}/edit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1 text-center"
              >
                Editar
              </a>
              <button
                on:click={() => handleDelete(category.id)}
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
