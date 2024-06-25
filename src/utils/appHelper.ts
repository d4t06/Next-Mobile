export const generateId = (name: string): string => {
   const convertToEn = (str: string) => {
      const newString = str
         .toLocaleLowerCase()
         .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a")
         .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
         .replace(/ì|í|ị|ỉ|ĩ/g, "i")
         .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ/g, "o")
         .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
         .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
         .replace(/đ/g, "d");
      return newString;
   };
   return convertToEn(name).replaceAll(/[\W_]/g, "-");
};

export const initImageObject = (data: Partial<ImageType>) => {
   const newImage: ImageType = {
      public_id: "",
      image_url: "",
      link_to: "",
      name: "",
      size: 0,
      ...data,
   };

   return newImage;
};

export const initProductObject = (data: Partial<ProductSchema>) => {
   const newProduct: ProductSchema = {
      product_name_ascii: "",
      product_name: "",
      image_url: "",
      brand_id: 0,
      category_id: 0,
      ...data,
   };

   return newProduct;
};

export const findCurCategory = (categories: Category[], curCategoryAscii: string) => {
   const curCategory = categories.find((cat) => cat.category_name_ascii === curCategoryAscii);
   return curCategory;
};

export const formatSize = (size: number) => {
   const units = ["Kb", "Mb"];
   let mb = 0;

   if (size < 1024) return size.toFixed(0) + units[mb];
   while (size > 1024) {
      size -= 1024;
      mb++;
   }

   return mb + "," + size.toFixed(1) + units[1];
};

export const sleep = (time: number) =>
   new Promise<void>((rs) => {
      setTimeout(() => {
         rs();
      }, time);
   });
