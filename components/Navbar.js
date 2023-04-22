import { ActiveLink } from "./ActiveLink";
import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link"

export const Navbar = () => {
  return (
    <nav >
      <ul className="flex border-b">
  <li className="-mb-px mr-1">
    <Link className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"  href="/context/ContextList">Estudios de caso</Link>
  </li>
  <li class="mr-1">
    <Link class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/about">Acerca de</Link>
  </li>
  <li class="mr-1">
    <Link class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/contact">Contacto</Link>
  </li>
</ul>
    </nav>
  );
};
