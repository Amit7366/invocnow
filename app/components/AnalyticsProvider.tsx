"use client";

import GoogleAnalytics from "./GoogleAnalytics";
import AnalyticsPageView from "./AnalyticsPageView";

export default function AnalyticsProvider() {
  return (
    <>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <AnalyticsPageView />
    </>
  );
}
