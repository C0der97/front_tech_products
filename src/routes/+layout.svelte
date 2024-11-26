<script>
  import '../app.css';
</script>

<div class="min-h-screen bg-gray-100">
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <a href="/" class="font-bold text-xl">Catálogo</a>
        <div class="space-x-4">
          <a href="/products" class="hover:text-blue-600">Productos</a>
          <a href="/categories" class="hover:text-blue-600">Categorías</a>
        </div>
      </div>
    </div>
  </nav>
  
  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>
</div>


