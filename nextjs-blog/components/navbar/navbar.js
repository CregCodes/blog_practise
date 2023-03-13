import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navhome}>
        <Link href="/">Home</Link>
      </div>
    </nav>
  );
}
