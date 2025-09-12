'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const onSubmit = async (data) => {
    if (images.length === 0) {
      alert('At least one image is required!');
      return;
    }

    setUploading(true);
    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          slug,
          description: data.description,
          priceCents: Math.round(parseFloat(data.price) * 100),
          categoryId: parseInt(data.categoryId),
          images,
        }),
      });

      if (!response.ok) throw new Error('Failed to create product');
      const newProduct = await response.json();
      alert('Product added successfully!');
      reset();
      setImages([]);
      router.push(`/product/${newProduct.slug}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add product. Check console.');
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
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.secure_url) {
          setImages((prev) => [...prev, result.secure_url]);
        } else {
          console.error('Upload failed:', result);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
    setUploading(false);
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
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
              {...register('price', { required: 'Price is required', min: 0 })}
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

        <div>
          <label className="block text-sm font-medium mb-2">Images (Upload multiple; first will be primary) *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full p-3 border rounded-md"
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {uploading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </main>
  );
}