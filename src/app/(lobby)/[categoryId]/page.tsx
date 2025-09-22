import NoProduct from "@/components/NoProduct";
import Button from "@/components/ui/Button";
import { getAllCategories } from "@/libs/getAllCategory";
import { getAllProducts } from "@/libs/getAllProducts";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import ProductItem from "@/components/ProductItem";
import CategoryLabel from "./_components/CategoryLabel";
import { TagIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/Pagination";

export const revalidate = 86400;

type Params = {
  params: {
    categoryId: string;
  };
  searchParams: { page: string; brand_id: string };
};

export async function generateStaticParams() {
  const categories = await getAllCategories();

  if (!categories) return [];

  return categories.map((c) => ({ categoryId: c.id + "" }) as Params["params"]);
}

async function ProductList({
  categoryId,
  brandId,
  page,
}: {
  categoryId: string;
  brandId: string;
  page: number;
}) {
  const categories = await getAllCategories();

  const data = await getAllProducts({
    page,
    category_id: categoryId,
    brand_id: brandId,
  });

  if (!data) return <NoProduct />;

  const isRemaining = data.page_size * data.page < data.count;

  const curCategory = categories?.find((c) => c.id === +categoryId);
  const brandObj: Record<number, string> = {};
  curCategory?.brands.forEach((b) => {
    brandObj[b.id] = b.image_url;
  });

  return (
    <>
      {!!data.products.length && (
        <div className="mt-5 space-y-3">
          {data.products.map((p, index) => (
            <ProductItem
              href={`/product/${p.id}`}
              image_url={p.image_url || brandObj[p.brand_id]}
              key={index}
              product={p}
            />
          ))}
        </div>
      )}
      {!data.products.length && <NoProduct />}

      {!!data.products.length && (
        <Pagination
          href={`/${categoryId}`}
          page={page}
          isHasNextPage={isRemaining}
          query={{ brand_id: brandId }}
        />
      )}
    </>
  );
}

async function BrandListServerSide({
  brandId,
  categoryId,
}: {
  brandId: string;
  categoryId: string;
}) {
  const categories = await getAllCategories();

  const curCategory = categories?.find((c) => c.id === +categoryId);

  return (
    <div className="mt-3">
      <p className="faded-text">Brands:</p>

      <div className="flex flex-wrap gap-2 mt-1 text-sm">
        <Button
          href={`/${categoryId}`}
          colors={"second"}
          size={"clear"}
          active={!brandId}
          className="py-1 px-3"
        >
          All
        </Button>
        {curCategory?.brands.map((b, index) => (
          <Button
            key={index}
            href={`/${categoryId}${`?brand_id=${b.id}`}`}
            colors={"second"}
            size={"clear"}
            active={+brandId === b.id}
            className="py-1 px-3"
          >
            {b.brand_name}
          </Button>
        ))}
      </div>

      <p className="faded-text mt-3">Tags:</p>

      <div className="flex flex-wrap gap-2 mt-1 text-sm">
        {curCategory?.tags.map((t, i) => (
          <Link href={`/tag/${t.id}`} key={i}>
            <Button colors={"second"} size={"clear"} className="py-1 px-3">
              <TagIcon className="w-5" />
              <span>{t.name}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function ProductPage({
  params: { categoryId },
  searchParams,
}: Params) {
  const page =
    typeof searchParams.page === "string" && +searchParams.page >= 1
      ? +searchParams.page
      : 1;

  return (
    <>
      <CategoryLabel categoryId={categoryId} />

      <BrandListServerSide brandId={searchParams.brand_id} categoryId={categoryId} />

      <Suspense fallback={<Loading />}>
        <ProductList
          categoryId={categoryId}
          brandId={searchParams.brand_id}
          page={page}
        />
      </Suspense>
    </>
  );
}
