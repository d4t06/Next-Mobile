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
  tags: Tag[];
};

type CategorySchema = Omit<Category, "id" | "attributes" | "brands" | "tags">;

type CategoryAttribute = {
  id: number;
  category_id: number;
  attribute_name: string;
  attribute_name_ascii: string;
};

type CategoryAttributeSchema = Omit<CategoryAttribute, "id">;

type ProductTag = {
  product_id: number;
  tag_id: number;
  tag: Tag;
};

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
  product_tags: ProductTag[];
};

type ProductSchema = Omit<
  Product,
  | "id"
  | "attributes"
  | "category"
  | "category_id"
  | "brand_id"
  | "description"
  | "product_tags"
> & {
  category_id: number | undefined;
  brand_id: number | undefined;
};

type ProductResponse = {
  products: Product[];
  page: number;
  count: number;
  page_size: number;
  brand_id: number[] | null;
  category_id: number | null;
};

type TagProductResponse = Omit<ProductResponse, "brand_id" | "category_id">;

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
  date_diff: string;
};

type ProductCommentSchema = Omit<ProductComment, "id" | "date_diff">;

type ProductCommentResponse = {
  comments: ProductComment[];
  page: number;
  product_id: number;
  size: number;
  count: number;
};

type Tag = {
  id: number;
  category_id: number;
  name: string;
};

type TagSchema = Omit<Tag, "id">;

type LikeProduct = {
  user_id: number;
  product_id: number;
  product: Product;
};

type LikeProductSchema = Omit<LikeProduct, "product">;
