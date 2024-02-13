type Category = {
   id: number;
   category_name: string;
   category_ascii: string;
   attributes: CategoryAttribute[];
};

type CategorySchema = Omit<Category, "id" | "attributes">;

type CategoryAttribute = {
   id: number;
   category_id: number;
   attribute_name: string;
   attribute_ascii: string;
};

type CategoryAttributeSchema = Omit<CategoryAttribute, "id">;

type Product = {
   id: number;
   product_name: string;
   product_ascii: string;
   category_id: number;
   image_url: string;
   category: Category;
   attributes: ProductAttribute[];
};

type ProductSchema = Omit<Product, "id" | "attributes" | "category">;

type ProductAttribute = {
   id: number;
   category_attribute_id: number;
   product_id: number;
   value: string;
};

type ProductAttributeSchema = Omit<ProductAttribute, "id">;
