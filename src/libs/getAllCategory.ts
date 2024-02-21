export const getAllCategories = async (rest: RequestInit | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`,
    {...rest}
  );

  return (await res.json()) as Category[];
};
