export const getAllProduct = async () => {
   const res = await fetch(`${process.env.API_ENDPOINT}/products/dtdd`);
   return res.json();
};
