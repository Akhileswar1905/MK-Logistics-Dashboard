"use client";

import { fetchDriver } from "@/app/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Driver = () => {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("/images/eye.png");
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const phoneNumber = pathname.split("/").pop();
      const driver = await fetchDriver(phoneNumber);
      setUser(driver);
    };
    getUser();
  }, [pathname]);

  const id = user?._id;

  return (
    <div className="flex m-2 gap-5">
      <div className="w-[26%] p-3 bg-[#182237] rounded-lg h-72">
        <Image src={"/images/noavatar.png"} alt="" width={300} height={300} />
        <p className="mt-4 text-center">{user?._id}</p>
      </div>
      <div className="w-full  bg-[#182237] rounded-lg">
        <form>
          <div className="flex">
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
          </div>

          <div className="flex">
            <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user?.email}
                className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
              <label
                htmlFor="dob"
                className="text-sm font-semibold text-gray-200"
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="dob"
                value={user?.dob}
                className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="flex">
            {/* <div className="flex flex-col items-start justify-start w-full p-4 border-gray-200 rounded-lg gap-2">
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
                    if (src === "/images/eye-hide.png")
                      setSrc("/images/eye.png");
                    else setSrc("/images/eye-hide.png");

                    setShow(!show);
                  }}
                />
              </div>
            </div> */}
            <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
              <label
                htmlFor="contracts"
                className="text-sm font-semibold text-gray-200"
              >
                Number of Contracts
              </label>
              <input
                type="text"
                id="contracts"
                value={user?.contractDetails?.length || 0}
                className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
              <label
                htmlFor="rides"
                className="text-sm font-semibold text-gray-200"
              >
                Number of Rides
              </label>
              <input
                type="text"
                id="rides"
                value={user?.tripDetails?.length || 0}
                className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col flex-wrap ">
            <div className="flex">
              <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
                <label
                  htmlFor="DrivingLicense"
                  className="text-sm font-semibold text-gray-200"
                >
                  Driving License
                </label>
                <input
                  type="text"
                  id="DrivingLicense"
                  value={user?.DrivingLicense}
                  className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
                <label
                  htmlFor="vehicleRC"
                  className="text-sm font-semibold text-gray-200"
                >
                  Vehicle RC
                </label>
                <input
                  type="text"
                  id="vehicleRC"
                  value={user?.vehicleRC}
                  className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
            <label
              htmlFor="AccNumber"
              className="text-sm font-semibold text-gray-200"
            >
              Bank Account Number
            </label>
            <input
              type="text"
              id="AccNumber"
              value={user?.AccNumber}
              className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
            <label
              htmlFor="IFSC"
              className="text-sm font-semibold text-gray-200"
            >
              IFSC Number
            </label>
            <input
              type="text"
              id="IFSC"
              value={user?.IFSC}
              className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
            />
          </div>
          {/* Assign Contract BTN */}
          <div className="flex justify-center">
            <button
              className="p-2 bg-[#f7dc6975] rounded-lg mb-2"
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("driver", id);
                router.push("/drivers/assign-contract");
              }}
            >
              Assign Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Driver;
