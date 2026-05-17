'use client';

import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { storage } from '../../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const { products, isLoaded, addProduct, deleteProduct, updateProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'Neat Product',
    type: 'retail',
    description: '',
    specs: '',
    sizes: [{ size: '', price: 0 }],
    image: '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png' // Default placeholder
  });

  const handleAddSize = () => {
    setNewProduct({
      ...newProduct,
      sizes: [...newProduct.sizes, { size: '', price: 0 }]
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...newProduct.sizes];
    updatedSizes[index][field] = field === 'price' ? parseFloat(value) || 0 : value;
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let imageUrl = newProduct.image;

    if (imageFile) {
      try {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadTask.ref);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
        setIsUploading(false);
        return;
      }
    }

    const finalProduct = { ...newProduct, image: imageUrl };
    
    if (isEditing) {
      await updateProduct({ ...finalProduct, id: editingProductId });
    } else {
      await addProduct(finalProduct);
    }
    
    setIsModalOpen(false);
    setIsUploading(false);
    setImageFile(null);
    // Reset form
    setNewProduct({
      name: '',
      brand: 'Neat Product',
      type: 'retail',
      description: '',
      specs: '',
      sizes: [{ size: '', price: 0 }],
      image: '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png'
    });
  };

  const handleOpenAddModal = () => {
    setNewProduct({
      name: '',
      brand: 'Neat Product',
      type: 'retail',
      description: '',
      specs: '',
      sizes: [{ size: '', price: 0 }],
      image: '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png'
    });
    setEditingProductId(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      name: product.name || '',
      brand: product.brand || 'Neat Product',
      type: product.type || 'retail',
      description: product.description || '',
      specs: product.specs || '',
      sizes: product.sizes && product.sizes.length > 0 ? product.sizes : [{ size: '', price: 0 }],
      image: product.image || '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png'
    });
    setEditingProductId(product.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  if (!isLoaded) return <div style={{ padding: '40px' }}>Loading Admin Dashboard...</div>;

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', color: '#333' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>NBT Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>View Live Site</a>
            <button className="btn btn-primary" onClick={handleOpenAddModal}>+ Add New Product</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>Total Products</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>{products.length}</p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>Retail Items</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>{products.filter(p => p.type === 'retail').length}</p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>Industrial Solutions</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>{products.filter(p => p.type === 'industrial').length}</p>
          </div>
        </div>

        {/* Product Table */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--bg-surface)' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Brand</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Type</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Sizes/Prices</th>
                <th style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}><strong>{product.name}</strong></td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>{product.brand}</td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem',
                      background: product.type === 'retail' ? '#e0f2fe' : '#fef3c7',
                      color: product.type === 'retail' ? '#0369a1' : '#b45309'
                    }}>
                      {product.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
                    {product.sizes.map(s => `${s.size} (GH₵${s.price})`).join(', ')}
                  </td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleEditProduct(product)}
                      style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '10px' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${product.name}? This action cannot be undone.`)) {
                          deleteProduct(product.id);
                        }
                      }}
                      style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Product Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Product Name</label>
                <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Brand</label>
                  <select value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                    <option value="Neat Product">Neat Product</option>
                    <option value="Deva Products">Deva Products</option>
                    <option value="NBT GLOBAL">NBT GLOBAL</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Type</label>
                  <select value={newProduct.type} onChange={e => setNewProduct({...newProduct, type: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Description</label>
                <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Specifications (e.g., Highly Concentrated | Multi-Surface)</label>
                <input required type="text" value={newProduct.specs} onChange={e => setNewProduct({...newProduct, specs: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Sizes & Pricing</label>
                {newProduct.sizes.map((sizeObj, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input required type="text" placeholder="Size (e.g., 500ml)" value={sizeObj.size} onChange={e => handleSizeChange(index, 'size', e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <input required type="number" placeholder="Price (GH₵)" value={sizeObj.price || ''} onChange={e => handleSizeChange(index, 'price', e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                  </div>
                ))}
                <button type="button" onClick={handleAddSize} style={{ background: 'none', border: '1px dashed #ccc', padding: '8px', width: '100%', borderRadius: '4px', cursor: 'pointer' }}>+ Add Another Size</button>
              </div>

              <button type="submit" disabled={isUploading} className="btn btn-primary" style={{ marginTop: '10px', padding: '15px', opacity: isUploading ? 0.7 : 1 }}>
                {isUploading ? 'Uploading...' : isEditing ? 'Update Product' : 'Save Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
