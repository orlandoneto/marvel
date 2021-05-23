import env from "react-dotenv";
import md5 from "md5";

const privateKey = env.REACT_APP_PRIVATE_KEY;
export const publicKey = env.REACT_APP_PUBLIC_KEY;
export const time = Number((new Date()))
export const hash = md5(time + privateKey + publicKey) 
