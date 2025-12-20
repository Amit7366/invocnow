"use client";

import TemplateSwitcher from "../Controls/TemplateSwitcher";
import DownloadButton from "./DownloadButton";
import React from "react";

export default function PreviewToolbar({
  printRef,
}: {
  printRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
      <TemplateSwitcher />
      <DownloadButton printRef={printRef} />
    </div>
  );
}
