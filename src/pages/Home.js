import { Container } from "react-bootstrap";
import Categories from "../components/landingpage/Categories";
import MainItemCard from "../components/landingpage/MainItemCard";
import MiddleSection from "../components/landingpage/MiddleSection";
import UpperSection from "../components/landingpage/UpperSection";
import LowerSection from "../components/landingpage/LowerSection";
import classes from "./Home.module.css";
import LayoutContainer from "../components/LayoutContainer";
import {PAGES} from "../utils/constants"
import {AuthContext} from "../hooks/index";
import { useEffect, useState, useRef, useContext } from "react";
import {fetchRecommended, fetchUnrecommended} from "../utils/itemService";



function Home({setCurrentPage}) {

  setCurrentPage(PAGES.HOME);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);
  const [recommendedItems, setRecommendedItems] = useState(null);

  useEffect(() => {
    (async () => {
    let data = "";
    if (token) {
      data = await fetchRecommended(token);
      setRecommendedItems(data);
    } else {
      data = await fetchUnrecommended();
      setRecommendedItems(data);
    }
  })()
  }, []);


  return (
    <LayoutContainer >
      <div className={classes.mainsection}>
        <Categories />
        {recommendedItems && <MainItemCard
          description={recommendedItems[0].details}
          price = {recommendedItems[0].startingPrice}
          title = {recommendedItems[0].name}
          itemId = {recommendedItems[0].itemId}
          image = {recommendedItems[0].photo
    ? recommendedItems[0].photo.split(";").filter((el) => el.length !== 0)
    : []}
        />}
        
      </div>

      {recommendedItems && <UpperSection items = {recommendedItems.slice(1, 4)} />}

      {recommendedItems && <MiddleSection items = {recommendedItems.slice(-4)} />
}
      <LowerSection />
      </LayoutContainer>
  );
}

export default Home;
