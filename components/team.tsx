import { friend } from "@/data";
import FriendCard from "./friendCard";
import Title from "./title";

interface TeamProps {
  data: friend[];
  page: "HOME" | "FRIEND_DETAIL";
}

export default function Team({ data, page = "HOME" }: TeamProps) {
  return (
    <div className="flex flex-col gap-20 items-center">
      <Title>
        {page === "HOME" ? "Ekibimiz" : "Diğer Ekip Arkadaşlarımız"}
      </Title>
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-24">
        {data.map((friend, index) => (
          <FriendCard key={index} {...friend} />
        ))}
      </div>
    </div>
  );
}
