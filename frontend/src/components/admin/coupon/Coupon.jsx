import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  X,
  Edit2,
  Trash2,
  Copy,
  Check,
  Tag,
  Calendar,
  Percent,
  AlertCircle,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useCoupons } from "../../../hooks/coupon/useCoupons";
import { useCreateCoupon } from "../../../hooks/coupon/useCreateCoupon";
import { useUpdateCoupon } from "../../../hooks/coupon/useUpdateCoupon";
import { useDeleteCoupon } from "../../../hooks/coupon/useDeleteCoupon";

export default function CouponDashboard() {
  const {
    data,
    isLoading: couponsLoading,
    isError: couponsError,
    refetch,
  } = useCoupons();

  const coupons = data?.data ?? [];

  const createCouponMutation = useCreateCoupon();
  const updateCouponMutation = useUpdateCoupon();
  const deleteCouponMutation = useDeleteCoupon();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal Control States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [deletingCouponId, setDeletingCouponId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Copy coupon code to clipboard
  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    showToast(`Code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle Featured status
  const handleToggleFeatured = (coupon) => {
    updateCouponMutation.mutate(
      {
        id: coupon.id,
        updatedData: { ...coupon, isFeatured: !coupon.isFeatured },
      },
      {
        onSuccess: () => {
          showToast(
            `Coupon marked as ${!coupon.isFeatured ? "Featured" : "Unfeatured"}`,
          );
        },
        onError: (err) => {
          showToast(err?.message || "Failed to update featured status");
        },
      },
    );
  };


  // Delete Handler
  const handleConfirmDelete = () => {
    if (!deletingCouponId) return;
    deleteCouponMutation.mutate(deletingCouponId, {
      onSuccess: () => {
        setDeletingCouponId(null);
        showToast("Coupon deleted successfully");
      },
      onError: (err) => {
        showToast(err?.message || "Failed to delete coupon");
      },
    });
  };

  // Filtered Coupons Computation
  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesSearch =
        (coupon.code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (coupon.applicableProducts || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        (coupon.status || "").toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [coupons, searchTerm, statusFilter]);

  // Paginated data
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage) || 1;
  const paginatedCoupons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCoupons.slice(start, start + itemsPerPage);
  }, [filteredCoupons, currentPage]);

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#0066B2]" />
          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Coupon
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search coupons..."
              className="w-full text-xs pl-9 pr-8 py-2 rounded-lg border border-slate-200 bg-white placeholder-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20 focus:border-[#0066B2] transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Refresh Data Button */}
          <button
            onClick={() => refetch()}
            title="Refresh"
            className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition self-center"
          >
            <RefreshCw
              className={`w-4 h-4 ${couponsLoading ? "animate-spin" : ""}`}
            />
          </button>

          {/* Add Coupon Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0066B2] hover:bg-[#005290] active:scale-95 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Coupon
          </button>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white w-full rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs flex flex-col text-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">End Date</th>
                <th className="py-3 px-4 text-center">IsFeatured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {couponsLoading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#0066B2]" />
                      <span>Loading coupons...</span>
                    </div>
                  </td>
                </tr>
              ) : couponsError ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-red-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-500" />
                      <p className="text-sm font-semibold">
                        Failed to load coupons
                      </p>
                      <button
                        onClick={() => refetch()}
                        className="text-xs text-[#0066B2] underline hover:text-[#005290]"
                      >
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>
              ) : paginatedCoupons.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <AlertCircle className="w-7 h-7 stroke-1 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600">
                        There are no coupons
                      </p>
                      <p className="text-xs text-slate-400">
                        Try clearing your search filters or click "Add Coupon"
                        to create one.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedCoupons.map((c) => (
                  <tr
                    key={c.id || c._id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Code & Copy Button */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1 rounded font-semibold tracking-wide">
                          {c.code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(c.code, c.id || c._id)}
                          className="text-slate-400 hover:text-[#0066B2] transition p-1 rounded hover:bg-slate-100"
                          title="Copy Code"
                        >
                          {copiedId === (c.id || c._id) ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Discount Value / Percentage */}
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {c.type === "percentage" ? (
                        <span className="inline-flex items-center gap-1 text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-medium">
                          <Percent className="w-3 h-3" /> {c.discountPercentage}% OFF
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                          <DollarSign className="w-3 h-3" /> ${c.discountPercentage}{" "}
                          OFF
                        </span>
                      )}
                    </td>

                    {/* Products */}
                    <td
                      className="py-3 px-4 text-slate-600 max-w-xs truncate"
                      title={c.applicableProducts}
                    >
                      {c.applicableProducts || "All Products"}
                    </td>

                    {/* Start Date */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.startDate}</span>
                      </div>
                    </td>

                    {/* End Date */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.endDate}</span>
                      </div>
                    </td>

                    {/* Is Featured Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        className={`p-1.5 rounded-full transition  ${
                          c.isFeatured
                            ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                            : "text-slate-300 hover:text-slate-400"
                        }`}
                        title={c.isFeatured ? "Featured" : "Mark as Featured"}
                      >
                        <Sparkles
                          className={`w-4 h-4 ${
                            c.isFeatured ? "fill-amber-400" : ""
                          }`}
                        />
                      </button>
                    </td>

                    {/* Status Badge & Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition disabled:opacity-50 ${
                          c.isActive === "Active"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            c.isActive === true
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        ></span>
                        {c.isActive}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingCoupon(c)}
                          className="p-1.5 text-slate-500 hover:text-[#0066B2] hover:bg-blue-50 rounded-md transition"
                          title="Edit Coupon"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingCouponId(c.id || c._id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredCoupons.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(currentPage * itemsPerPage, filteredCoupons.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredCoupons.length}
            </span>{" "}
            coupons
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {(isAddModalOpen || editingCoupon) && (
        <CouponFormModal
          isOpen={isAddModalOpen || Boolean(editingCoupon)}
          initialData={editingCoupon}
          isSubmitting={
            createCouponMutation.isPending || updateCouponMutation.isPending
          }
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingCoupon(null);
          }}
          onSubmit={(formData) => {
            if (editingCoupon) {
              const targetId = editingCoupon.id || editingCoupon._id;
              updateCouponMutation.mutate(
                { id: targetId, data: formData },
                {
                  onSuccess: () => {
                    showToast("Coupon updated successfully!");
                    setIsAddModalOpen(false);
                    setEditingCoupon(null);
                  },
                  onError: (err) => {
                    showToast(err?.message || "Failed to update coupon");
                  },
                },
              );
            } else {
              createCouponMutation.mutate(formData, {
                onSuccess: () => {
                  showToast("New coupon created successfully!");
                  setIsAddModalOpen(false);
                  setEditingCoupon(null);
                },
                onError: (err) => {
                  showToast(err?.message || "Failed to create coupon");
                },
              });
            }
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingCouponId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Delete Coupon?
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete this coupon? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingCouponId(null)}
                disabled={deleteCouponMutation.isPending}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteCouponMutation.isPending}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
              >
                {deleteCouponMutation.isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CouponFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    type: initialData?.type || "percentage",
    discountPercentage: initialData?.discountPercentage,
    applicableProducts: initialData?.applicableProducts || "All Products",
    startDate: initialData?.startDate || new Date().toISOString().split("T")[0],
    endDate: initialData?.endDate || "",
    isFeatured: initialData?.isFeatured || false,
    status: initialData?.status || "Active",
  });

  if (!isOpen) return null;

  const handleGenerateCode = () => {
    const random =
      "PROMO" + Math.random().toString(36).substring(2, 7).toUpperCase();
    setFormData((prev) => ({ ...prev, code: random }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden my-8">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#0066B2]" />
            <h2 className="text-sm font-bold text-slate-800">
              {initialData ? "Edit Coupon" : "Create New Coupon"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Code */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Coupon Code <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="e.g. SUMMER2026"
                className="flex-1 font-mono uppercase px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20 focus:border-[#0066B2]"
              />
              <button
                type="button"
                onClick={handleGenerateCode}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition text-[11px]"
              >
                Auto-Generate
              </button>
            </div>
          </div>

          {/*  Value */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="99"
                required
                value={formData.discountPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercentage : Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20 focus:border-[#0066B2]"
              />
            </div>
          </div>

          {/* Applicable Products */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Products / Categories
            </label>
            <input
              type="text"
              value={formData.applicableProducts}
              onChange={(e) =>
                setFormData({ ...formData, applicableProducts: e.target.value })
              }
              placeholder="e.g. All Products, Electronics"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20 focus:border-[#0066B2]"
            />
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20 focus:border-[#0066B2]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20 focus:border-[#0066B2]"
              />
            </div>
          </div>

          {/* Status & Featured Checks */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
                className="rounded border-slate-300 text-[#0066B2] focus:ring-[#0066B2]"
              />
              Mark as Featured
            </label>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Status:</span>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#0066B2] hover:bg-[#005290] text-white font-bold rounded-lg shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : initialData ? (
                "Save Changes"
              ) : (
                "Create Coupon"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
