import DATA from "@/data";
import FriendCard from "./friendCard";

export default function Team() {
  return (
    <div className="flex flex-col gap-20 items-center">
      <div>
        <header className="text-5xl font-medium border-b-2 border-solid border-b-orange-500 px-2.5 py-2.5 mb-5">
          Ekip
        </header>
      </div>
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-24">
        {DATA.map((friend, index) => (
          <FriendCard key={index} {...friend} />
        ))}
      </div>
    </div>
  );
}
