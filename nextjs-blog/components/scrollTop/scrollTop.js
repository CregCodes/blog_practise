import { useState, useEffect } from "react";
import styles from "./scrollTop.module.css";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`${styles["scroll-to-top-button"]} ${
        isVisible ? styles.visible : ""
      }`}
      onClick={scrollToTop}
    >
      Back To Top
    </button>
  );
}
