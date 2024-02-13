type Props = {
   categories: Category[];
};

export default function AddProduct({ categories }: Props) {
   return <p>{JSON.stringify(categories)}</p>;
}
