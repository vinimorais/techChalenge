import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./Modal-Conta-Corrente.module.scss";

interface ModalProps {
  onClose: () => void;
}

interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface User {
  email: string;
  password: string;
  name?: string;
}

const Modal = forwardRef<ModalHandle, ModalProps>(({ onClose }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      setMessage("Você precisa aceitar os termos!");
      return;
    }

    if (!isEmailValid) {
      setMessage("Email inválido!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setMessage("Usuário já cadastrado!");
    } else {
      const newUser: User = { email, password, name };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("Conta criada com sucesso!");
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <img className={styles.img} src="Ilustração_Login.svg" alt="Imagem de login" />
        <h2 className={styles.h2}>Preencha os campos abaixo para criar sua conta corrente!</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            className={`${styles.input} ${!isEmailValid ? styles.inputInvalid : ""}`}
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {!isEmailValid && <p className={styles.errorText}>Email inválido</p>}
          <label>Senha</label>
          <input
            className={styles.inputSenha}
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="privacy"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="privacy">
              Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.
            </label>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!termsAccepted || !isEmailValid}
          >
            Criar conta
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
});

export default Modal;
