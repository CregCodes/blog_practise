import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.navbar} href="/">
          Home
        </Link>
      </div>
    </nav>
  );
}
