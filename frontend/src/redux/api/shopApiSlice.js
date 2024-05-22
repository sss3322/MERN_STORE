

import { apiSlice } from "./apiSlice";
import { SHOP_URL } from "../constants";

export const shopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    shopRegister: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    shopLogout: builder.mutation({
      query: () => ({
        url: `${SHOP_URL}/logout`, 
        method: "POST",
      }),
    }),
shopProfile: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/profile`, 
        method: "PUT",
        body: data,
      }),
    }),
    
    shopLogin: builder.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    getShopOrders: builder.query({
      query: () => ({
        url: `${SHOP_URL}/orders`,
      }),
      keepUnusedDataFor: 5,
    }),
  
    getShopTotalOrders: builder.query({
      query: () => `${SHOP_URL}/total-shoporders`,
    }),

    getShopTotalSales: builder.query({
      query: () => `${SHOP_URL}/total-shopsales`,
    }),

    getShopTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
    getShop: builder.query({
      query: () => ({
        url: `${SHOP_URL}/profile`,
        // method:"GET"
      }),
      providesTags: ["Shop"],
      keepUnusedDataFor: 5,
    }),
    createShopProduct: builder.mutation({
      query: (productData) => ({
        url: `${SHOP_URL}/createproduct`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    allShopProducts: builder.query({
      query: () => `${SHOP_URL}/Products`,
    }),
    deleteShopProduct: builder.mutation({
      query: (productId) => ({
        url: `${SHOP_URL}/delete/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Shop"],
    }),
    updateShopProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${SHOP_URL}/update/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    getShopProductById: builder.query({
      query: (productId) => `${SHOP_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Shop", id: productId },
      ],
    }),

  }),
});

export const {
 useShopLoginMutation,
 useShopLogoutMutation, 
 useShopRegisterMutation,  
 useShopProfileMutation,
 useGetShopQuery,
 useDeleteShopProductMutation,  
 useGetShopOrdersQuery,
 useGetShopTotalOrdersQuery,
 useGetShopTotalSalesQuery,
 useGetShopTotalSalesByDateQuery,
 useCreateShopProductMutation,
 useAllShopProductsQuery,
 useUpdateShopProductMutation,
 useGetShopProductByIdQuery
  
} = shopApiSlice;
