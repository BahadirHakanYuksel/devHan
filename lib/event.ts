import { friend } from "@/data";
import { generateRandomId } from "./app";

export const closeTheEventOperationCard = ({
  setOperationIsOpen,
}: {
  setOperationIsOpen: (value: boolean) => void;
}) => {
  setOperationIsOpen(false);
};

export const openTheEventOperationCard = ({
  setOperationIsOpen,
}: {
  setOperationIsOpen: (value: boolean) => void;
}) => {
  setOperationIsOpen(true);
};

export const eventCategories = [
  {
    title: "Yemek",
    emo: "🍔",
    color: "#f59e0b",
  },
  {
    title: "Eğitim",
    emo: "📚",
    color: "#3b82f6",
  },
  {
    title: "Spor",
    emo: "🏀",
    color: "#10b981",
  },
  {
    title: "Sanat",
    emo: "🎨",
    color: "#8b5cf6",
  },
  {
    title: "Teknoloji",
    emo: "📱",
    color: "#6366f1",
  },
  {
    title: "Müzik",
    emo: "🎵",
    color: "#ec4899",
  },
  {
    title: "Sinema",
    emo: "🎬",
    color: "#f43f5e",
  },
  {
    title: "Oyun",
    emo: "🎮",
    color: "#f97316",
  },
  {
    title: "Moda",
    emo: "👗",
    color: "#eab308",
  },
  {
    title: "Diğer",
    emo: "🔍",
    color: "#9ca3af",
  },
];

enum emojiType {
  like = "👍",
  love = "❤️",
  laugh = "😂",
  wow = "😯",
  sad = "😢",
  angry = "😡",
}

class Reaction {
  name: string;
  emoji: emojiType | null;
  count: number;
  users: friend[];
  constructor(
    name: string,
    emoji: emojiType | null,
    count: number | 0,
    users: friend[] | []
  ) {
    this.name = name;
    this.emoji = emoji;
    this.count = count;
    this.users = users;
  }

  sumReaction(user: friend) {
    this.count++;
    this.users.forEach((u) => {
      if (u === user) return;
      else this.users.push(user);
    });
  }

  substractionReaction(user: friend) {
    this.count--;
    this.users = this.users.filter((u) => u !== user);
  }
}

type EventCategory = { title: string; emo: string; color: string };

interface EventProps {
  id: string;
  name: string;
  description: string;
  dateTime: Date;
  googleMapsLink: string | null;
  category: EventCategory;
  eventImg: string | null;
  participants: string[];
  reactions: Reaction[];
  creatorName: string | null; // Provide a default value
  createdAt: Date | null;
  updatedAt: Date | null;
}

export class Event implements EventProps {
  readonly id: string;
  name: string;
  description: string;
  dateTime: Date;
  googleMapsLink: string | null;
  category: EventCategory;
  eventImg: string | null;
  participants: string[];
  reactions: Reaction[];
  creatorName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(props: Partial<EventProps> = {}) {
    this.id = props.id || "default-id";
    this.name = props.name || "Untitled Event";
    this.description = props.description || "";
    this.dateTime = props.dateTime || new Date();
    this.googleMapsLink = props.googleMapsLink || null;
    this.category = props.category || {
      title: "Diğer",
      emo: "🔍",
      color: "bg-orange-400",
    };
    this.eventImg = props.eventImg || null;
    this.participants = props.participants || [];
    this.reactions = props.reactions || [];
    this.creatorName = props.creatorName || null;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || null;
  }

  addParticipant(participantId: string): void {
    if (this.participants.find((p) => p === participantId)) return;
    this.participants.push(participantId);
  }

  removeParticipant(participantId: string): void {
    this.participants = this.participants.filter((p) => p !== participantId);
  }

  addReaction(reaction: Reaction): void {
    this.reactions.push(reaction);
  }

  removeReaction(reactionName: string): void {
    this.reactions = this.reactions.filter((r) => r.name !== reactionName);
  }
}

export class EventBuilder implements EventProps {
  id: string = "";
  name: string = "";
  description: string = "";
  dateTime: Date = new Date();
  googleMapsLink: string | null = null;
  category: EventCategory = { title: "", emo: "", color: "" };
  eventImg: string | null = null;
  participants: string[] = [];
  reactions: Reaction[] = [];
  creatorName: string = "";
  createdAt: Date | null = new Date();
  updatedAt: Date | null = null;
  // Builder için set metodları
  setId(): this {
    const id = generateRandomId();
    this.id = id;
    return this;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  setDateTime(dateTime: Date): this {
    this.dateTime = dateTime;
    return this;
  }

  setGoogleMapsLink(googleMapsLink: string | null): this {
    this.googleMapsLink = googleMapsLink;
    return this;
  }

  setCategory(categoryTitle: string): this {
    const title: string = categoryTitle;
    const emo: string =
      eventCategories.find((cat) => cat.title === categoryTitle)?.emo || "";
    const color: string =
      eventCategories.find((cat) => cat.title === categoryTitle)?.color || "";
    this.category = { title, emo, color };
    return this;
  }

  setEventImg(eventImg: string | null): this {
    this.eventImg = eventImg;
    return this;
  }

  setParticipants(participants: string[]): this {
    this.participants = participants;
    return this;
  }

  setReactions(reactions: Reaction[]): this {
    this.reactions = reactions;
    return this;
  }
  setCreator(creator: string): this {
    this.creatorName = creator;
    return this;
  }

  // build metodu ile Event nesnesi oluşturuluyor.
  build(): Event {
    if (!this.id || !this.name || !this.dateTime || !this.category.title) {
      throw new Error(
        "Required fields are missing: id, name, dateTime, or category"
      );
    }

    return new Event({
      id: this.id,
      name: this.name,
      description: this.description,
      dateTime: this.dateTime,
      googleMapsLink: this.googleMapsLink,
      category: this.category,
      eventImg: this.eventImg,
      participants: this.participants,
      reactions: this.reactions,
      creatorName: this.creatorName,
    });
  }
}

export class EventCategoriesClass {
  categories: typeof eventCategories;
  constructor(categories: typeof eventCategories) {
    this.categories = categories;
  }

  addCategory(category: (typeof eventCategories)[number]) {
    this.categories.push(category);
  }

  removeCategory(category: (typeof eventCategories)[number]) {
    this.categories = this.categories.filter((c) => c !== category);
  }

  changeCategoryTitle(
    category: (typeof eventCategories)[number],
    newTitle: string
  ) {
    category.title = newTitle;
  }

  changeCategoryEmoji(
    category: (typeof eventCategories)[number],
    newEmoji: string
  ) {
    category.emo = newEmoji;
  }
}
