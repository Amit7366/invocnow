"use client";

import { useRef } from "react";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import ClassicTemplate from "../../templates/Classic";
import ModernTemplate from "../../templates/Modern";
import CompactTemplate from "../../templates/Compact";
import PreviewToolbar from "./PreviewToolbar";


const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  compact: CompactTemplate,
};

export default function InvoicePreview() {
  const { invoice } = useInvoiceStore();
  const Template = templates[invoice.theme];

  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gray-100 p-6 overflow-auto">
      <PreviewToolbar printRef={printRef} />

      <div
        ref={printRef}
        className="mx-auto max-w-[850px] bg-white shadow-lg"
      >
        <Template invoice={invoice} />
      </div>
    </div>
  );
}

// "use client";

// import { useInvoiceStore } from "../../store/useInvoiceStore";
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
