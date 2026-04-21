import { Folder, Home, List, Tag, Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { getProducts, deleteProduct, getCategories } from '../api/productApi/productApi'
import { API_IMAGE } from '../utils/url'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { products, loading, categories } = useSelector((state: RootState) => state.product)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [page, setPage] = useState(1)
  const pageSize = 8

  useEffect(() => {
    dispatch(getProducts({
      ProductName: searchTerm,
      CategoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
      PageNumber: page,
      PageSize: pageSize
    }))
  }, [dispatch, searchTerm, selectedCategory, page])

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleDelete = (id: number) => {
    if (window.confirm("Оё шумо боварӣ доред, ки ин маҳсулотро нест кардан мехоҳед?")) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <div className='flex min-h-screen bg-[#f8f9fb]'>
      {/* SIDEBAR */}
      <div className="w-[250px] bg-[#0f1b2d] text-white p-4 shrink-0">
        <Link to={"/Dashboard"}>
          <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
            <Home size={20} className="text-gray-400" />
            <span className="font-medium text-gray-400">Dashboard</span>
          </div>
        </Link>

        <div className="mt-6 flex flex-col gap-2">
          <Link to={"/Orders"}>
            <div className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <List size={20} className="text-gray-400" />
                <span className="text-gray-400">Orders</span>
              </div>
              <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full">16</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-white text-gray-900 cursor-pointer shadow-sm">
            <Tag size={20} />
            <span className="font-semibold">Products</span>
          </div>

          <Link to={"/Categories"}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
              <Folder size={20} className="text-gray-400" />
              <span className="text-gray-400">Other</span>
            </div>
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <button
            onClick={() => navigate('/DetailProducts')}
            className="bg-[#3b82f6] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm"
          >
            <Plus size={18} />
            <span>Add product</span>
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6 flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm bg-gray-50/50"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Filter</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none text-sm bg-gray-50/50 min-w-[140px]"
            >
              <option value="all">Newest</option>
              {categories?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
              ))}
            </select>
          </div>

          <div className="ml-auto flex gap-2">
            <button className="p-2.5 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Edit2 size={18} />
            </button>
            <button className="p-2.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px]"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer" /></TableHead>
                <TableHead className="text-gray-500 font-medium py-4">Product</TableHead>
                <TableHead className="text-gray-500 font-medium py-4">Inventory</TableHead>
                <TableHead className="text-gray-500 font-medium py-4">Category</TableHead>
                <TableHead className="text-gray-500 font-medium py-4">Price</TableHead>
                <TableHead className="text-gray-500 font-medium py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-400">Loading products...</TableCell>
                </TableRow>
              ) : !Array.isArray(products) || products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-400">No products found</TableCell>
                </TableRow>
              ) : products.map((product: any) => (
                <TableRow key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  <TableCell>
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                        <img
                          src={product.image ? `${API_IMAGE}/${product.image}` : '/placeholder-product.png'}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{product.productName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {product.quantity > 0 ? (
                        <span className="text-gray-600 text-sm">{product.quantity} in stock</span>
                      ) : (
                        <span className="bg-blue-50 text-[#3b82f6] px-2 py-0.5 rounded text-[11px] font-medium border border-blue-100">Out of Stock</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 text-sm">{product.categoryName || 'T-Shirt'}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-gray-900">${product.price?.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/DetailProducts?id=${product.id}`)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30"
                disabled={page === 1}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6].map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${page === p ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    {p}
                  </button>
                ))}
                <span className="text-gray-400 px-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">24</button>
              </div>
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <span className="text-sm text-gray-500">274 Results</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
