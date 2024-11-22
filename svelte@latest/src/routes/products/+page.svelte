<script lang="ts">
  import { onMount } from 'svelte';
  import { deleteProduct, fetchProducts } from '$lib/api';
  
  let products: any[] = [];
  let loading = true;
  let error: string | null = null;
  
  onMount(async () => {
    try {
      products = await fetchProducts();
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
  
  async function handleDelete(id: number) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      await deleteProduct(id);
      products = products.filter(p => p.id !== id);
    } catch (e: any) {
      alert(e.message);
    }
  }
</script>

<div>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Productos</h1>
    <a 
      href="/products/new" 
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Nuevo Producto
    </a>
  </div>

  {#if loading}
    <div class="text-center py-8">
      <p>Cargando productos...</p>
    </div>
  {:else if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each products as product (product.id)}
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          {#if product.image_url}
            <img 
              src={product.image_url} 
              alt={product.name}
              class="w-full h-48 object-cover"
            />
          {/if}
          <div class="p-4">
            <h2 class="text-xl font-semibold">{product.name}</h2>
            <p class="text-gray-600 mt-2">{product.description}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-2xl font-bold">${product.price}</span>
              <span class="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
            <div class="mt-4 flex space-x-2">
              <a 
                href="/products/{product.id}/edit"
                class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex-1 text-center"
              >
                Editar
              </a>
              <button 
                on:click={() => handleDelete(product.id)}
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