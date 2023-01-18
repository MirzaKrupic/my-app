import { Container } from "react-bootstrap";
import Categories from "../components/landingpage/Categories";
import MainItemCard from "../components/landingpage/MainItemCard";
import MiddleSection from "../components/landingpage/MiddleSection";
import UpperSection from "../components/landingpage/UpperSection";
import LowerSection from "../components/landingpage/LowerSection";
import classes from "./Home.module.css";
import LayoutContainer from "../components/LayoutContainer";
import {PAGES} from "../utils/constants"

function Home({setCurrentPage}) {

  setCurrentPage(PAGES.HOME);

  return (
    <LayoutContainer >
      <div className={classes.mainsection}>
        <Categories />
        {/* <MainItemCard
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra
          placerat. Aenean auctor luctus tempus. Cras laoreet et magna in
          dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In
          hac habitasse platea dictumst"
          price = "69,99"
          title = "Title"
        /> */}
      </div>

      {/* <UpperSection />

      <MiddleSection /> */}

      <LowerSection />
      </LayoutContainer>
  );
}

export default Home;
