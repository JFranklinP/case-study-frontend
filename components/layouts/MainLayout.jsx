import { FC } from "react";
import { Navbar } from "../Navbar";
import styles from "./MainLayout.module.css"
import Head from "next/head";

export const MainLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            
        <Head>
          <title>Diseño de estudios de caso</title>
          <meta name="description" content='Home page EC'/>
          <link rel='icon' href='favicon.ico'/>
        </Head>

        <Navbar/>
       
        <main className={styles.main}>
    
       {children}

        </main>
        
        </div>
      );
};