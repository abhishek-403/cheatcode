import { Image } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUser } from "../hooks/useAuth";
import {
  useSignInWithGoogleMutation,
  useSignOutMutation,
} from "../store/services/auth";
import { TABS } from "./constants/constants";
import Spinner from "./custom-ui/loading";

type decodeType = {
  email: string;
  name: string;
  picture: string;
};

export default function Navbar() {
  const history = useHistory();
  const [singInWithGoogle, { isLoading: signinLoading }] =
    useSignInWithGoogleMutation();
  const [signOut, { isLoading: logoutLoading }] = useSignOutMutation();
  const user = getUser();

  async function handleSignIn() {
    try {
      if (signinLoading) return;
      const { error } = await singInWithGoogle();
      if (error) throw error;
      toast.success("Logged In");
    } catch (e) {
      toast.error("Internal Error");
    }
  }

  async function handleSignOut() {
    try {
      if (logoutLoading) return;

      const { data, error } = await signOut();

      history.go(0);
      // window.location.reload();
      if (error) throw error;
    } catch (e) {
    }
  }

  return (
    <div className="flex flex-col  ">
      <div className="bg-black h-[var(--navbar-height)] border-b border-[#2a2a2a] px-10 flex items-center justify-between">
        <Link
          to={"/"}
          className="flex gap-2 items-center cursor-pointer justify-center"
        >
          <Image
            src="./logo.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
          <span className="text-white font-mono font-bold text-xl">
            CHEATCODE
          </span>
        </Link>
        <div className="text-white  ">
          <ul className="flex flex-row gap-10  text-base cursor-pointer  my-auto">
            {TABS.map((tab, i) => (
              <TextBox key={i} link={tab.link}>
                {tab.name}
              </TextBox>
            ))}
            <div style={{ height: 30, width: 30 }}>
              {!user.isAuthenticated ? (
                <div className="flex items-center justify-center">
                  {user.isLoading ? (
                    <li>
                      <Spinner size={24} />
                    </li>
                  ) : (
                    <li
                      onClick={handleSignIn}
                      className="flex items-center justify-center bg-neutral-80 px-4 py-1 rounded-lg text-primary-60"
                    >
                      Login
                    </li>
                  )}
                </div>
              ) : (
                <li onClick={handleSignOut}>
                  <Image
                    src={user.user?.imageUrl ?? undefined}
                    width={30}
                    height={30}
                    alt="Picture of the user"
                    className="rounded-full border border-neutral-70"
                  />
                </li>
              )}
            </div>
          </ul>
          <div className="text-neutral-0 dark cursor-pointer text-xl "></div>
        </div>
      </div>
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
    <li className="w-fit list-none  ">
      <Link
        to={link}
        className="group font-medium w-fit  text-white transition duration-300 hover:text-[#a6a6a6]"
      >
        {children}
        {isActive && (
          <span
            className={
              "block rounded group-hover:max-w-full transition-all duration-200 h-[2.2px] bg-primary-100 "
            }
          ></span>
        )}
      </Link>
    </li>
  );
}
