"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function AddProduct() {
  const router = useRouter();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");

  function handleSave() {
    router.push("/seller/produk");
  }

  const fieldClass =
    "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-seller-ink placeholder:text-seller-muted outline-none focus:border-seller-navy/40";

  return (
    <div className="flex-1 overflow-y-auto bg-seller-canvas">
      <div className="flex items-center justify-between px-8 pb-6 pt-8">
        <h1 className="text-[28px] font-bold tracking-tight text-seller-ink">{t("seller.addNewProduct")}</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/seller/produk")}
            className="rounded-xl border border-[#E4E8F1] bg-white px-5 py-2.5 text-sm font-semibold text-seller-ink"
          >
            {t("admin.cancel")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-seller-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            {t("seller.saveProduct")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 px-8 pb-10 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h2 className="text-lg font-bold text-seller-ink">{t("admin.basicInfo")}</h2>
            <p className="mb-5 mt-1 text-sm text-seller-muted">{t("seller.productInfoSubtitle")}</p>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-seller-ink">
                {t("seller.productName")} <span className="text-[#EF4444]">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("seller.productNamePlaceholder")}
                className={fieldClass}
              />
              <p className="mt-1.5 text-xs text-seller-muted">
                {t("seller.productNameHint")}
              </p>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-seller-ink">
                {t("seller.productCategory")} <span className="text-[#EF4444]">*</span>
              </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${fieldClass} text-seller-muted`}>
                <option value="">{t("seller.selectCategory")}</option>
                <option value="laptop">{t("seller.categoryLaptop")}</option>
                <option value="smartphone">{t("seller.categorySmartphone")}</option>
                <option value="audio">{t("seller.categoryAudio")}</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-seller-ink">
                {t("seller.description")} <span className="text-[#EF4444]">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("seller.descriptionPlaceholder")}
                rows={6}
                className={`${fieldClass} resize-none`}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h2 className="text-lg font-bold text-seller-ink">{t("seller.priceStock")}</h2>
            <p className="mb-5 mt-1 text-sm text-seller-muted">{t("seller.priceStockSubtitle")}</p>

            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-seller-ink">
                  {t("seller.salePrice")} <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Rp 0"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-seller-ink">
                  {t("seller.availableStock")} <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-seller-ink">SKU (Stock Keeping Unit)</label>
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Contoh: SAMS-S23-ULT-BLK"
                className={fieldClass}
              />
              <p className="mt-1.5 text-xs text-seller-muted">{t("seller.skuHint")}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
          <h2 className="text-lg font-bold text-seller-ink">{t("seller.productPhotos")}</h2>
          <p className="mb-5 mt-1 text-sm text-seller-muted">{t("seller.photoFormatHint")}</p>

          <div className="mb-5">
            <p className="mb-2 text-sm font-semibold text-seller-ink">{t("seller.mainPhotoRequired")}</p>
            <button
              type="button"
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D6DCE8] bg-[#F8FAFC] text-seller-muted"
            >
              <ImagePlus size={28} />
              <span className="max-w-[200px] text-center text-sm font-medium text-seller-ink/70">
                {t("seller.uploadDropHint")}
              </span>
            </button>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-seller-ink">
              {t("seller.additionalPhotos")} <span className="font-normal text-seller-muted">{t("seller.optional")}</span>
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-[#D6DCE8] bg-[#F8FAFC] text-seller-muted"
                >
                  <Plus size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
