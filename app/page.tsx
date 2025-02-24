import FeedbackForm from "@/components/feedbackForm";
import FeedbackList from "@/components/feedBackList";
import Team from "@/components/team";
import DATA, { welcomeTextArray } from "@/data";
import classNames from "classnames";

export default function Home() {
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
      <Team data={DATA} page={"HOME"} />
      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}
