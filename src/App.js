import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import PageLayout from "./components/PageLayout";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthProvider } from "./hooks";
import Item from "./pages/Item";
import Shop from "./pages/Shop";
import { useEffect, useState } from "react";
import { PAGES } from "./utils/constants";
import My_Profile from "./pages/My_Profile";
import User_items from "./pages/User_items";
import Item_Wizard from "./pages/Item_Wizard";
import Profile from "./pages/Profile";

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <PageLayout currentPage={currentPage}>
            <Switch>
              <Route path="/" exact>
                <Home setCurrentPage={setCurrentPage} />
              </Route>
              <Route path="/shop/:categoryId?" exact>
                <Shop setCurrentPage={setCurrentPage} />
              </Route>
              <Route path="/myprofile" exact>
                <My_Profile setCurrentPage={setCurrentPage} />
              </Route>
              <Route path="/myaccount" exact>
                <Profile setCurrentPage={setCurrentPage} />
              </Route>
              <Route path="/items/:itemId" exact>
                <Item />
              </Route>
              <Route path="/registration" exact>
                <Registration />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/myitems" exact>
                <User_items />
              </Route>
              <Route path="/additem" exact>
                <Item_Wizard />
              </Route>
            </Switch>
          </PageLayout>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
