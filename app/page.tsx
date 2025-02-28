"use client";

import FeedbackForm from "@/components/feedbackForm";
import FeedbackList from "@/components/feedBackList";
import Team from "@/components/team";
import DATA, { Friend, welcomeTextArray } from "@/data";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function Home() {
  const [db_data, setDb_data] = useState<Friend[] | null | undefined>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/users`);

      if (!response.ok) throw new Error("Arama başarısız");

      const data = await response.json();

      if (data.success) {
        setDb_data(data.users || null);
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
    <div className="home">
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
