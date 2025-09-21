export default function CustomVideo({ ...props }: Record<string, any>) {
  return (
    <div className="">
      <iframe {...props} />
    </div>
  );
}
