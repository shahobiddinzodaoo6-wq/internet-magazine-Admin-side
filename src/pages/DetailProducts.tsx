import { ArrowLeft, Save, X, Plus, Upload, Trash2, Camera, Bold, Italic, Link as LinkIcon, List as ListIcon, ListOrdered, Type } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { getProductById, addProduct, updateProduct, getCategories, getBrands, getColors, addImageToProduct } from '../api/productApi/productApi'
import { API_IMAGE } from '../utils/url'
import { useForm } from 'react-hook-form'

const DetailProducts = () => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('id')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentProduct, categories, brands, colors } = useSelector((state: RootState) => state.product)
  
  const { register, handleSubmit, reset, setValue, watch } = useForm()
  const [selectedImages, setSelectedImages] = useState<any[]>([])
  const [hasDifferentOptions, setHasDifferentOptions] = useState(false)
  const [selectedColor, setSelectedColor] = useState<number | null>(null)



  
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getBrands())
    dispatch(getColors())
    
    if (productId) {
      dispatch(getProductById(Number(productId)))
    } else {
      reset({
        productName: '',
        code: '',
        description: '',
        price: '',
        discount: '',
        count: '',
        categoryId: '',
        brandId: '',
        hasTax: false
      })
    }
  }, [productId, dispatch, reset])

  useEffect(() => {
    if (currentProduct && productId) {
      reset({
        productName: currentProduct.productName,
        code: currentProduct.code,
        description: currentProduct.description,
        price: currentProduct.price,
        discount: currentProduct.discount,
        count: currentProduct.quantity,
        categoryId: currentProduct.categoryId,
        brandId: currentProduct.brandId,
      })
      setSelectedColor(currentProduct.colorId)
    }
  }, [currentProduct, productId, reset])

  const onSubmit = async (data: any) => {
    try {
      const isEdit = !!productId;
      
      if (!isEdit) {
        if (selectedImages.length === 0) {
          alert("Please select at least one image for the product.");
          return;
        }
        // For Adding Product: Use FormData as per Swagger (multipart/form-data)
        const formData = new FormData();
        formData.append('ProductName', data.productName);
        formData.append('Code', data.code || "");
        formData.append('Description', data.description || "");
        formData.append('Price', String(data.price || 0));
        formData.append('Quantity', String(data.count || 0));
        formData.append('BrandId', String(data.brandId || 0));
        formData.append('ColorId', String(selectedColor || 0));
        formData.append('SubCategoryId', String(data.categoryId || 0));
        formData.append('HasDiscount', String(Number(data.discount) > 0));
        formData.append('DiscountPrice', String(data.discount || 0));
        
        // Add images to the initial product creation if any
        if (selectedImages.length > 0) {
          selectedImages.forEach((imgObj: any) => {
            formData.append('Images', imgObj.file);
          });
        }

        const resultAction = await dispatch(addProduct(formData));
        
        if (addProduct.fulfilled.match(resultAction)) {
           navigate('/Products');
        }
      } else {
        // For Updating Product: Use query parameters as per Swagger
        const payload: any = {
          Id: Number(productId),
          ProductName: data.productName,
          Code: data.code || "",
          Description: data.description || "",
          Price: Number(data.price) || 0,
          Quantity: Number(data.count) || 0,
          BrandId: Number(data.brandId) || 0,
          ColorId: Number(selectedColor) || 0,
          SubCategoryId: Number(data.categoryId) || 0,
          HasDiscount: Number(data.discount) > 0,
          DiscountPrice: Number(data.discount) || 0,
        }

        const resultAction = await dispatch(updateProduct(payload));
        
        if (updateProduct.fulfilled.match(resultAction)) {
          // After updating product info, upload new images if any
          if (selectedImages.length > 0) {
            const imgData = new FormData();
            imgData.append('ProductId', String(productId));
            selectedImages.forEach((imgObj: any) => {
              imgData.append('Files', imgObj.file);
            });
            await dispatch(addImageToProduct(imgData));
          }
          navigate('/Products');
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file)
      }))
      setSelectedImages(prev => [...prev, ...filesArray])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='bg-[#f8f9fb] min-h-screen p-8'>
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/Products')}
              className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {productId ? 'Edit Product' : 'Products / Add new'}
            </h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/Products')}
              className="px-6 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200 flex items-center gap-2"
            >
              <Save size={18} />
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* LEFT COLUMN: Main Info */}
          <div className="col-span-2 space-y-6">
            {/* Information Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">Information</h2>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product name</label>
                  <input 
                    {...register('productName')}
                    type="text" 
                    placeholder="Enter product name"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                  <input 
                    {...register('code')}
                    type="text" 
                    placeholder="Code"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 p-2 border-b border-gray-100 bg-gray-50/30">
                    <button type="button" className="p-1.5 hover:bg-white rounded text-gray-500"><Bold size={16} /></button>
                    <button type="button" className="p-1.5 hover:bg-white rounded text-gray-500"><Italic size={16} /></button>
                    <button type="button" className="p-1.5 hover:bg-white rounded text-gray-500"><LinkIcon size={16} /></button>
                    <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-white rounded text-gray-500"><ListIcon size={16} /></button>
                    <button type="button" className="p-1.5 hover:bg-white rounded text-gray-500"><ListOrdered size={16} /></button>
                    <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-white rounded text-gray-500"><Type size={16} /></button>
                  </div>
                  <textarea 
                    {...register('description')}
                    rows={6}
                    placeholder="Description"
                    className="w-full px-4 py-3 bg-white outline-none resize-none text-sm"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <select 
                    {...register('categoryId')}
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brands</label>
                  <select 
                    {...register('brandId')}
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  >
                    <option value="">Select Brand</option>
                    {brands?.map((brand: any) => (
                      <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">Price</h2>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="relative">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Product price</label>
                   <input 
                    {...register('price')}
                    type="number" 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all pr-12"
                   />
                </div>
                <div className="relative">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                   <input 
                    {...register('discount')}
                    type="number" 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all pr-12"
                   />
                </div>
                <div className="relative">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Count</label>
                   <input 
                    {...register('count')}
                    type="number" 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all pr-12"
                   />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  onClick={() => setValue('hasTax', !watch('hasTax'))}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${watch('hasTax') ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${watch('hasTax') ? 'right-1' : 'left-1'}`}></div>
                </div>
                <span className="text-sm font-medium text-gray-700">Add tax for this product</span>
                <input type="checkbox" {...register('hasTax')} className="hidden" />
              </div>
            </div>

            {/* Options Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-1">
                 <h2 className="text-lg font-semibold text-gray-900">Different Options</h2>
                 <div 
                  onClick={() => setHasDifferentOptions(!hasDifferentOptions)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${hasDifferentOptions ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${hasDifferentOptions ? 'right-1' : 'left-1'}`}></div>
                </div>
               </div>
               <p className="text-sm text-gray-500 mb-8 font-normal leading-6">This product has multiple options, like different sizes or colors</p>

               {hasDifferentOptions && (
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                         <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold">Option 1</label>
                         <input type="text" defaultValue="Size" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold">Value</label>
                         <div className="flex flex-wrap gap-2 p-2 bg-gray-50/50 border border-gray-200 rounded-xl min-h-[46px]">
                            {['S', 'M', 'L', 'XL'].map(size => (
                              <span key={size} className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-semibold">
                                {size} <X size={12} className="cursor-pointer" />
                              </span>
                            ))}
                         </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                         <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold">Option 2</label>
                         <input type="text" defaultValue="Weight" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold">Value</label>
                         <div className="flex flex-wrap gap-2 p-2 bg-gray-50/50 border border-gray-200 rounded-xl min-h-[46px]">
                            {['10', '20', '30', '40'].map(val => (
                              <span key={val} className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-semibold">
                                {val} <X size={12} className="cursor-pointer" />
                              </span>
                            ))}
                         </div>
                       </div>
                    </div>
                    <button className="text-blue-600 flex items-center gap-2 font-semibold text-sm">
                      <Plus size={16} /> Add more
                    </button>
                 </div>
               )}
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Elements */}
          <div className="space-y-8">
            {/* Colour Selection */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Colour:</h2>
                <button className="text-blue-600 text-sm font-semibold flex items-center gap-1">
                  <Plus size={14} /> Create new
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors?.map((color: any) => (
                  <div 
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-9 h-9 rounded-full cursor-pointer border-2 shadow-sm transition-all flex items-center justify-center ${selectedColor === color.id ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.colorHex || '#ccc' }}
                  >
                    {selectedColor === color.id && <div className="w-3 h-3 bg-white/40 rounded-full"></div>}
                  </div>
                ))}
                {/* Dummy fallback colors if API is empty */}
                {(!colors || colors.length === 0) && ['#aed3f2', '#e87c7c', '#6366f1', '#fbbf24', '#10b981', '#4b5563'].map((c, i) => (
                   <div 
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-9 h-9 rounded-full cursor-pointer border-2 shadow-sm transition-all ${selectedColor === i ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: c }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Tags Input */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">Tags</h2>
              <div className="flex items-center gap-2 mb-4">
                 <input 
                  type="text" 
                  placeholder="Tags name"
                  className="flex-1 px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm"
                 />
                 <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100"><Save size={20} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['T-Shirt', 'Men Clothes', 'Summer Collection'].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold leading-none">
                    {tag} <X size={14} className="cursor-pointer opacity-60" />
                  </span>
                ))}
              </div>
            </div>

            {/* Images Upload */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">Images</h2>
              
              <label className="block w-full border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/10 transition-all mb-6">
                 <input type="file" multiple className="hidden" onChange={handleImageChange} />
                 <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={24} className="text-gray-400" />
                 </div>
                 <p className="text-sm font-bold text-gray-900 mb-1">Click to upload <span className="font-normal text-gray-500">or drag and drop</span></p>
                 <p className="text-[11px] text-gray-400">(SVG, JPG, PNG, or gif maximum 900x400)</p>
              </label>

              <div className="space-y-3">
                 <div className="grid grid-cols-3 text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1 px-4">
                   <div className="col-span-2">Image</div>
                   <div className="text-right">Action</div>
                 </div>
                 
                 {selectedImages.map((img, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 overflow-hidden">
                           <img src={img.url} className="w-full h-full object-cover" />
                         </div>
                         <span className="text-xs font-medium text-gray-600 truncate max-w-[120px]">{img.file.name}</span>
                      </div>
                      <button onClick={() => removeImage(i)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                   </div>
                 ))}

                 {productId && currentProduct?.images?.map((img, i) => (
                   <div key={`existing-${i}`} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 overflow-hidden">
                           <img src={`${API_IMAGE}/${img}`} className="w-full h-full object-cover" />
                         </div>
                         <span className="text-xs font-medium text-gray-600 truncate max-w-[120px]">Product Image</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProducts
