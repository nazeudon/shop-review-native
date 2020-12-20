import React, { useState } from "react";
/* navigation */
import AppNavigator from "./src/navigation/AppNavigator";
/* contexts */
import { UserContext } from "./src/contexts/userContext";
/* type */
import { User } from "./src/types/user";

const App = () => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
};

export default App;
