"use client";

import { useEffect, useState } from "react";
import Title from "./title";

interface Feedback {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    setFeedbacks(data); // Geri bildirimleri state'e kaydediyoruz
  };
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex items-center justify-center">
        <Title>Feedbacks</Title>
      </div>
      <ul className="flex flex-wrap gap-5 justify-center">
        {feedbacks.length > 0 ? (
          feedbacks.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-2.5 border-2 border-solid border-gray-700 hover:border-orange-700 duration-200 p-5 rounded-lg w-[320px] "
            >
              <div className="flex items-center justify-between">
                <strong className="text-orange-200 text-lg">
                  {item.name ? item.name : "Admin"}
                </strong>
                <em className="text-gray-500 text-xs font-medium">
                  {item.createdAt}
                </em>
              </div>
              <p className="h-28 overflow-auto text-sm">{item.message}</p>
            </li>
          ))
        ) : (
          <p>No feedback available.</p>
        )}
      </ul>
    </div>
  );
}
