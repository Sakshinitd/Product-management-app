import { useState } from 'react';

const ProductTable = ({ products, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditValue(product.title);
  };

  const handleSave = (id) => {
    onUpdate(id, { title: editValue });
    setEditingId(null);
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              {editingId === product.id ? (
                <div>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <button onClick={() => handleSave(product.id)}>Save</button>
                </div>
              ) : (
                <span onClick={() => handleEdit(product)} style={{ cursor: 'pointer' }}>
                  {product.title}
                </span>
              )}
            </td>
            <td>{product.brand}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>{product.rating}</td>
            <td>
              <button onClick={() => onDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable; 