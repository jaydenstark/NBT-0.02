/* global process */
'use client';

import { useState, useRef } from 'react';
import { useProducts } from '../../hooks/useProducts';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const { products, isLoaded, addProduct, deleteProduct, updateProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'Neat Product',
    type: 'retail',
    description: '',
    sizes: [{ size: '', price: 0, qtyInBox: 1 }],
    image: '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png' // Default placeholder
  });

  const handleAddSize = () => {
    setNewProduct({
      ...newProduct,
      sizes: [...newProduct.sizes, { size: '', price: 0, qtyInBox: 1 }]
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...newProduct.sizes];
    updatedSizes[index][field] = (field === 'price' || field === 'qtyInBox') ? parseFloat(value) || 0 : value;
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let imageUrl = newProduct.image;

    if (imageFile) {
      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        
        if (!cloudName || !uploadPreset) {
          throw new Error("Cloudinary configuration is missing in environment variables.");
        }

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary");
        }

        const data = await response.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image: " + error.message);
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
    // Reset form
    setNewProduct({
      name: '',
      brand: 'Neat Product',
      type: 'retail',
      description: '',
      sizes: [{ size: '', price: 0, qtyInBox: 1 }],
      image: '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png'
    });
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = async (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        let successCount = 0;

        for (const row of data) {
          if (!row.Name) continue; // Skip empty rows

          // Construct product object from Excel row
          const productData = {
            name: row.Name,
            brand: row.Brand || 'Neat Product',
            type: row.Type?.toLowerCase() === 'industrial' ? 'industrial' : 'retail',
            category: row.Category || 'General',
            description: row.Description || '',
            image: row.Image || '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png',
            sizes: [
              {
                size: row.Size || '1',
                price: parseFloat(String(row.Price || '0').replace(/[^0-9.]/g, '')) || 0,
                qtyInBox: parseInt(row['Qty In Box'] || row.QtyInBox) || 1
              }
            ]
          };

          await addProduct(productData);
          successCount++;
        }

        alert(`Successfully imported ${successCount} products from Excel!`);
      } catch (error) {
        console.error("Error importing Excel:", error);
        alert("Failed to parse Excel file. Please ensure it matches the template format.");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleOpenAddModal = () => {
    setNewProduct({
      name: '',
      brand: 'Neat Product',
      type: 'retail',
      description: '',
      sizes: [{ size: '', price: 0, qtyInBox: 1 }],
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
      sizes: product.sizes && product.sizes.length > 0 ? product.sizes.map(s => ({...s, qtyInBox: s.qtyInBox || 1})) : [{ size: '', price: 0, qtyInBox: 1 }],
      image: product.image || '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png'
    });
    setEditingProductId(product.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  if (!isLoaded) return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', color: '#333' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>NBT Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '120px', height: '40px', background: '#e2e8f0', borderRadius: '6px', animation: 'pulse 1.5s infinite' }}></div>
            <div style={{ width: '160px', height: '40px', background: '#e2e8f0', borderRadius: '6px', animation: 'pulse 1.5s infinite' }}></div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', height: '116px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ height: '20px', width: '50%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ height: '40px', width: '30%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <div style={{ height: '50px', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ height: '70px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 15px', gap: '20px' }}>
              <div style={{ height: '20px', width: '20%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ height: '20px', width: '15%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ height: '20px', width: '10%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ height: '20px', width: '25%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ height: '30px', width: '15%', marginLeft: 'auto', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
        `}</style>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', color: '#333' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>NBT Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>View Live Site</a>
            
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              onChange={handleExcelUpload} 
              ref={fileInputRef}
              style={{ display: 'none' }} 
              id="excel-upload"
            />
            <label 
              htmlFor="excel-upload" 
              className="btn btn-outline" 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', opacity: isUploading ? 0.5 : 1 }}
            >
              {isUploading ? 'Importing...' : '📄 Bulk Upload (.xlsx)'}
            </label>

            <button className="btn btn-primary" onClick={handleOpenAddModal} disabled={isUploading}>+ Add New Product</button>
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
                    {product.source === 'sheet' ? (
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        Edit in Google Sheets
                      </span>
                    ) : (
                      <>
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
                      </>
                    )}
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

              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Sizes & Pricing</label>
                {newProduct.sizes.map((sizeObj, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input required type="text" placeholder="Size (e.g., 500ml)" value={sizeObj.size} onChange={e => handleSizeChange(index, 'size', e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <input required type="number" placeholder="Price (GH₵)" value={sizeObj.price || ''} onChange={e => handleSizeChange(index, 'price', e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <input required type="number" placeholder="Qty in Box" value={sizeObj.qtyInBox || 1} onChange={e => handleSizeChange(index, 'qtyInBox', e.target.value)} style={{ flex: 0.5, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} title="Quantity per Box/Case" />
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
