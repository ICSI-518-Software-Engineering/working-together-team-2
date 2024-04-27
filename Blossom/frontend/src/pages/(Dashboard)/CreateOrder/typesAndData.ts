import { GetCatalogServiceRecordType } from "@/api/catalogServices";
import { LabelValueType } from "@/lib/constants";
import { Dayjs } from "dayjs";
import { z } from "zod";
import { removeCommonWords } from "./removeCommonWords";

export type ProductSearchType = "catalog" | "custom";

export const productTypeOptions: LabelValueType<string, ProductSearchType>[] = [
  {
    label: "Catalog Recommendation",
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
    value: "Pickup",
  },
  {
    label: "Delivery",
    value: "Delivery",
  },
];

export const createOrderZodSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  deliveryType: z.string().min(1, { message: "Delivery type is required" }),
  deliveryDate: z
    .any()
    .optional()
    .transform((item: Dayjs) => (item ? item.toDate() : "")),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});

export type CreateOrderFormDataType = z.infer<typeof createOrderZodSchema>;

/**
 * ========= UTILITY FUNCTIONS ================
 */

/**
 * TRUE indicates the item should be present as part of filter
 * FALSE indicates the item should not be present as part of filter
 */
export const collaborativeFilter = (
  item: GetCatalogServiceRecordType,
  searchString: string
): boolean => {
  // If there is no search string return
  if (!searchString) return true;

  // Split the search tokens at all the spaces
  // const searchTokens = searchString.split(/\s+/).filter();
  const searchTokens = removeCommonWords(searchString);

  /**
   * Return true in all possible cases
   */

  let flag = false;

  if (item.description) {
    flag =
      flag ||
      searchTokens.some((t) =>
        item.description.toLowerCase().includes(t.toLowerCase())
      );
  }

  if (item.name) {
    flag =
      flag ||
      item.name.toLowerCase().includes(searchString.toLowerCase()) ||
      searchString.toLowerCase().includes(item.name.toLowerCase());
  }

  if (item.tags) {
    flag =
      flag ||
      item.tags.some((tag) => {
        let innerFlag = false;
        innerFlag =
          innerFlag ||
          searchTokens.some((token) => {
            let tokenFlag = false;
            // tokenFlag =
            //   tokenFlag ||
            //   distance(token, tag) <= Math.min(token.length, tag.length) / 1.1;

            tokenFlag =
              tokenFlag ||
              token.toLowerCase().includes(tag.toLowerCase()) ||
              tag.toLowerCase().includes(token.toLowerCase());

            return tokenFlag;
          });

        innerFlag =
          innerFlag ||
          tag.toLowerCase().includes(searchString.toLowerCase()) ||
          searchString.toLowerCase().includes(tag.toLowerCase());

        return innerFlag;
      });
  }

  return flag;
};
