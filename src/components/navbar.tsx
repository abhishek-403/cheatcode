import React, { useEffect } from "react";
import { Image } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { TABS } from "./constants/constants";
// import axios from "axios";
// import {
//   GoogleLogin,
//   GoogleOAuthProvider,
//   googleLogout,
// } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

type decodeType = {
  email: string;
  name: string;
  picture: string;
};

export default function Navbar() {
  //   const router = useRouter();
  const path = useLocation().pathname;

  async function handleSignIn(e: any) {
    //     try {
    //       const decode: decodeType = jwtDecode(e.credential);
    //       console.log(decode.email, decode.name, decode.picture);
    //       const response = await axios.post(
    //         "http://localhost:8080/api/v1/auth/signin",
    //         {
    //           email: decode.email,
    //           name: decode.name,
    //           picture: decode.picture,
    //         }
    //       );
    //       setItem("accessToken", response.data.result.accessToken);
    //       router.refresh();
    //     } catch (e) {
    //       console.log(e);
    //     }
  }

  function handleSignOut() {
    try {
      //   googleLogout();
      //   removeItem("accessToken");
      //   router.refresh();
    } catch (e) {}
  }

  return (
    <div className="bg-black h-[70px] border-b border-[#2a2a2a] px-10 flex items-center justify-between ">
      <Link
        to={"/"}
        className="flex gap-5 items-center cursor-pointer justify-center"
      >
        {/* <Image
          src="/logo.png"
          width={30}
          height={30}
          alt="Picture of the author"
        /> */}
        <span className="text-white font-mono font-bold">CHEATCODE</span>
      </Link>
      <ul className="flex flex-row gap-10  text-base cursor-pointer mr-10 ">
            {TABS.map((tab, i) => (
              <TextBox key={i} link={tab.link}>
                {tab.name}
              </TextBox>
            ))}
   
        {/* <li className="flex items-center justify-center">
          {getItem("accessToken") ? (
            <div>
              <p onClick={handleSignOut}>out</p>
            </div>
          ) : (
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <GoogleLogin
                size={"medium"}
                shape={"circle"}
                theme={"filled_black"}
                text={"signin"}
                onSuccess={(e) => handleSignIn(e)}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          )}
        </li> */}
      </ul>
    </div>
  );
}



export function TextBox({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <li className="w-fit list-none ">
      <Link
        to={link}
        className="group font-medium w-fit   text-white transition duration-300 hover:text-[#a6a6a6]"
      >
        {children}
        {isActive && (
          <span
            className={
              "block rounded max-w-full group-hover:max-w-full transition-all duration-200 h-[2px] bg-[#3a8fff] "
            }
          ></span>
        )}
      </Link>
    </li>
  );
}
