import React, { useState } from "react";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";
/* contexts */
import { UserContext } from "./src/contexts/userContext";
import { ReviewsContext } from "./src/contexts/reviewsContext";

/* type */
import { User } from "./src/types/user";
import { Review } from "./src/types/review";

const App = () => {
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReviewsContext.Provider value={{ reviews, setReviews }}>
        <AppNavigator />
      </ReviewsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
