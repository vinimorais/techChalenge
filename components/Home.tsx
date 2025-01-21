"use client";
import React from 'react';
import styles from './Home.module.scss';
import Image from 'next/image';
import  Link  from 'next/link'; 

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <div className={styles.imageContent}>
          <Image 
            className={styles.image} 
            src="/Banner-home.png" 
            alt="Exemplo de imagem" 
            width={1171.06} 
            height={412.12} 
          />
        </div>
      </section>

      <section>
        <div className={styles.imageContent}>
          <Image 
            className={styles.vantagens} 
            src="/Vantagens.svg" 
            alt="vantagens" 
            width={1200} 
            height={247.07} 
          />
        </div>
      </section>

     
      <section>
        <Link href="/main" className={styles.link}>Ir para About</Link>
      </section>
    </div>
  );
};

export default Home;
