import Frame from "@/components/ui/Frame";

export default function Footer() {
   return (
      <div className="container my-[60px]  mb-[90px] sm:mb-[30px]">
         <Frame>
            <h1 className="py-[30px] text-center text-[22px] font-[500]">
               <span className="text-[#cd1818]">Next </span>
               Mobile
            </h1>
         </Frame>

         <p className="text-sm font-medium mt-[30px] sm:mt-[60px]">
            Make with ❤️ by d4t06 <br />© All rights no reserved ¯\_(ツ)_/¯{" "}
         </p>
      </div>
   );
}
