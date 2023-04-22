import { ActiveLink } from "./ActiveLink";
import React from "react";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.menu_container}>
      <ActiveLink text="Estudios de caso" href="/context/ContextList" />
      <ActiveLink text="About" href="/about" />
      <ActiveLink text="Contacto" href="/contact" />
    </nav>
  );
};
