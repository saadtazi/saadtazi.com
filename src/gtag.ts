export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

function isValidTrackingId(
  trackingId: string | undefined
): trackingId is string {
  if (trackingId === undefined) {
    return false;
  }
  return true;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (isValidTrackingId(GA_TRACKING_ID)) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
    return;
  }
  console.warn('gtag not configured');
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (isValidTrackingId(GA_TRACKING_ID)) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    return;
  }
  console.warn('gtag not configured');
};
