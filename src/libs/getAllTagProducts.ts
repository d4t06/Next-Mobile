export const getAllTagProducts = async ({
  page,
  tag_id,
}: {
  page?: number | string;
  tag_id: number | string;
}) => {
  let params = `?page=${page || 1}`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/tags/${tag_id}${params}`,
    {
      next: { tags: [`tag-${tag_id}`] },
    },
  );

  if (!res.ok) return undefined;

  return (await res.json()) as TagProductResponse;
};
