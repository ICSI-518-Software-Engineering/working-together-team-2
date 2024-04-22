import { http } from "@/lib/http";
import { CartItemType } from "@/pages/(Dashboard)/CreateOrder/productsStore";
import { CreateOrderFormDataType } from "@/pages/(Dashboard)/CreateOrder/typesAndData";
import { getSignedInUserDetails } from "@/utils/authUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetCatalogServiceRecordType } from "./catalogServices";

/**
 * Create Order Service
 */
type CreateOrderServiceDataType = {
  orderData: CreateOrderFormDataType;
  totalPrice: number;
  cartData: (Pick<CartItemType, "quantity"> & {
    product: Partial<GetCatalogServiceRecordType>;
  })[];
  vendorId: string;
};

const createOrderService = async (data: CreateOrderServiceDataType) => {
  const res = await http.post<string>("/order", data);
  return res.data;
};

export const useCreateOrderService = () => {
  return useMutation({
    mutationFn: createOrderService,
  });
};

/**
 * Get Orders Service
 */
export type OrderStatusType = "Pending" | "Complete" | "Cancelled";
export type GetOrdersHistoryServiceResponseType = {
  _id: string;
  products: CartItemType[];
  vendorId: string;
  customerDetails: Omit<
    CreateOrderFormDataType,
    "deliveryType" | "deliveryDate"
  >;
  price: number;
  status: OrderStatusType;
  deliveryType: "Pickup" | "Delivery";
  deliveryDate: Date;
};

const getOrdersHistoryService = async (vendorId?: string) => {
  const res = await http.get<GetOrdersHistoryServiceResponseType[]>(
    `/order/${vendorId}`
  );
  return res.data;
};

export const useGetOrdersHistoryService = () => {
  const vendorDetails = getSignedInUserDetails();
  return useQuery({
    queryKey: ["getOrdersHistoryService", vendorDetails?._id],
    queryFn: () => getOrdersHistoryService(vendorDetails?._id),
    enabled: Boolean(vendorDetails),
  });
};

/**
 * Update Order Service
 */

const updateOrdersHistoryService = async (
  data: Partial<GetOrdersHistoryServiceResponseType>
) => {
  const { _id, ...updateData } = data;
  const res = await http.put<string>(`/order/${_id}`, updateData);
  return res.data;
};

export const useUpdateOrdersHistoryService = () => {
  return useMutation({
    mutationFn: updateOrdersHistoryService,
  });
};
