// src/lib/api.ts
const API_URL = 'https://5x2ubxdvc9.execute-api.us-east-1.amazonaws.com/api';
const API_CAT_URL = 'https://5x2ubxdvc9.execute-api.us-east-1.amazonaws.com//api';



export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Error fetching products');
  return response.json();
}

export async function fetchProductById(id: number) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }
  return response.json();
}


export async function fetchCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function createProduct(product: any) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create product');
  }
  return response.json();
}

export async function updateProduct(id: number, product: any) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product');
  }
  return response.json();
}


export async function deleteProduct(id: number) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
}



// Add these to your existing $lib/api.ts

export async function createCategory(category: any) {
  const response = await fetch(`${API_CAT_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create category');
  }
  return response.json();
}

export async function updateCategory(id: number, category: any) {
  const response = await fetch(`${API_CAT_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update category');
  }
  return response.json();
}

export async function deleteCategory(id: number) {
  const response = await fetch(`${API_CAT_URL}/categories/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
}

export async function fetchCategoryById(id: number) {
  const response = await fetch(`${API_CAT_URL}/categories/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category ${id}`);
  }
  return response.json();
}