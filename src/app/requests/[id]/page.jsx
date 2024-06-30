"use client";

import { acceptDriver, fetchDriver, rejectDriver } from "@/app/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Request = () => {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("/images/eye.png");
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const phoneNumber = pathname.split("/").pop();
      const driver = await fetchDriver(phoneNumber);
      setUser(driver);
      setId(driver._id);
    };
    getUser();
  }, []);

  const handleAccept = async (e) => {
    e.preventDefault();
    const res = await acceptDriver(id);
    if (res) {
      router.push("/requests");
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    const res = await rejectDriver(user?._id);
    if (res) {
      router.push("/requests");
    }
  };

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
                  value={"Password"}
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
            </div>
            <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
              <label
                htmlFor="vehicleNumber"
                className="text-sm font-semibold text-gray-200"
              >
                Vehicle Number
              </label>
              <input
                type="text"
                id="vehicleNumber"
                value={user?.vehicleNumber}
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
            <div className="flex">
              <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
                <label
                  htmlFor="vehiclePhotos"
                  className="text-sm font-semibold text-gray-200"
                >
                  Vehicle Photos
                </label>
                <input
                  type="text"
                  id="vehiclePhotos"
                  value={user?.vehiclePhotos}
                  className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
                <label
                  htmlFor="vehicleVideo"
                  className="text-sm font-semibold text-gray-200"
                >
                  Vehicle Video
                </label>
                <input
                  type="text"
                  id="vehicleVideo"
                  value={user?.vehicleVideo}
                  className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start w-full p-4  border-gray-200 rounded-lg  gap-2">
            <label
              htmlFor="Aadhar"
              className="text-sm font-semibold text-gray-200"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="Aadhar"
              value={user?.Aadhar}
              className="w-full p-2 border border-gray-600 rounded-lg  bg-transparent focus:outline-none"
            />
          </div>
          {/* Accept and Reject BTNs */}
          <div className="flex w-full justify-center cursor-pointer gap-2 mb-2">
            <button
              className="p-2 mx-2 bg-[#f7dc6975] rounded-lg w-1/2 "
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="p-2 mx-2 bg-[#f7373775] rounded-lg w-1/2"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Request;
