import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import AddProductModal from "./AddProductModal";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 59.99,
    stock: 143,
    sales: 1200,
  },
  {
    id: 2,
    name: "Leather Wallet",
    category: "Accessories",
    price: 39.99,
    stock: 89,
    sales: 800,
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 56,
    sales: 650,
  },
  {
    id: 4,
    name: "Yoga Mat",
    category: "Fitness",
    price: 29.99,
    stock: 210,
    sales: 950,
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Home",
    price: 79.99,
    stock: 78,
    sales: 720,
  },
];

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  return (
    <motion.div
      className=" bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className=" text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg transition duration-300" onClick={handleModalOpen}>
          Add Product
        </button>
      </div>
      <div>
        {/* add product modal */}
        {modalOpen && (
          <AddProductModal
            isModalOpen={modalOpen}
            handleModalClose={handleModalClose}
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                    alt="Product img"
                    className="size-10 rounded-full"
                  />
                  {product.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {product.category.charAt(0).toUpperCase()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {product.sales}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-indigo-400 hover:text-indigo-700 mr-2">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-400 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default ProductsTable;
