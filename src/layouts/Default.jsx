import styles from "./Layout.module.scss";

function Default({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="https://rezrad.ir">RezRad</a> | React.js
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by RezRad with ♥️</p>
      </footer>
    </>
  );
}

export default Default;
