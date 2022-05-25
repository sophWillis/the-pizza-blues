import styles from "./footer.module.css";

export const Footer = ({ copyright }) => (
  <footer className={styles.footer}>{copyright}</footer>
);
