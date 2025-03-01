"use client";

import FeedbackForm from "@/components/feedbackForm";
import FeedbackList from "@/components/feedBackList";
import FriendListAbs from "@/components/FriendListAbs";
import Team from "@/components/team";
import DATA, { Friend, welcomeTextArray } from "@/data";
import { StoreProps } from "@/lib/app";
import { st_setStUsers } from "@/utils/stores_actions/str_act";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [db_data, setDb_data] = useState<Friend[] | null | undefined>(null);
  const { st_user } = useSelector((state: StoreProps) => state.AppStore);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/users`);

      if (!response.ok) throw new Error("Arama başarısız");

      const data = await response.json();

      if (data.success) {
        setDb_data(data.users || null);
        st_setStUsers(data.users || []);
      }
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  };

  useEffect(() => {
    handleSearch();
    return () => {};
  }, []);

  return (
    <div className="home relative">
      <header className="home-header">
        {welcomeTextArray.map((text, index) => (
          <p
            key={index}
            className={classNames("welcomeText", {
              "!text-transparent bg-gradient-to-l to-orange-800 from-orange-300 bg-clip-text":
                index === 1,
            })}
          >
            {text}
          </p>
        ))}
      </header>
      <Team data={DATA} page={"HOME"} db_data={db_data} />
      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}
