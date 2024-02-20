// import jwtDecode from "jwt-decode";
// import { publicRequest } from "../utils/request";
// import { useAuth } from "@/store/AuthContext";

// const useRefreshToken = () => {
//   const { setAuth } = useAuth();

//   const refresh = async () => {
//     try {
//       const response = await publicRequest.get("/auth/refresh");

//       setAuth((prev) => {
//         const newToken = response.data.token;

//         const decode: { username: string; role: "ADMIN" | "" } = newToken
//           ? jwtDecode(newToken)
//           : { username: "", role: "" };

//         return { ...prev, token: newToken, ...decode };
//       });
//       return response.data.token;
//     } catch (error) {
//       console.log({ message: error });
//     }
//   };
//   return refresh;
// };

// export default useRefreshToken;
