import styles from "./frame.module.css";

export const Frame = ({ id, children }) => {
  return (
    <section id={id} className={styles.frame}>
      {children}
    </section>
  );
};
