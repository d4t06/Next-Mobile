type Brand = {
   id: number;
   brand_name_ascii: string;
   brand_name: string;
   category_id: number;
   image_url: string;
};

type BrandSchema = Omit<Brand, "id">;

type Category = {
   id: number;
   category_name: string;
   category_name_ascii: string;
   attributes: CategoryAttribute[];
   attribute_order: string;
   brands: Brand[];
};

type CategorySchema = Omit<Category, "id" | "attributes" | "brands">;

type CategoryAttribute = {
   id: number;
   category_id: number;
   attribute_name: string;
   attribute_name_ascii: string;
};

type CategoryAttributeSchema = Omit<CategoryAttribute, "id">;

type Product = {
   id: number;
   product_name: string;
   product_name_ascii: string;
   category_id: number;
   brand_id: number;
   image_url: string;
   category: Category;
   attributes: ProductAttribute[];
   description: Description;
};

type ProductSchema = Omit<Product, "id" | "attributes" | "category" | "description">;

type ProductResponse = {
   products: Product[];
   page: number;
   count: number;
   page_size: number;
   category_id: number | null;
   brand_id: number[] | null;
};

type Description = {
   id: number;
   product_ascii: string;
   content: string;
};

type DescriptionSchema = Omit<Description, "id">;

type ProductAttribute = {
   id: number;
   category_attribute_id: number;
   product_id: number;
   value: string;
};

type ProductAttributeSchema = Omit<ProductAttribute, "id">;

type Toast = {
   title?: "success" | "error" | "warning";
   desc: string;
   id: string;
};

type ImageType = {
   id?: number;
   image_url: string;
   public_id: string;
   name: string;
   size: number;
   link_to: string;
};

type ProductComment = {
   id: number;
   product_id: number;
   username: string;
   content: string;
   approve: number;
   date_convert: string;
};

type ProductCommentSchema = Omit<ProductComment, "id" | "approve" | "date_convert">;

type ProductCommentResponse = {
   comments: ProductComment[];
   page: number;
   product_id: number;
   size: number;
   count: number;
};
