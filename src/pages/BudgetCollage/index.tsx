import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/BudgetCollage.module.scss";

import HeaderBudget from "@/components/HeaderBudget";
import SideMenuBudget from "@/components/SideMenuBudget";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMenu } from "../../components/Context/context";

import { getDocs } from "firebase/firestore";
import { collection, db } from "../../../firebase";

interface Foam {
  id: string;

  codigo: string;
  descricao: string;
  margemLucro: number;
  valorMetro: number;
  valorPerda: number;
  fabricante: string;
  largura: number;
}

export default function BudgetCollage() {
  const router = useRouter();
  const { openMenu, setOpenMenu } = useMenu();
  const [selectedOptionCollage, setSelectedOptionCollage] = useState("");
  const [hasBudgets, setHasBudgets] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const budgets = localStorage.getItem("budgets");

    if (budgets) {
      setHasBudgets(true);
    }

    if (!userId) {
      router.push("/Login");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("collage", selectedOptionCollage);
  }, [selectedOptionCollage]);

  const handleSelectChangeCollage = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptionCollage(event.target.value);
  };

  function handleButtonFinish(event: MouseEvent<HTMLButtonElement>) {
    if (typeof window !== "undefined") {
      const valorPerfil = Number(localStorage.getItem("valorPerfil"));
      const valorFoam = Number(localStorage.getItem("valorFoam"));
      const valorVidro = Number(localStorage.getItem("valorVidro"));
      const valorMontagem = Number(localStorage.getItem("valorMontagem"));
      const valorPaspatur = Number(localStorage.getItem("valorPaspatur"));
      const tamanho = localStorage.getItem("Tamanho") || "0x0";

      if (
        valorPerfil ||
        valorFoam ||
        valorVidro ||
        valorMontagem ||
        (valorPaspatur && tamanho !== "0x0") ||
        tamanho !== "x"
      ) {
        window.localStorage.setItem("preco", JSON.stringify(precoTotal));

        toast.success("Finalizando Orçamento!");
        setTimeout(() => {
          window.location.href = "/BudgetDecision";
        }, 500);
      } else {
        toast.error("Informe os dados necessarios");
      }
    }
  }

  const handleOpenMenuDiv = () => {
    setTimeout(() => {
      setOpenMenu(false);
    }, 100);
  };

  const [preco, setPreco] = useState(() => {
    if (typeof window !== "undefined") {
      const valorColagem = localStorage.getItem("valorColagem");
      return valorColagem ? Number(valorColagem) : 0;
    }
  });

  const [precoTotal, setPrecoTotal] = useState(0);
  const [produtos, setProdutos] = useState<Foam[]>([]);

  let userId: string | null;
  if (typeof window !== "undefined") {
    userId = window.localStorage.getItem("userId");
  }

  useEffect(() => {
    const fetchData = async () => {
      let userType, adminParentId, currentUserId;

      // Assegura que o código seja executado apenas no lado do cliente
      if (typeof window !== "undefined") {
        userType = window.localStorage.getItem("typeUser");
        adminParentId = window.localStorage.getItem("adminPai");
        currentUserId = window.localStorage.getItem("userId");
      }

      // Define o caminho da coleção com base no tipo de usuário e admin pai
      let path;
      if (userType === "admin" && currentUserId) {
        path = `Login/${currentUserId}/Colagem`; // Caminho para usuários admin
      } else if (userType === "vendedor" && adminParentId) {
        path = `Login/${adminParentId}/Colagem`; // Caminho para usuários vendedores
      } else {
        console.error("User type is not set correctly or adminPai is missing");
        return; // Encerra a execução se os valores necessários não estiverem presentes
      }

      const dbCollection = collection(db, path);
      const budgetSnapshot = await getDocs(dbCollection);
      const budgetList = budgetSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          descricao: data.descricao,
          codigo: data.codigo,
          margemLucro: data.margemLucro,
          valorMetro: data.valorMetro,
          valorPerda: data.valorPerda,
          fabricante: data.fabricante,
          largura: data.largura,
        };
      });
      setProdutos(budgetList);
    };
    fetchData();
  }, []);

  const [selectedOption, setSelectedOption] = useState(() => {
    if (typeof window !== "undefined") {
      const codigoColagem = localStorage.getItem("codigoColagem");
      return codigoColagem ? codigoColagem : "";
    }
  });

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    localStorage.setItem("codigoColagem", event.target.value);
  };

  useEffect(() => {
    // if (selectedOption && selectedOptionCollage === "SIM") {
    const selectedProduto = produtos.find(
      (produto) => produto.codigo === selectedOption
    );
    if (selectedProduto) {
      const tamanho =
        localStorage.getItem("novoTamanho") ||
        localStorage.getItem("Tamanho") ||
        "0x0";
      const [altura, largura] = tamanho.split("x").map(Number);

      const valor =
        (altura / 100) * (largura / 100) * selectedProduto.valorMetro;
      const perda = (valor / 100) * selectedProduto.valorPerda;
      const lucro = ((valor + perda) * selectedProduto.margemLucro) / 100;

      setPreco((prevPreco) => {
        const novoPreco = valor + perda + lucro;
        localStorage.setItem("valorColagem", novoPreco.toString());
        if (!localStorage.getItem("novoTamanho")) {
          localStorage.setItem("valorColagemAntigo", novoPreco.toString());
        }
        localStorage.setItem(
          "metroColagem",
          selectedProduto.valorMetro.toString()
        );
        localStorage.setItem(
          "perdaColagem",
          selectedProduto.valorPerda.toString()
        );
        localStorage.setItem(
          "lucroColagem",
          selectedProduto.margemLucro.toString()
        );
        localStorage.setItem(
          "descricaoColagem",
          selectedProduto.descricao.toString()
        );
        return novoPreco;
      });
    }
    // }
  }, [selectedOption, produtos]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Salve o ID do intervalo para limpar mais tarde
      if (typeof window !== "undefined") {
        const valorPerfil = Number(localStorage.getItem("valorPerfil"));
        const valorFoam = Number(localStorage.getItem("valorFoam"));
        const valorVidro = Number(localStorage.getItem("valorVidro"));
        const valorMontagem = Number(localStorage.getItem("valorMontagem"));
        const valorPaspatur = Number(localStorage.getItem("valorPaspatur"));
        const valorImpressao = Number(localStorage.getItem("valorImpressao"));
        const valorColagem = Number(localStorage.getItem("valorColagem"));
        const valorInstalacao = Number(localStorage.getItem("valorInstalacao"));

        setPrecoTotal(
          valorPaspatur +
            valorPerfil +
            valorFoam +
            valorVidro +
            valorImpressao +
            valorInstalacao +
            valorColagem +
            valorMontagem
        );
      }
    }, 200); // Tempo do intervalo em milissegundos

    return () => clearInterval(intervalId); // Limpe o intervalo quando o componente for desmontado
  }, []);

  function handleRemoveProduct() {
    // Limpa os valores do localStorage
    localStorage.removeItem("valorColagem");
    localStorage.removeItem("metroColagem");
    localStorage.removeItem("perdaColagem");
    localStorage.removeItem("lucroColagem");
    localStorage.removeItem("descricaoColagem");
    localStorage.removeItem("codigoColagem");

    // Chama setPreco(0)
    setPreco(0);
    setSelectedOption("");
  }

  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
        `}</style>
      </Head>

      <HeaderBudget></HeaderBudget>
      <ToastContainer />
      <div className={styles.Container} onClick={handleOpenMenuDiv}>
        <SideMenuBudget activeRoute={router.pathname}></SideMenuBudget>

        <div className={styles.BudgetContainer}>
          <div className={styles.BudgetHead}>
            <p className={styles.BudgetTitle}>Necessita de colagem?</p>

            <div className={styles.BudgetHeadS}>
              <div className={styles.TotalValue}>
                <p className={styles.ValueLabel}>Valor da Colagem</p>
                <p className={styles.Value}>R${preco ? preco.toFixed(2) : 0}</p>
              </div>
              <div className={styles.TotalValue}>
                <p className={styles.ValueLabel}>Valor total</p>
                <p className={styles.Value}>R${precoTotal.toFixed(2)}</p>
              </div>

              <button
                className={styles.FinishButton}
                onClick={handleButtonFinish}
              >
                <img
                  src="./finishBudget.png"
                  alt="Finalizar"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Finalizar Orçamento</span>
              </button>

              {hasBudgets && (
                <button
                  className={styles.DesistirOrcamento}
                  onClick={handleButtonFinish}
                >
                  <img
                    src="./finishBudget.png"
                    alt="Finalizar"
                    className={styles.buttonImage}
                  />
                  <span className={styles.buttonText}>
                    Desistir Do Orçamento
                  </span>
                </button>
              )}
            </div>
          </div>

          <p className={styles.Notes}>
            Informe abaixo se será utilizada colagem no pedido
          </p>

          <div className={styles.InputContainer}>
            {/* <div className={styles.InputField}>
              <p className={styles.FieldLabel}>Colagem</p>
              <select
                id="collage"
                className={styles.SelectField}
                value={selectedOptionCollage}
                onChange={handleSelectChangeCollage}
              >
                <option value="" disabled selected>
                  Inclui impressão?
                </option>
                <option value="SIM" selected={selectedOptionCollage === "SIM"}>
                  SIM
                </option>
                <option value="NÃO" selected={selectedOptionCollage === "NÃO"}>
                  NÃO
                </option>
              </select>
            </div> */}

            <div className={styles.InputField}>
              <p className={styles.FieldLabel}>Selecione o código</p>
              <select
                id="tipoImpressao"
                className={styles.SelectField}
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="" disabled selected>
                  Selecione um código
                </option>
                {produtos.map((produto) => (
                  <option key={produto.codigo} value={produto.codigo}>
                    {produto.codigo} - {produto.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.InputField}>
              <p className={styles.FieldLabel}>.</p>

              <button
                className={styles.removeProduct}
                onClick={handleRemoveProduct}
              >
                Remover
              </button>
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
