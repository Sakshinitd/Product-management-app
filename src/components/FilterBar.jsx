const FilterBar = ({ products, filters, onFilterChange }) => {
  // Get unique values for each filter
  const getUniqueValues = (field) => {
    return [...new Set(products.map(product => product[field]))];
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <select
        value={filters.brand || ''}
        onChange={(e) => onFilterChange('brand', e.target.value)}
      >
        <option value="">All Brands</option>
        {getUniqueValues('brand').map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>

      <select
        value={filters.category || ''}
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        {getUniqueValues('category').map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select
        value={filters.price || ''}
        onChange={(e) => onFilterChange('price', e.target.value)}
      >
        <option value="">All Prices</option>
        {getUniqueValues('price').map(price => (
          <option key={price} value={price}>${price}</option>
        ))}
      </select>

      <select
        value={filters.rating || ''}
        onChange={(e) => onFilterChange('rating', e.target.value)}
      >
        <option value="">All Ratings</option>
        {getUniqueValues('rating').map(rating => (
          <option key={rating} value={rating}>{rating}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar; 