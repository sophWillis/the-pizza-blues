import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { BsChevronDown } from "react-icons/bs";

import styles from "./sub-navigation.module.css";

export const SubNavigation = ({ menuIntro, menuItems }) => {
  const navigationBar = useRef(null);

  const [offset, setOffset] = useState(0);
  const [shouldDisplayNavigation, setShouldDisplayNavigation] = useState(false);

  useEffect(() => {
    setOffset(70 + navigationBar.current.offsetHeight);
  }, [navigationBar]);

  const toggleNavigation = useCallback(() => {
    setShouldDisplayNavigation(!shouldDisplayNavigation);
  });

  return (
    <>
      <nav
        ref={navigationBar}
        className={styles["navigation-bar"]}
        onClick={() => toggleNavigation()}
      >
        <div className={styles.intro}>{menuIntro}</div>
        <ul className={styles.menu} data-open={shouldDisplayNavigation}>
          {menuItems.map((menuItem) => (
            <li className={styles["menu-item"]} key={menuItem.id}>
              <Link
                to={menuItem.sectionId}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="active"
                offset={-Math.abs(offset)}
                className={styles["menu-link"]}
              >
                {menuItem.text}
              </Link>
            </li>
          ))}
        </ul>
        <BsChevronDown className={styles["chevron-down"]} />
      </nav>
    </>
  );
};
