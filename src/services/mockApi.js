// Store data in localStorage
const STORAGE_KEY = 'product_data';
const DELETED_ITEMS_KEY = 'deleted_products';

// Initial dummy data
const initialProducts = [
  {
    id: 1,
    title: "iPhone 9",
    brand: "Apple",
    category: "smartphones",
    price: 549,
    rating: 4.69
  },
  {
    id: 2,
    title: "iPhone X",
    brand: "Apple",
    category: "smartphones",
    price: 899,
    rating: 4.44
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    brand: "Samsung",
    category: "smartphones",
    price: 1249,
    rating: 4.09
  },
  {
    id: 4,
    title: "OPPOF19",
    brand: "OPPO",
    category: "smartphones",
    price: 280,
    rating: 4.3
  },
  {
    id: 5,
    title: "Huawei P30",
    brand: "Huawei",
    category: "smartphones",
    price: 499,
    rating: 4.09
  },
  {
    id: 6,
    title: "MacBook Pro",
    brand: "Apple",
    category: "laptops",
    price: 1749,
    rating: 4.57
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    brand: "Samsung",
    category: "laptops",
    price: 1499,
    rating: 4.25
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    brand: "Microsoft Surface",
    category: "laptops",
    price: 1499,
    rating: 4.43
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    brand: "Infinix",
    category: "laptops",
    price: 1099,
    rating: 4.54
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    brand: "HP Pavilion",
    category: "laptops",
    price: 1099,
    rating: 4.43
  }
];

// Initialize localStorage if empty
const initializeStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(DELETED_ITEMS_KEY)) {
    localStorage.setItem(DELETED_ITEMS_KEY, JSON.stringify([]));
  }
};

// Get data from localStorage
const getStoredData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Get deleted items from localStorage
const getDeletedItems = () => {
  const data = localStorage.getItem(DELETED_ITEMS_KEY);
  return data ? JSON.parse(data) : [];
};

// Save data to localStorage
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Save deleted items to localStorage
const saveDeletedItems = (data) => {
  localStorage.setItem(DELETED_ITEMS_KEY, JSON.stringify(data));
};

// Initialize storage when the module is loaded
initializeStorage();

export const mockApi = {
  // Get all products
  getProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredData();
        resolve(products);
      }, 500);
    });
  },

  // Get deleted products
  getDeletedProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deletedProducts = getDeletedItems();
        resolve(deletedProducts);
      }, 500);
    });
  },

  // Update a product
  updateProduct: (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredData();
        const updatedProducts = products.map(product => 
          product.id === id ? { ...product, ...updatedData } : product
        );
        saveData(updatedProducts);
        resolve(updatedProducts);
      }, 500);
    });
  },

  // Delete a product
  deleteProduct: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredData();
        const deletedProduct = products.find(product => product.id === id);
        const updatedProducts = products.filter(product => product.id !== id);
        
        // Add to deleted items
        const deletedItems = getDeletedItems();
        deletedItems.push(deletedProduct);
        saveDeletedItems(deletedItems);
        
        saveData(updatedProducts);
        resolve(updatedProducts);
      }, 500);
    });
  },

  // Restore a deleted product
  restoreProduct: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deletedItems = getDeletedItems();
        const productToRestore = deletedItems.find(item => item.id === id);
        const updatedDeletedItems = deletedItems.filter(item => item.id !== id);
        
        // Add back to products
        const products = getStoredData();
        products.push(productToRestore);
        
        saveData(products);
        saveDeletedItems(updatedDeletedItems);
        resolve(products);
      }, 500);
    });
  },

  // Add a new product
  addProduct: (product) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredData();
        const newProduct = {
          ...product,
          id: Math.max(...products.map(p => p.id)) + 1
        };
        const updatedProducts = [...products, newProduct];
        saveData(updatedProducts);
        resolve(updatedProducts);
      }, 500);
    });
  },

  // Reset to initial data
  resetData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveData(initialProducts);
        saveDeletedItems([]);
        resolve(initialProducts);
      }, 500);
    });
  }
}; 