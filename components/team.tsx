import { Friend } from "@/data";
import FriendCard from "./friendCard";
import Title from "./title";

interface TeamProps {
  page: "HOME" | "FRIEND_DETAIL";
  db_data: Friend[] | null | undefined;
}

export default function Team({ page = "HOME", db_data }: TeamProps) {
  return (
    <div className="flex flex-col gap-20 items-center">
      <Title>
        {page === "HOME" ? "Ekibimiz" : "Diğer Ekip Arkadaşlarımız"}
      </Title>
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-24">
        {db_data?.map((friend: Friend, index: number) => (
          <FriendCard key={index} {...friend} />
        ))}
        {/* {data.map((friend: Friend, index) => (
          <FriendCard key={index} {...friend} />
        ))} */}
      </div>
    </div>
  );
}
