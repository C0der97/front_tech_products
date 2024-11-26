<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { fetchProductById, updateProduct, fetchCategories } from '$lib/api';
  import { goto } from '$app/navigation';

  const productId = $page.params.id ? parseInt($page.params.id) : null;
  let categories: any[] = [];
  let form = {
    category_id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    sku: '',
    image_url: '',
  };
  let errors: Record<string, string> = {};

  onMount(async () => {
    try {
      categories = await fetchCategories();
      
      if (productId) {
        const product = await fetchProductById(productId);
        form = { 
          ...product,
          price: product.price.toString(),
          stock: product.stock.toString()
        };
      }
    } catch (error: any) {
      errors.fetch = error.message || 'Error al cargar el producto';
    }
  });

  async function handleSubmit() {
    // Reset errors
    errors = {};
    
    // Basic validation
    if (!form.name) errors.name = 'El nombre es requerido';
    if (!form.price) errors.price = 'El precio es requerido';
    if (!form.category_id) errors.category_id = 'La categoría es requerida';
    
    if (Object.keys(errors).length > 0) return;
    
    try {
      // Convert numeric fields to numbers
      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      };
      
      await updateProduct(productId!, productData);
      goto('/products');
    } catch (error: any) {
      errors.submit = error.message || 'Error al actualizar el producto';
    }
  }
</script>

<div>
  <h1 class="text-3xl font-bold mb-6">Editar Producto</h1>
  
  {#if errors.fetch}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {errors.fetch}
    </div>
  {/if}
  
  <form on:submit|preventDefault={handleSubmit} class="max-w-2xl space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Categoría</label>
      <select
        bind:value={form.category_id}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      >
        <option value="">Seleccione una categoría</option>
        {#each categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
      {#if errors.category_id}
        <p class="text-red-500 text-sm mt-1">{errors.category_id}</p>
      {/if}
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Nombre</label>
      <input
        type="text"
        bind:value={form.name}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
      {#if errors.name}
        <p class="text-red-500 text-sm mt-1">{errors.name}</p>
      {/if}
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea
        bind:value={form.description}
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      ></textarea>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Precio</label>
      <input
        type="number"
        step="0.01"
        bind:value={form.price}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
      {#if errors.price}
        <p class="text-red-500 text-sm mt-1">{errors.price}</p>
      {/if}
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Stock</label>
      <input
        type="number"
        bind:value={form.stock}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">SKU</label>
      <input
        type="text"
        bind:value={form.sku}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">URL de la imagen</label>
      <input
        type="url"
        bind:value={form.image_url}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    
    {#if errors.submit}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {errors.submit}
      </div>
    {/if}
    
    <div class="pt-4">
      <button
        type="submit"
        class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Actualizar Producto
      </button>
    </div>
  </form>
</div>