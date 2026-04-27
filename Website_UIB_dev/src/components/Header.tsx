"use client";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "@/app/ThemeContext";
const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { data: session, status }: { data: any; status: string } = useSession();
  const { toggleTheme } = useTheme();
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="flex flex-wrap px-5 py-2 flex-row items-center justify-end">
          <button
            className="block md:hidden order-first"
            onClick={toggleSidebar}
          >
            <span className="bx bx-menu text-3xl text-black dark:text-white"></span>
          </button>
          <a className="flex flex-1 flex-row space-x-10 title-font font-medium items-center text-gray-900items-center justify-center mb-4 md:mb-0 md:hidden dark:hidden">
            <Image
              className="h-7 w-auto"
              src="/logo/logo-uib.png"
              width={25}
              height={25}
              alt="UIB"
              unoptimized
            />
          </a>
          <a className="flex flex-1 hidden dark:flex dark:sm:hidden flex-row space-x-10 title-font font-medium items-center text-gray-900items-center justify-center mb-4 sm:mb-0 sm:hidden">
            <Image
              className="h-7 w-auto"
              src="/logo/logo-uib-putih.png"
              width={25}
              height={25}
              alt="UIB"
              unoptimized
            />
          </a>
          <div className="inline-flex flex-row items-center justify-end end ml-5 lg:ml-0">
            <div className="relative inline-block dropdown">
              <button
                role="button"
                className="relative z-10 block p-2 text-gray-700 bg-transparent border border-transparent rounded-md dark:text-white"
              >
                <svg
                  className="h-7 w-auto text-gray-800 dark:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <NotificationDropdown />
            </div>
            <span className="text-neutral-900 dark:text-white font-normal hidden sm:flex">
              {session?.user?.nama == null ? (
                <>
                  <div className="skeleton h-5 w-36"></div>
                </>
              ) : (
                session?.user?.nama || "Nama tidak diketahui"
              )}
            </span>
            <div className="relative inline-block dropdown">
              <button
                role="button"
                className="relative z-10 block p-2 text-gray-700 bg-transparent border border-transparent rounded-md dark:text-white"
              >
                <div className="flex items-center gap-x-6">
                  <Image
                    className="object-cover h-8 w-8 rounded-full"
                    src={session?.user?.avatar || "/logo/user.png"}
                    alt="Staf UIB"
                    width={300}
                    height={300}
                    unoptimized
                  />
                </div>
              </button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;