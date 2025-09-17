export default function CustomVideo({ ...props }: Record<string, any>) {
  return (
    <div className="aspect-video">
      <iframe {...props} />
    </div>
  );
}
