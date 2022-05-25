import Image from "next/image";
import { animateScroll } from "react-scroll";

import styles from "./header.module.css";

export const Header = ({ logo, socialLinks }) => {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={logo.file.url}
        alt={logo.file.description}
        onClick={() => animateScroll.scrollToTop()}
      />
      <ul className={styles.socialLinks}>
        {socialLinks.map((socialLink) => (
          <li key={socialLink.id}>
            <a href={socialLink.url} target="_blank">
              {socialLink.text}
              <img
                src={socialLink.icon.file.url}
                alt={socialLink.icon.file.description}
              />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};
