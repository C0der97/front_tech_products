<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { fetchCategoryById, updateCategory } from '$lib/api';

    const categoryId = $page.params.id ? parseInt($page.params.id) : null;
    let form = {
        name: '',
        description: ''
    };
    let errors: Record<string, string> = {};

    onMount(async () => {
        try {
            if (categoryId) {
                const category = await fetchCategoryById(categoryId);
                form = { ...category };
            }
        } catch (error: any) {
            errors.fetch = error.message || 'Error al cargar la categoría';
        }
    });

    async function handleSubmit() {
        // Reset errors
        errors = {};
        
        // Basic validation
        if (!form.name) errors.name = 'El nombre es requerido';
        
        if (Object.keys(errors).length > 0) return;
        
        try {
            await updateCategory(categoryId!, form);
            goto('/categories');
        } catch (error: any) {
            errors.submit = error.message || 'Error al actualizar la categoría';
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Editar Categoría</h1>
    
    {#if errors.fetch}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.fetch}
        </div>
    {/if}
    
    <form on:submit|preventDefault={handleSubmit} class="max-w-2xl space-y-4">
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
            <label class="block text-sm font-medium text-gray-700">Descripción (opcional)</label>
            <textarea
                bind:value={form.description}
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
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
                Actualizar Categoría
            </button>
        </div>
    </form>
</div>