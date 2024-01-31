import { ReactNode } from "react";

type Props = {
   colList: string[];
   children: ReactNode;
};

function Table({ colList, children }: Props) {
   return (
      <table className="table">
         <thead>
            <tr className="even:bg-[#f1f1f1]">
               {colList.map((item, index) => (
                  <th key={index}>{item}</th>
               ))}
            </tr>
         </thead>

         <tbody>{children}</tbody>
      </table>
   );
}

export default Table;
