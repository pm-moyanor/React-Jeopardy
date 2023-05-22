import styles from "../styles/Header.module.css"
import Image from "next/image";


const Header = () => {
  return (
    <header className={styles.header}>
      {/* <h1 style={{ fontFamily: 'Konkhmer Sleokchher, sans-serif' }}>JEOPARDY!</h1> */}
      <Image src="../Jeopardy!_logo.svg" width= '400' height='200'  ></Image>
    </header>
  );
};

export default Header;
