"use client";

import { useState } from "react";
import Title from "./title";
import classNames from "classnames";

interface Feedback {
  feedback: string;
  name: string;
}

export default function FeedbackForm() {
  const [form, setForm] = useState<Feedback>({ feedback: "", name: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Feedback submitted!");
      setForm({ feedback: "", name: "" });
    } else {
      alert("Error submitting feedback");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full p-5 flex flex-col items-center gap-10">
      <Title>Bize Görüşlerinizi İletin</Title>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-[320px]">
        <div className="flex flex-col gap-0.5">
          <header className="text-lg font-medium text-orange-200">İsim</header>
          <input
            value={form.name}
            className="border border-gray-300 px-2.5 h-14 bg-transparent focus:border-orange-300 rounded-lg"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tanışmak için sabırsızlanıyoruz..."
            required
            maxLength={40}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between items-center">
            <header className="text-lg font-medium text-orange-200">
              Mesajınız
            </header>
            <span className="text-sm text-gray-400">
              {form.feedback.length}/500
            </span>
          </div>
          <textarea
            value={form.feedback}
            className="border border-gray-300 p-2.5 h-40 bg-transparent focus:border-orange-300 rounded-lg resize-none"
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
            placeholder="Görüşlerinizi merakla bekliyoruz..."
            required
            maxLength={500}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={classNames(
            "w-full h-12 bg-orange-500 hover:bg-orange-600 duration-200 text-white font-medium text-base rounded-lg",
            { "cursor-not-allowed !bg-blue-500": isSubmitting }
          )}
        >
          {isSubmitting ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </div>
  );
}
