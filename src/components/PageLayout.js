import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";

function PageLayout(props) {
  return (
    <div>
      <Header />
      <Navigation currentPage={props.currentPage} />
      {props.children}
      <Footer />
    </div>
  );
}

export default PageLayout;
