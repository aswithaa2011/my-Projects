import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaChartBar, FaBoxes } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // State for Categories
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    stockQuantity: "",
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("adminCategories");
    if (saved) {
      setCategories(JSON.parse(saved));
    }
  }, []);

  // Save to local storage whenever categories change
  useEffect(() => {
    localStorage.setItem("adminCategories", JSON.stringify(categories));
  }, [categories]);

  const handleLogout = () => {
    navigate("/admin/login");
  };

  const openModal = (category = null) => {
    if (category) {
      setFormData({
        productName: category.productName,
        category: category.category,
        stockQuantity: category.stockQuantity,
      });
      setEditingId(category.id);
    } else {
      setFormData({ productName: "", category: "", stockQuantity: "" });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.category || !formData.stockQuantity) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setCategories(
        categories.map((c) =>
          c.id === editingId
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      const newCategory = {
        id: Date.now().toString(),
        ...formData,
      };
      setCategories([...categories, newCategory]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#8E1C9D] text-white flex flex-col pt-6 hidden md:flex shadow-xl">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold tracking-wider">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/20 hover:bg-white/30 transition shadow-sm">
            <FaChartBar /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition">
            <FaBoxes /> Categories
          </a>
        </nav>
        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-white text-[#8E1C9D] font-bold hover:bg-gray-100 transition shadow-md"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header (Mobile Logo/Logout placeholder config) */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center md:hidden">
            <h2 className="text-xl font-bold text-[#8E1C9D]">Admin Panel</h2>
            <button onClick={handleLogout} className="text-[#8E1C9D]">
              <FaSignOutAlt size={20} />
            </button>
        </header>

        <div className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto">
          {/* Performance & Status Dashboard */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Purchase Order Status */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div> Purchase Order Status
                  </h3>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-sm mb-1 font-medium"><span>Pending</span><span>45%</span></div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm mb-1 font-medium"><span>Processing</span><span>30%</span></div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm mb-1 font-medium"><span>Completed</span><span>25%</span></div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Performance Graph Mockup */}
              <div className="bg-white p-6 rounded-3xl shadow-md border border-purple-50 hover:shadow-xl transition-all duration-300 group">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse"></div> Weekly Traffic
                      </div>
                      <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">+24%</span>
                  </h3>
                  <div className="flex items-end justify-between h-36 mt-6 space-x-3">
                      <div className="w-1/5 bg-gray-50 rounded-xl relative overflow-hidden"><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-700 to-pink-400 transition-all duration-700 h-[40%] group-hover:h-[45%] opacity-80"></div></div>
                      <div className="w-1/5 bg-gray-50 rounded-xl relative overflow-hidden"><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-700 to-pink-400 transition-all duration-700 h-[65%] group-hover:h-[70%] opacity-90"></div></div>
                      <div className="w-1/5 bg-gray-50 rounded-xl relative overflow-hidden"><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-700 to-pink-400 transition-all duration-700 h-[50%] group-hover:h-[55%] opacity-85"></div></div>
                      <div className="w-1/5 bg-gray-50 rounded-xl relative overflow-hidden"><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-700 to-pink-400 transition-all duration-700 h-[90%] group-hover:h-[100%] rounded-t-xl opacity-100 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div></div>
                      <div className="w-1/5 bg-gray-50 rounded-xl relative overflow-hidden"><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-700 to-pink-400 transition-all duration-700 h-[75%] group-hover:h-[80%] opacity-90"></div></div>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-gray-400 mt-3 px-1">
                      <span>M</span><span>T</span><span>W</span><span>T</span><span className="text-purple-600 font-bold">F</span>
                  </div>
              </div>
              
            </div>
          </div>

          {/* Categories Management */}
          <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Product Categories</h2>
                <button 
                  onClick={() => openModal()}
                  className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-md transition-all transform hover:scale-105"
                >
                  <FaPlus /> Add Category
                </button>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="p-4 font-semibold">S.No.</th>
                                <th className="p-4 font-semibold">Product Name (PN)</th>
                                <th className="p-4 font-semibold">P. Category</th>
                                <th className="p-4 font-semibold">Stock Quantity</th>
                                <th className="p-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.length > 0 ? (
                              categories.map((cat, index) => (
                                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-500">{index + 1}</td>
                                    <td className="p-4 font-medium text-gray-800">{cat.productName}</td>
                                    <td className="p-4 "><span className="bg-purple-100 text-[#8E1C9D] px-3 py-1 rounded-full text-xs font-semibold">{cat.category}</span></td>
                                    <td className="p-4">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${cat.stockQuantity > 10 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="font-medium text-gray-700">{cat.stockQuantity}</span>
                                      </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => openModal(cat)} className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-400 italic">
                                  No categories found. Click "Add Category" to create one.
                                </td>
                              </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all">
            <div className="bg-[#8E1C9D] px-6 py-4">
                <h3 className="text-xl font-bold text-white">
                  {editingId ? "Edit Category" : "Add New Category"}
                </h3>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name (PN)</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="e.g. Wireless Mouse"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E1C9D] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g. Electronics"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E1C9D] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E1C9D] focus:border-transparent outline-none transition"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#8E1C9D] text-white hover:bg-[#7a1787] font-semibold rounded-lg shadow-md transition"
                >
                  {editingId ? "Save Changes" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
