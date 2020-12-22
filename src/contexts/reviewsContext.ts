import { createContext } from "react";
/* types */
import { Review } from "../types/review";

type ReviewsContextValue = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const ReviewsContext = createContext<ReviewsContextValue>({
  reviews: [],
  setReviews: () => {},
});
