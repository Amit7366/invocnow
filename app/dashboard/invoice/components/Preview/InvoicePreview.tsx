"use client";

import PreviewToolbar from "@/app/invoice/components/Preview/PreviewToolbar";
import { useInvoiceStore } from "@/app/store/useInvoiceStore";
import ClassicTemplate from "@/app/templates/Classic";
import CompactTemplate from "@/app/templates/Compact";
import FreshBooksTemplate from "@/app/templates/FreshBooksTemplate";
import ModernTemplate from "@/app/templates/Modern";
import StripeTemplate from "@/app/templates/StripeTemplate";
import ZohoTemplate from "@/app/templates/ZohoTemplate";
import { useRef } from "react";


const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  compact: CompactTemplate,
  stripe: StripeTemplate,
  zoho: ZohoTemplate,
  freshbook: FreshBooksTemplate,
};

export default function InvoicePreview() {
  const { invoice } = useInvoiceStore();
  const Template = templates[invoice.theme];

  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <PreviewToolbar printRef={printRef} />

      <div
        ref={printRef}
        className="print-area mx-auto max-w-[850px] bg-white shadow-lg"
      >
        <Template invoice={invoice} />
      </div>
    </div>
  );
}

// "use client";

// import { useInvoiceStore } from "@/app/store/useInvoiceStore";
// import ClassicTemplate from "../../templates/Classic";
// import CompactTemplate from "../../templates/Compact";
// import ModernTemplate from "../../templates/Modern";
// import TemplateSwitcher from "../Controls/TemplateSwitcher";
// import DownloadButton from "./DownloadButton";

// const templates = {
//   classic: ClassicTemplate,
//   modern: ModernTemplate,
//   compact: CompactTemplate,
// };

// export default function InvoicePreview() {
//   const { invoice } = useInvoiceStore();
//   const Template = templates[invoice.theme];

//   return (
//     <div className="bg-gray-100 dark:bg-gray-950 p-6 overflow-auto">
//       <div className="mx-auto max-w-[850px] bg-white shadow-lg">
//         <Template invoice={invoice} />
//         <TemplateSwitcher />
//         <DownloadButton />
//       </div>
//     </div>
//   );
// }
