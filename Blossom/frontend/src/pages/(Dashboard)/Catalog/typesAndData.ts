import { LabelValueType } from "@/lib/constants";
import { z } from "zod";

export const catalogFormDataZodSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    price: z
      .union([z.string(), z.number()])
      .refine((item) => Number(item) >= 0, {
        message: "Price should be greater than  or equal to 0",
      }),
    tags: z.string().array().min(1),
    type: z.enum(["Flower", "Vase", "FlowerAndVase"]),
    stockInNumber: z
      .union([z.string(), z.number()])
      .refine((item) => Number(item) >= 0, {
        message: "Stock should be greater than  or equal to 0",
      }),
  })
  .transform((items) => ({
    ...items,
    price: Number(items.price),
    stockInNumber: Number(items.stockInNumber),
  }));

export type CatalogItemDataType = z.infer<typeof catalogFormDataZodSchema>;

export const catalogProductTypeOptions: LabelValueType[] = [
  {
    label: "Flower",
    value: "Flower",
  },
  {
    label: "Vase",
    value: "Vase",
  },
  {
    label: "Flower & Vase",
    value: "FlowerAndVase",
  },
];

export const defaultCatalogFormData: CatalogItemDataType = {
  description: "",
  image: "",
  name: "",
  price: 0,
  stockInNumber: 0,
  tags: [],
  type: "Flower",
};
