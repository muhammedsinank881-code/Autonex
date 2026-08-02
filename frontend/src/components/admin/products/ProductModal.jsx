import React, { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { X, Package, Check, ChevronDown, Search } from "lucide-react";
import VariantSection from "./VariantSection";
import VehicleSection from "./VehicleSection";
import ImageUploader from "./ImageUploader";

/* --- Custom Dropdown Component --- */
const CustomSelect = ({ value, onChange, options, placeholder, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt._id === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-xs font-bold mb-2">{label}</label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border rounded-xl p-3 bg-white flex items-center justify-between text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span
          className={
            selectedOption ? "text-slate-900 font-medium" : "text-slate-400"
          }
        >
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform text-slate-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Floating Scrollable Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-[100] bg-white border border-slate-200 rounded-2xl shadow-xl max-h-60 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Search Header for longer lists */}
          {options.length > 5 && (
            <div className="p-2 border-b bg-slate-50 flex items-center gap-2">
              <Search size={14} className="text-slate-400 ml-1" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs outline-none py-1"
                autoFocus
              />
            </div>
          )}

          {/* Scrollable Item List */}
          <div className="overflow-y-auto max-h-48 p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt._id}
                  type="button"
                  onClick={() => {
                    onChange(opt._id);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                    opt._id === value
                      ? "bg-blue-50 text-[#0066B2] font-semibold"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span>{opt.name}</span>
                  {opt._id === value && (
                    <Check size={14} className="text-[#0066B2]" />
                  )}
                </button>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-400 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* --- Main Modal Component --- */
const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  brands = [],
  categories = [],
}) => {
  const [removedImages, setRemovedImages] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      price: 0,
      discountPrice: 0,
      stock: 0,
      brand: "",
      category: "",
      displayPriority: 0,
      isActive: true,
      isFeatured: false,
      images: [],
      variants: [],
      compatibleVehicles: [],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const {
    fields: vehicleFields,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    control,
    name: "compatibleVehicles",
  });

  const addRemovedImage = (publicId) => {
    setRemovedImages((prev) => [...prev, publicId]);
  };

  useEffect(() => {
    setRemovedImages([]);

    if (initialData) {
      reset({
        ...initialData,
        brand: initialData.brand?._id || initialData.brand || "",
        category: initialData.category?._id || initialData.category || "",
        displayPriority: initialData.displayPriority ?? 0,
        images: initialData.images || [],
      });
    } else {
      reset({
        name: "",
        description: "",
        sku: "",
        price: 0,
        discountPrice: 0,
        stock: 0,
        displayPriority: 0,
        brand: brands[0]?._id || "",
        category: categories[0]?._id || "",
        isActive: true,
        isFeatured: false,
        images: [],
        variants: [],
        compatibleVehicles: [],
      });
    }
  }, [initialData, reset, isOpen, brands, categories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Package size={22} className="text-[#0066B2]" />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                {initialData ? "Edit Product" : "Add Product"}
              </h2>

              <p className="text-xs text-slate-500">
                {initialData
                  ? "Update product details"
                  : "Create a new product"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form - Note overflow-visible to prevent clipping floating dropdowns */}
        <form
          onSubmit={handleSubmit((values) => onSubmit(values, removedImages))}
          className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar"
        >
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold mb-2">Product Name</label>

            <input
              {...register("name", {
                required: "Product name is required",
              })}
              className="w-full border rounded-xl p-3"
            />

            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Brand & Category Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Brand is required" }}
              render={({ field }) => (
                <CustomSelect
                  label="Brand"
                  options={brands}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Brand"
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <CustomSelect
                  label="Category"
                  options={categories}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Category"
                />
              )}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold mb-2">Description</label>
            <textarea
              rows={4}
              {...register("description")}
              className="w-full border rounded-xl p-3"
              placeholder="Description..."
            />
          </div>

          {/* Price, Stock & Details */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price", { valueAsNumber: true })}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Discount</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("discountPrice", { valueAsNumber: true })}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Stock</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                {...register("stock", { valueAsNumber: true })}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">SKU</label>
              <input
                placeholder="SKU"
                {...register("sku")}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Priority</label>
              <input
                type="number"
                min={0}
                placeholder="0"
                {...register("displayPriority", { valueAsNumber: true })}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          {/* Images */}
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <ImageUploader
                images={field.value}
                onChange={field.onChange}
                onRemoved={addRemovedImage}
              />
            )}
          />

          {/* Variants */}
          <VariantSection
            fields={variantFields}
            append={appendVariant}
            remove={removeVariant}
            register={register}
            errors={errors}
          />

          {/* Vehicles */}
          <VehicleSection
            fields={vehicleFields}
            append={appendVehicle}
            remove={removeVehicle}
            register={register}
            errors={errors}
          />

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex gap-2 items-center text-sm font-medium">
              <input
                type="checkbox"
                {...register("isActive")}
                className="rounded w-4 h-4"
              />
              Active
            </label>

            <label className="flex gap-2 items-center text-sm font-medium">
              <input
                type="checkbox"
                {...register("isFeatured")}
                className="rounded w-4 h-4"
              />
              Featured
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-xl bg-[#0066B2] text-white flex items-center gap-2 hover:bg-[#005291] transition-colors"
            >
              <Check size={16} />
              {initialData ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
