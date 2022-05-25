import styles from "./frame.module.css";

export const Frame = ({ sectionId, children }) => {
  return (
    <section id={sectionId} className={styles.frame}>
      {children}
    </section>
  );
};
