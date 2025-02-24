import { friend } from "@/data";
import { Event, EventCategoriesClass } from "./event";

export class Admin {
  private friends: friend[] = [];
  private events: Event[] = [];
  //   private eventCategories: EventCategoriesClass[] = [];

  constructor(
    friends: friend[],
    events: Event[]
    // eventCategories: EventCategories[]
  ) {
    this.friends = friends;
    this.events = events;
    // this.eventCategories = eventCategories;
  }

  getFriends(): friend[] {
    return this.friends;
  }
  getEvents(): Event[] {
    return this.events;
  }
  //   getEventCategories(): EventCategories[] {
  //     // return this.eventCategories;
  //   }
}
