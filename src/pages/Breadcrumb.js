import classes from "./User_items.module.css";
import LayoutContainer from "../components/LayoutContainer";

function Breadcrumb({ mainPage, subPage }) {


  return (
    <div className={classes.page_heading}>
      <LayoutContainer>
        <div className={classes.page_heading}>
          <p>{mainPage}</p>
          <p>{subPage}</p>
        </div>
      </LayoutContainer>
    </div>
  );
}

export default Breadcrumb;
