import React from "react";
import Link from "next/link";
import styles from "./404.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Página não encontrada</h1>
      <p className={styles.description}>
        Desculpe, a página que você tentou acessar não existe.
      </p>
      <Link href="/">
        <a className={styles.link}>Voltar para a página inicial</a>
      </Link>
    </div>
  );
}
