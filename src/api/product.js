/* eslint-disable import/no-anonymous-default-export */
export default {
  GETALL: () => `/products?limit=25`,
  GETPRODUCTSOFADDBANNERPAGE: () => `/products`,
  GETCURATEDBRANDS: () => `/products/vendors/curated`,

  GETALLPRODUCTDETAIL: () => `/products`,

  GETPRODUCTSMODAL: (paginationData) =>
    `/products?limit=25&cursor=${paginationData?.endCursor}&pageDirection=after`,
  GETINVENTORYINITIALPRODUCTS: () => `/products?limit=25`,
  GETCOUNT: () => `/products/count`,
  ADDPRODUCTTOSTORE: () => `/products`,
  GETALLVENDORS: () => `/products/vendors`,
  GETALLTYPES: () => `/products/types`,
  GETALLPAGINATIONDATA: (paginationData) =>
    `/products?limit=25&cursor=${paginationData?.endCursor}&pageDirection=after`,
  GETALLPAGINATIONDATABACKWARD: (paginationData) =>
    `/products?limit=25&cursor=${paginationData?.startCursor}&pageDirection=before`,
};
