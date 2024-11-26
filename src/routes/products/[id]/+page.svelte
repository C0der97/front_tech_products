<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { fetchCategories, createProduct, updateProduct } from '$lib/api';
    
    const productId = $page.params.id;
    const isEditing = productId !== 'new';
    
    let categories: any[] = [];
    let form = {
      category_id: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      sku: '',
      image_url: ''
    };
    
    onMount(async () => {
      try {
        categories = await fetchCategories();
        
        if (isEditing) {
          const response = await fetch(`/api/products/${productId}`);
          const product = await response.json();
          form = { ...product };
        }
      } catch (error: any) {
        alert(error.message);
      }
    });
    
    async function handleSubmit() {
      try {
        if (isEditing) {
          await updateProduct(parseInt(productId), form);
        } else {
          await createProduct(form);
        }
        
        window.location.href = '/products';
      } catch (error: any) {
        alert(error.message);
      }
    }
  </script>
  
  <div>
    <h1 class="text-3xl font-bold mb-6">
      {isEditing ? 'Editar' : 'Crear'} Producto
    </h1>
    
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
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          bind:value={form.name}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
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
      
      <div class="pt-4">
        <button
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          {isEditing ? 'Actualizar' : 'Crear'} Producto
        </button>
      </div>
    </form>
  </div>