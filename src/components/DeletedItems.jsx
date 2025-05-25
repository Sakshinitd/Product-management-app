const DeletedItems = ({ deletedProducts, onRestore }) => {
  if (deletedProducts.length === 0) {
    return null;
  }

  return (
    <div className="deleted-items-section">
      <h2>Deleted Items</h2>
      <div className="deleted-items-list">
        {deletedProducts.map((product) => (
          <div key={product.id} className="deleted-item">
            <span>{product.title}</span>
            <span className="item-details">
              {product.brand} | {product.category} | ${product.price}
            </span>
            <button onClick={() => onRestore(product.id)}>Restore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletedItems; 