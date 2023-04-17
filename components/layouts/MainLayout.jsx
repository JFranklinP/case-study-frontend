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
       
        <div className="bg-gray-100 h-screen p-10">
          <div className="container mx-auto h-full">
          {children}
          </div>
        </div>
        
        </div>
      );
};