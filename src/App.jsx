import { useState, useEffect } from 'react'
import { mockApi } from './services/mockApi'
import ProductTable from './components/ProductTable'
import FilterBar from './components/FilterBar'
import DeletedItems from './components/DeletedItems'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [deletedProducts, setDeletedProducts] = useState([])
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    price: '',
    rating: ''
  })

  useEffect(() => {
    loadProducts()
    loadDeletedProducts()
  }, [])

  const loadProducts = async () => {
    const data = await mockApi.getProducts()
    setProducts(data)
  }

  const loadDeletedProducts = async () => {
    const data = await mockApi.getDeletedProducts()
    setDeletedProducts(data)
  }

  const handleUpdate = async (id, updatedData) => {
    const updatedProducts = await mockApi.updateProduct(id, updatedData)
    setProducts(updatedProducts)
  }

  const handleDelete = async (id) => {
    const updatedProducts = await mockApi.deleteProduct(id)
    setProducts(updatedProducts)
    await loadDeletedProducts()
  }

  const handleRestore = async (id) => {
    const updatedProducts = await mockApi.restoreProduct(id)
    setProducts(updatedProducts)
    await loadDeletedProducts()
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const filteredProducts = products.filter(product => {
    return (
      (!filters.brand || product.brand === filters.brand) &&
      (!filters.category || product.category === filters.category) &&
      (!filters.price || product.price === Number(filters.price)) &&
      (!filters.rating || product.rating === Number(filters.rating))
    )
  })

  return (
    <div className="container">
      <h1>Product Management</h1>
      <div className="filter-section">
        <FilterBar
          products={filteredProducts}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="table-container">
        <ProductTable
          products={filteredProducts}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
      <DeletedItems
        deletedProducts={deletedProducts}
        onRestore={handleRestore}
      />
    </div>
  )
}

export default App
