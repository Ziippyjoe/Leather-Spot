'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
        const data = await res.json();
        setProduct(data);
        setImages(data.images || []);
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('price', (data.priceCents / 100).toFixed(2));
        setValue('categoryId', data.categoryId);
        setValue('gender', data.gender || '');
        setValue('size', data.size || '');
        setValue('color', data.color || '');
        setValue('style', data.style || '');
        setValue('stock', data.stock || '');
        setValue('isFeatured', data.isFeatured);
        setValue('isArchived', data.isArchived);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product. Check console.');
      }

      try {
        const res = await fetch('/api/categories');
        if (res.ok) setCategories(await res.json());
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (productId) fetchData();
  }, [productId, setValue]);

  const onSubmit = async (data) => {
    if (images.length === 0) {
      alert('At least one image is required!');
      return;
    }
  
    setUploading(true);
    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          slug,
          description: data.description,
          priceCents: Math.round(parseFloat(data.price) * 100),
          categoryId: parseInt(data.categoryId),
          images: images.map((img, index) => ({
            id: img.id || undefined,
            url: img.url,
            public_id: img.public_id || null, // Include public_id
            altText: img.altText || `${data.name} - Image ${index + 1}`,
            isPrimary: img.isPrimary || index === 0,
          })),
          gender: data.gender || null,
          size: data.size || null,
          color: data.color || null,
          style: data.style || null,
          stock: data.stock ? parseInt(data.stock) : null,
          isFeatured: data.isFeatured || false,
          isArchived: data.isArchived || false,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to update product');
      alert('Product updated successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update product.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
  
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        const result = await response.json();
        if (result.secure_url) {
          setImages((prev) => [...prev, {
            url: result.secure_url,
            public_id: result.public_id, // Store public_id
            altText: null,
            isPrimary: prev.length === 0,
          }]);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
    setUploading(false);
  };

  const handleDeleteImage = async (image, index) => {
    if (!confirm('Delete this image? It will be removed from Cloudinary and the product.')) return;
  
    try {
      const response = await fetch(`/api/products/${productId}/image?url=${encodeURIComponent(image.url)}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }
  
      // Update local state to remove the image
      setImages((prev) => prev.filter((_, i) => i !== index));
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Failed to delete image: ${error.message}`);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 mt-24 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold font-mono">Edit Product: {product.name}</h1>
        <Link href="/admin/products" className="text-blue-500 hover:underline">Back to Products</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full p-3 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full p-3 border rounded-md"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price (₦, e.g., 9999.99) *</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be non-negative' } })}
              className="w-full p-3 border rounded-md"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              {...register('categoryId', { required: 'Category is required' })}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              {...register('gender')}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              {...register('size')}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select...</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <input
              {...register('color')}
              className="w-full p-3 border rounded-md"
              placeholder="e.g., Black, Blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Style</label>
            <input
              {...register('style')}
              className="w-full p-3 border rounded-md"
              placeholder="e.g., Boots, Loafers"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Stock Quantity</label>
          <input
            type="number"
            {...register('stock', { min: { value: 0, message: 'Stock cannot be negative' } })}
            className="w-full p-3 border rounded-md"
            placeholder="e.g., 100"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <input
                type="checkbox"
                {...register('isFeatured')}
                className="mr-2"
              />
              Featured Product
            </label>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <input
                type="checkbox"
                {...register('isArchived')}
                className="mr-2"
              />
              Archived Product
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Images (Edit: Add new, replace by uploading, delete existing) *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full p-3 border rounded-md mb-4"
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img.url} alt={img.altText || `Image ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img, idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {uploading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </main>
  );
}