import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import classes from "./LayoutContainer.module.css";

function LayoutContainer(props) {
  return (
    <div className = {classes.page_container}>
      {props.children}
    </div>
  );
}

export default LayoutContainer;
