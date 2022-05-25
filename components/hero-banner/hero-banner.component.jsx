import { Link } from "react-scroll";
import styles from "./hero-banner.module.css";
import { IoChevronDownSharp } from "react-icons/io5";

export const HeroBanner = ({ background, logo }) => (
  <div
    className={styles["hero-banner"]}
    style={{
      backgroundImage: `url(
        ${background.file.url}
      )`,
    }}
  >
    <div className={styles.gradient}></div>
    <img
      className={styles["hero-logo"]}
      src={logo.file.url}
      alt={logo.description}
    />
    <Link
      to="about"
      offset={-114}
      smooth={true}
      duration={500}
      className={styles["chevron-link"]}
    >
      <IoChevronDownSharp />
    </Link>
  </div>
);
