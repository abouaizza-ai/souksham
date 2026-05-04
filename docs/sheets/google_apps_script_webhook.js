/**
 * SoukSham Google Sheets Webhook
 *
 * Deploy as a Google Apps Script Web App:
 * - Execute as: Me
 * - Who has access: Anyone with the link
 *
 * Script Properties:
 * - WEBHOOK_SECRET: same value as backend SHEET_WEBHOOK_SECRET
 *
 * Backend should POST JSON:
 * {
 *   "secret": "...",
 *   "order": {...},
 *   "items": [...],
 *   "events": [...]
 * }
 */

const SHEET_NAMES = {
  orders: "orders",
  items: "order_items",
  events: "events",
};

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const payload = JSON.parse(raw);
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");

    if (expectedSecret && payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "UNAUTHORIZED" }, 401);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const orderSheet = getOrCreateSheet_(ss, SHEET_NAMES.orders, ORDER_HEADERS);
    const itemSheet = getOrCreateSheet_(ss, SHEET_NAMES.items, ITEM_HEADERS);
    const eventSheet = getOrCreateSheet_(ss, SHEET_NAMES.events, EVENT_HEADERS);

    const order = payload.order || {};
    orderSheet.appendRow(ORDER_HEADERS.map((h) => valueForHeader_(order, h)));

    const items = Array.isArray(payload.items) ? payload.items : [];
    items.forEach((item) => {
      const row = { order_number: order.order_number, order_id: order.order_id, ...item };
      itemSheet.appendRow(ITEM_HEADERS.map((h) => valueForHeader_(row, h)));
    });

    const events = Array.isArray(payload.events) ? payload.events : [];
    events.forEach((event) => {
      const row = { order_number: order.order_number, order_id: order.order_id, ...event };
      eventSheet.appendRow(EVENT_HEADERS.map((h) => valueForHeader_(row, h)));
    });

    return jsonResponse({
      ok: true,
      order_number: order.order_number || "",
      items_written: items.length,
      events_written: events.length,
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message ? err.message : err) }, 500);
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: "souksham-sheet-webhook" });
}

const ORDER_HEADERS = [
  "created_at",
  "order_id",
  "order_number",
  "order_status",
  "customer_name",
  "phone_local",
  "phone_e164",
  "currency",
  "subtotal_usd",
  "discount_usd",
  "total_usd",
  "item_count",
  "upsell_shown",
  "upsell_decision",
  "upsell_product_slug",
  "upsell_offer_id",
  "landing_page",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "ttclid",
  "sc_click_id",
  "event_id",
  "confirmation_attempts",
  "confirmed_at",
  "delivery_city",
  "delivery_area",
  "address_notes",
  "agent_notes",
  "delivered_at",
  "return_reason",
];

const ITEM_HEADERS = [
  "created_at",
  "order_id",
  "order_number",
  "product_slug",
  "offer_id",
  "title_ar",
  "offer_label_ar",
  "quantity",
  "unit_price_usd",
  "line_total_usd",
  "added_from",
  "is_upsell",
];

const EVENT_HEADERS = [
  "created_at",
  "order_id",
  "order_number",
  "event_id",
  "event_name",
  "source",
  "meta_status",
  "tiktok_status",
  "snap_status",
  "payload_json",
];

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some((cell) => String(cell || "").trim() !== "");
  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function valueForHeader_(obj, header) {
  const value = obj && Object.prototype.hasOwnProperty.call(obj, header) ? obj[header] : "";
  if (value === null || typeof value === "undefined") return "";
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function jsonResponse(body, statusCode) {
  // Apps Script ContentService cannot set arbitrary HTTP status for web apps.
  // Include statusCode in body so backend can inspect it if needed.
  return ContentService.createTextOutput(JSON.stringify({ statusCode: statusCode || 200, ...body }))
    .setMimeType(ContentService.MimeType.JSON);
}
