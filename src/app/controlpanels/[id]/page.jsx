"use client";

import { fetchCP } from "@/app/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ControlPanel = () => {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("/images/eye.png");
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    const getUser = async () => {
      const id = pathname.split("/").pop();
      const CP = await fetchCP(id);
      setUser(CP);
    };
    getUser();
  });
  return (
    <div className="flex m-2 gap-5">
      <div className="w-[26%] p-3 bg-[#182237] rounded-lg h-72">
        <Image src={"/images/noavatar.png"} alt="" width={300} height={300} />
        <p className="mt-4 text-center">{user?._id}</p>
      </div>
      <div className="w-full  bg-[#182237] rounded-lg">
        <form>
          <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-200"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              value={user?.username}
              className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-semibold text-gray-200"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={user?.phoneNumber}
              className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
            <label
              htmlFor="drivers"
              className="text-sm font-semibold text-gray-200"
            >
              Number of Drivers
            </label>
            <input
              type="text"
              id="drivers"
              value={user?.drivers?.length}
              className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start justify-start w-full p-4 border-gray-200 rounded-lg gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-200"
            >
              Password
            </label>
            <div className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent flex items-center justify-between">
              <input
                type={!show ? "password" : "text"}
                id="password"
                value={user?.password}
                className="bg-transparent focus:outline-none"
              />
              <Image
                src={src}
                alt=""
                width={20}
                height={20}
                onClick={() => {
                  if (src === "/images/eye-hide.png") setSrc("/images/eye.png");
                  else setSrc("/images/eye-hide.png");
                  setShow(!show);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ControlPanel;
