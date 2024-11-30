import Team from "@/components/team";
import { welcomeTextArray } from "@/data";
import classNames from "classnames";

export default function Home() {
  return (
    <div className="home">
      <header className="home-header">
        {welcomeTextArray.map((text, index) => (
          <p
            key={index}
            className={classNames(
              "text-5xl font-medium italic flex items-center gap-1.5 px-5",
              {
                "!text-transparent bg-gradient-to-bl to-orange-500 from-orange-300 bg-clip-text":
                  index === 1,
              }
            )}
          >
            {text}
          </p>
        ))}
      </header>
      <Team />
    </div>
  );
}
