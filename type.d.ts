interface Product {
   id?: number;
   product_name: string;
   product_name_ascii: string;
   category_id?: number;
   brand_id?: number;
   image_url: string;
   installment: boolean;
   category_data: {
      category_name: string;
      category_ascii: string;
      attributes: CategoryAttribute[];
   };
   brand_data: {
      brand_name: string;
      brand_ascii: string;
   };
   combines_data: ProductCombine[];
   attributes_data: ProductAttribute[];
}

type CategoryAttribute = {
     id?: number;
     category_id: number;
     attribute: string;
     attribute_ascii: string;
  };

interface ProductCombine {
   id?: number;
   product_name_ascii: string;
   color_id: number;
   storage_id: number;
   quantity: number;
   price: number;
   default: boolean;
   color_data: {
      color: string;
      color_ascii: string;
   };
   storage_data: {
      storage: string;
      storage_ascii: string;
   };
}
