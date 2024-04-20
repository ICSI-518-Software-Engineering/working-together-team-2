import { LabelValueType } from "@/lib/constants";
import { z } from "zod";

export const productTypeOptions: LabelValueType[] = [
  {
    label: "Catalog",
    value: "catalog",
  },
  {
    label: "Custom",
    value: "custom",
  },
];

export const deliveryTypeOptions: LabelValueType[] = [
  {
    label: "Pickup",
    value: "pickup",
  },
  {
    label: "Delivery",
    value: "delivery",
  },
];

export const createOrderZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  productType: z.string(),
  deliveryType: z.string(),
  deliveryDate: z.union([z.date(), z.string()]).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});

export type CreateOrderFormDataType = z.infer<typeof createOrderZodSchema>;
