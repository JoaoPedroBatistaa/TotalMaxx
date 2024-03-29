import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ViewOrderData.module.scss";

import HeaderOrder from "@/components/HeaderOrder";
import SideMenuHome from "@/components/SideMenuHome";
import Link from "next/link";
import { ChangeEvent } from "react";

import { db, doc, getDoc } from "../../../firebase";

type UserDataType = {
  nomeCompleto: string;
  email: string;
  Telefone: string;
  tipoPessoa: string;
  cpf: string;
  valorTotal: string;
};

export default function ViewOrderData() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/Login");
    }
  }, []);

  const [openMenu, setOpenMenu] = useState(false); // Inicializa o estado openMenu

  const [selectedOption, setSelectedOption] = useState("opcao1");
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedId(localStorage.getItem("selectedId"));
    }
  }, []);

  let userId: string | null;
  if (typeof window !== "undefined") {
    userId = window.localStorage.getItem("userId");
  }

  useEffect(() => {
    async function fetchData() {
      if (selectedId) {
        try {
          const docRef = doc(db, `Login/${userId}/Orders`, selectedId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserDataType);
          } else {
            console.log("Nenhum documento encontrado!");
          }
        } catch (error) {
          console.error("Erro ao buscar documento:", error);
        }
      } else {
        console.log("Nenhum ID selecionado!");
      }
    }

    fetchData();
  }, [selectedId]);

  useEffect(() => {
    async function fetchData() {
      if (selectedId) {
        try {
          const docRef = doc(db, "Orders", selectedId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserDataType);
          } else {
            console.log("Nenhum documento encontrado!");
          }
        } catch (error) {
          console.error("Erro ao buscar documento:", error);
        }
      } else {
        console.log("Nenhum ID selecionado!");
      }
    }

    fetchData();
  }, [selectedId]);

  console.log("selectedId -->", selectedId);

  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
        `}</style>
      </Head>

      <div className={styles.Container}>
        <SideMenuHome
          activeRoute={router.pathname}
          openMenu={openMenu}
        ></SideMenuHome>

        <div className={styles.OrderContainer}>
          <HeaderOrder></HeaderOrder>

          <div className={styles.OrderDataContainer}>
            <div className={styles.BudgetHead}>
              <div className={styles.Nav}>
                <Link href="ViewOrderData">
                  <div>
                    <p className={`${styles.NavItem} ${styles.active}`}>
                      Dados do cliente
                    </p>
                    <div className={styles.NavItemBar}></div>
                  </div>
                </Link>

                <Link href="ViewOrderShip">
                  <p className={styles.NavItem}>Endereço</p>
                </Link>

                <Link href="ViewOrderBudget">
                  <p className={styles.NavItem}>Orçamento</p>
                </Link>
              </div>

              <div className={styles.BudgetHeadO}>
                <p className={styles.OrderTotalValue}>Valor total:</p>
                <p className={styles.OrderValue}>
                  R$ {parseFloat(userData?.valorTotal || "0").toFixed(2)}
                </p>
              </div>
            </div>

            <div className={styles.linhaOrder}></div>

            <div className={styles.BudgetData}>
              <div className={styles.PessoalData}>
                <div className={styles.InputContainer}>
                  <div className={styles.InputField}>
                    <p className={styles.FieldLabel}>Tipo de pessoa</p>
                    <p className={styles.FixedData}>{userData?.tipoPessoa}</p>
                  </div>

                  <div className={styles.InputField}>
                    <p className={styles.FieldLabel}>CPF/CNPJ</p>
                    <p className={styles.FixedData}>{userData?.cpf}</p>
                  </div>
                </div>

                <div className={styles.InputContainer}>
                  <div className={styles.InputField}>
                    <p className={styles.FieldLabel}>Nome completo</p>
                    <p className={styles.FixedData}>{userData?.nomeCompleto}</p>
                  </div>

                  <div className={styles.InputField}>
                    <p className={styles.FieldLabel}>Email</p>
                    <p className={styles.FixedData}>{userData?.email}</p>
                  </div>
                </div>

                <div className={styles.InputContainer}>
                  <div className={styles.InputField}>
                    <p className={styles.FieldLabel}>Telefone</p>
                    <p className={styles.FixedData}>{userData?.Telefone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
