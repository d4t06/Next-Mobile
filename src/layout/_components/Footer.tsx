export default function Footer() {
  return (
    <div className="container mt-10 mb-5 text-center sm:text-left">
      <p className="text-sm font-semibold sm:mt-[60px]">
        Make with{" "}
        <img className="inline-block w-4 align-text-bottom" src="/heart.png" alt="" /> by{" "}
        <a href="https://dat-nguyen.vercel.app" target="_blank" className="underline">
          Nguyen Huu Dat
        </a>{" "}
        <br />© 2025
      </p>
    </div>
  );
}
