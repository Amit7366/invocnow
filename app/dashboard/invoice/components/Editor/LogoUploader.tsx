"use client";

import { useInvoiceStore } from "@/app/store/useInvoiceStore";

export default function LogoUploader() {
  const { invoice, update } = useInvoiceStore();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      update({
        from: {
          ...invoice.from,
          logo: reader.result as string,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      
      {/* Logo Preview */}
      <div className="group relative h-16 w-16 overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
        {invoice.from.logo ? (
          <img
            src={invoice.from.logo}
            alt="Company Logo"
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-500">
            LOGO
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center
                        bg-black/40 opacity-0 transition
                        group-hover:opacity-100">
          <span className="text-[10px] text-gray-200">
            Change
          </span>
        </div>
      </div>

      {/* Upload Action */}
      <label
        className="cursor-pointer text-xs font-medium text-blue-400
                   transition hover:text-blue-300"
      >
        Upload logo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}
