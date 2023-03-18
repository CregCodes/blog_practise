import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.navbarButton} href="/">
          Home ||
        </Link>

        <Link className={styles.navbarButton} href="/archive/archive">
          Archive ||
        </Link>
      </div>
    </nav>
  );
}
