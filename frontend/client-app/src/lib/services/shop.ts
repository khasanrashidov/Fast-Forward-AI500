import { z } from "zod";
import { apiFetch } from "../api";

const productSchema = z.object({
  all_count: z.number(),
  id: z.number(),
  image: z.string().url(),
  name: z.string(),
  opencard_month_text: z.string(),
  opencard_monthly_payment: z.number(),
  opencard_total_price: z.number(),
  product_url: z.string().url(),
});

const shopSearchDataSchema = z.object({
  insight: z.string(),
  products: z.array(productSchema),
  shown: z.number(),
  total_found: z.number(),
  translated_query: z.string(),
  user_query: z.string(),
});

// Accept both the documented base response shape and the sample "status":"success" shape.
const shopSearchResponseSchema = z.union([
  z.object({
    is_success: z.boolean(),
    message: z.string(),
    data: shopSearchDataSchema,
    errors: z.array(z.string()).optional().nullable(),
  }),
  z.object({
    data: shopSearchDataSchema,
    status: z.string(),
  }),
]);

const shopSearchBodySchema = z.object({
  query: z.string().min(1, "Query is required"),
});

export type ShopProduct = z.infer<typeof productSchema>;
export type ShopSearchResult = z.infer<typeof shopSearchDataSchema>;
export type ShopSearchBody = z.infer<typeof shopSearchBodySchema>;

export async function searchShop(
  payload: ShopSearchBody
): Promise<ShopSearchResult> {
  const body = shopSearchBodySchema.parse(payload);

  const result = await apiFetch<unknown>("/api/shop/search", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const parsed = shopSearchResponseSchema.parse(result);
  if ("data" in parsed) return parsed.data;
  throw new Error("Unexpected shop search response shape.");
}

