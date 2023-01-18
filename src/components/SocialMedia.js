import classes from './SocialMedia.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function SocialMedia() {
    return (
        <div className={classes.socialmediapositioning}>
            <FontAwesomeIcon icon={faFacebook} className={classes.social_media_icon} />
            <FontAwesomeIcon icon={faInstagram} className={classes.social_media_icon} />
            <FontAwesomeIcon icon={faTwitter} className={classes.social_media_icon} />
            <FontAwesomeIcon icon={faGooglePlus} className={classes.social_media_icon} />
        </div>
    );
}

export default SocialMedia;