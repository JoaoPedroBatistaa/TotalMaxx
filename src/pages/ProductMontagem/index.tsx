import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/ProductPerfil.module.scss";

import HeaderNewProduct from "@/components/HeaderNewProduct";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMontagemToLogin } from "../../../firebase";
import { useMenu } from "../../components/Context/context";
export default function ProductMontagem() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/Login");
    }
  }, []);

  const { openMenu, setOpenMenu } = useMenu();

  const [codigo, setCodigo] = useState<string | null>(null);
  const [descricao, setDescricao] = useState("");

  const [valor, setValorMetro] = useState<string | null>(null);

  const handleSetValorMetro = (value: string) => {
    const updatedValue = value.replace(/,/g, ".");
    setValorMetro(updatedValue);
  };

  const handleButtonFinish = async (event: any) => {
    event.preventDefault();

    let userId = localStorage.getItem("userId");

    const colagem = {
      codigo,
      valor,
      descricao,
    };

    try {
      // Substitua 'id_do_login' pelo id do login onde você quer adicionar o paspatur
      await addMontagemToLogin(colagem, userId);
      toast.success("Produto Cadastrado!");
    } catch (e) {
      toast.error("Erro ao cadastrar produto.");
    }

    setTimeout(() => {
      router.push("/Products#montagem");
    }, 500);
  };
  const handleOpenMenuDiv = () => {
    setTimeout(() => {
      setOpenMenu(false);
    }, 100);
  };

  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
        `}</style>
      </Head>

      <HeaderNewProduct></HeaderNewProduct>
      <ToastContainer />
      <div className={styles.Container} onClick={handleOpenMenuDiv}>
        <div className={styles.BudgetContainer}>
          <div className={styles.BudgetHead}>
            <p className={styles.BudgetTitle}>Montagem</p>
            <div className={styles.BudgetHeadS}>
              <button
                className={styles.FinishButton}
                onClick={handleButtonFinish}
              >
                <img
                  src="./finishBudget.png"
                  alt="Finalizar"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Cadastrar Montagem</span>
              </button>
            </div>
          </div>

          <p className={styles.Notes}>
            Informe abaixo as credencias da sua Montagem
          </p>

          <div className={styles.InputContainer}>
            <div className={styles.InputField}>
              <p className={styles.FieldLabel}>Código</p>
              <input
                id="codigo"
                type="text"
                className={styles.Field}
                placeholder=""
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>

            <div className={styles.InputField}>
              <p className={styles.FieldLabel}>Valor</p>
              <input
                id="valorMetro"
                type="number"
                className={styles.Field}
                placeholder=""
                onChange={(e) => handleSetValorMetro(e.target.value)}
              />
            </div>

            <div className={styles.InputContainer}>
              <div className={styles.InputField}>
                <p className={styles.FieldLabel}>Descrição</p>
                <textarea
                  className={styles.Field}
                  id="descricao"
                  name=""
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className={styles.InputContainer}></div>

          <div className={styles.Copyright}>
            <p className={styles.Copy}>
              © Total Maxx 2023, todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
