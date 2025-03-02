"use client";

import { Friend } from "@/data";
import { getUsers, StoreProps } from "@/lib/app";
import { st_toggleAllFriendModal } from "@/utils/stores_actions/str_act";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import MobileUserCard from "./MobileUserCard";

export default function FriendListAbs() {
  const { st_users, st_user, allFriendModalIsOpen } = useSelector(
    (state: StoreProps) => state.AppStore
  );

  const [activeMenu, setActiveMenu] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<Friend[]>([]);
  const [filteredList, setFilteredList] = useState<Friend[]>([]);
  const [allUsers, setAllUsers] = useState<Friend[]>([]);

  useEffect(() => {
    getUsers().then((res) => {
      if (res.success) {
        setAllUsers(res.users);
      }
    });
  }, []);

  useEffect(() => {
    const fList =
      allUsers.filter((user: Friend) => user.actionNumber > 0) || [];
    setFilteredList(fList);
  }, [allUsers]);

  useEffect(() => {
    if (activeMenu === 0) {
      setData(filteredList);
    } else {
      setData(allUsers || []);
    }
  }, [activeMenu]);

  useEffect(() => {
    if (filteredList.length === 0) {
      setActiveMenu(1);
      setData(st_users || []);
    } else {
      setActiveMenu(0);
      setData(filteredList);
    }

    if (allFriendModalIsOpen) {
      setBoxHeight(340);
    } else {
      setBoxHeight(0);
    }
  }, [allFriendModalIsOpen]);

  useEffect(() => {
    if (loading && allUsers?.length > 0) {
      setLoading(false);
    }
  }, [allUsers]);

  return (
    <>
      {st_user && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: boxHeight }}
          exit={{ opacity: 0, height: 0 }}
          className="FriendListAbs"
        >
          <button
            onClick={() => st_toggleAllFriendModal()}
            className={classNames(
              "border-2 border-b-0 border-solid border-gray-400 text-orange-200 hover:border-orange-400 rounded-t-lg hover:text-orange-400 duration-200 h-14 w-full flex items-center justify-between px-3.5",
              {
                "!border-b-2": allFriendModalIsOpen,
              }
            )}
          >
            {loading ? (
              <div>Yükleniyor...</div>
            ) : (
              <>
                <span>
                  Arkadaşlar{" "}
                  <span className="text-gray-300 text-sm">
                    ({allUsers?.length})
                  </span>
                </span>
                <section className="text-xs text-gray-300">
                  <div className="text-xs font-medium flex items-center">
                    {filteredList.length > 0 ? (
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-500 mr-1.5"></div>
                    )}
                    {filteredList.length} Aktif
                  </div>
                </section>
              </>
            )}
          </button>

          {allFriendModalIsOpen && (
            <div className="py-2.5 border-x-2 border-gray-400 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 px-2.5">
                <button
                  onClick={() => setActiveMenu(0)}
                  className={classNames(
                    "text-gray-400 font-medium bg-transparent bg-opacity-100 duration-150 rounded-md flex items-center justify-center h-8",
                    {
                      "!text-white !bg-gray-500 !bg-opacity-50":
                        activeMenu === 0,
                    }
                  )}
                >
                  Aktif
                </button>
                <button
                  onClick={() => setActiveMenu(1)}
                  className={classNames(
                    "text-gray-400 font-medium bg-transparent bg-opacity-100 duration-150 rounded-md flex items-center justify-center h-8",
                    {
                      "!text-white !bg-gray-500 !bg-opacity-50":
                        activeMenu === 1,
                    }
                  )}
                >
                  Tümü
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex flex-col min-h-56 max-h-56 overflow-y-auto"
              >
                {data?.map((user: Friend, key) => (
                  <MobileUserCard key={key} user={user} />
                ))}

                {data.length === 0 && (
                  <div className="text-sm">
                    {activeMenu === 0
                      ? "Aktif arkadaşınız bulunmamaktadır."
                      : "Arkadaşınız bulunmamaktadır."}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
