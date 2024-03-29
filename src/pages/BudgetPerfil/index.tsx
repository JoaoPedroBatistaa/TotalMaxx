import HeaderBudget from "@/components/HeaderBudget";
import SideMenuBudget from "@/components/SideMenuBudget";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMenu } from "../../components/Context/context";
import styles from "../../styles/BudgetPerfil.module.scss";

import { getDocs } from "firebase/firestore";
import Select from "react-select";
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

interface OptionType {
  value: string;
  label: string;
}

export default function BudgetPerfil() {
  const router = useRouter();
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

  const [produtos, setProdutos] = useState<Foam[]>([]);

  const [selectedOption, setSelectedOption] = useState(() => {
    if (typeof window !== "undefined") {
      const codigoPerfil = localStorage.getItem("codigoPerfil");
      return codigoPerfil ? codigoPerfil : "";
    }
  });

  const [selectedOption2, setSelectedOption2] = useState(() => {
    if (typeof window !== "undefined") {
      const codigoPerfil2 = localStorage.getItem("codigoPerfil2");
      return codigoPerfil2 ? codigoPerfil2 : "";
    }
  });

  const [espessura, setEspessura] = useState("");
  const { openMenu, setOpenMenu } = useMenu();
  const [precoTotal, setPrecoTotal] = useState(0);

  let userId: string | null;
  if (typeof window !== "undefined") {
    userId = window.localStorage.getItem("userId");
  }

  useEffect(() => {
    const fetchData = async () => {
      let userType, adminParentId, currentUserId;

      // Verifica se está no ambiente do navegador para acessar o localStorage
      if (typeof window !== "undefined") {
        userType = window.localStorage.getItem("typeUser");
        adminParentId = window.localStorage.getItem("adminPai");
        currentUserId = window.localStorage.getItem("userId");
      }

      // Determina o caminho da coleção com base no tipo de usuário e admin pai
      let path;
      if (userType === "admin" && currentUserId) {
        path = `Login/${currentUserId}/Perfil`; // Caminho para usuários admin
      } else if (userType === "vendedor" && adminParentId) {
        path = `Login/${adminParentId}/Perfil`; // Caminho para usuários vendedores
      } else {
        // Se não houver userType definido ou não for admin/vendedor com um adminPai, loga um erro
        console.error("User type is not set correctly or adminPai is missing");
        return; // Encerra a função se as condições não forem atendidas
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

  const [preco, setPreco] = useState(() => {
    if (typeof window !== "undefined") {
      const valorPerfil = localStorage.getItem("valorPerfil");
      return valorPerfil ? Number(valorPerfil) : 0;
    }
  });

  useEffect(() => {
    let totalPreco = 0;

    // Logic for selectedOption
    if (selectedOption) {
      const selectedProduto1 = produtos.find(
        (produto) => produto.codigo === selectedOption
      );
      if (selectedProduto1) {
        const tamanho =
          localStorage.getItem("novoTamanho") ||
          localStorage.getItem("Tamanho") ||
          "0x0";
        const [altura, largura] = tamanho.split("x").map(Number);

        const valor1 =
          ((altura * 2 + largura * 2 + selectedProduto1.largura * 4) / 100) *
          selectedProduto1.valorMetro;
        const perda1 = (valor1 / 100) * selectedProduto1.valorPerda;
        const lucro1 = ((valor1 + perda1) * selectedProduto1.margemLucro) / 100;

        localStorage.setItem(
          "metroPerfil",
          selectedProduto1.valorMetro.toString()
        );
        localStorage.setItem(
          "perdaPerfil",
          selectedProduto1.valorPerda.toString()
        );
        localStorage.setItem(
          "lucroPerfil",
          selectedProduto1.margemLucro.toString()
        );
        localStorage.setItem(
          "larguraPerfil",
          selectedProduto1.largura.toString()
        );

        const priceForOption1 = valor1 + perda1 + lucro1;

        localStorage.setItem("valorPerfilUm", priceForOption1.toString());

        totalPreco += priceForOption1;
      }
    }

    // Logic for selectedOption2
    if (selectedOption2) {
      const selectedProduto2 = produtos.find(
        (produto) => produto.codigo === selectedOption2
      );
      if (selectedProduto2) {
        const tamanho =
          localStorage.getItem("novoTamanho") ||
          localStorage.getItem("Tamanho") ||
          "0x0";
        const [altura, largura] = tamanho.split("x").map(Number);

        const valor2 =
          ((altura * 2 + largura * 2 + selectedProduto2.largura * 4) / 100) *
          selectedProduto2.valorMetro;
        const perda2 = (valor2 / 100) * selectedProduto2.valorPerda;
        const lucro2 = ((valor2 + perda2) * selectedProduto2.margemLucro) / 100;

        localStorage.setItem("codigoPerfilDois", selectedOption2);
        localStorage.setItem(
          "metroPerfilDois",
          selectedProduto2.valorMetro.toString()
        );
        localStorage.setItem(
          "perdaPerfilDois",
          selectedProduto2.valorPerda.toString()
        );
        localStorage.setItem(
          "lucroPerfilDois",
          selectedProduto2.margemLucro.toString()
        );
        localStorage.setItem(
          "larguraPerfilDois",
          selectedProduto2.largura.toString()
        );

        const priceForOption2 = valor2 + perda2 + lucro2;

        localStorage.setItem("valorPerfilDois", priceForOption2.toString());

        totalPreco += priceForOption2;
      }
    }

    setPreco(totalPreco);
    localStorage.setItem("valorPerfil", totalPreco.toString());
  }, [selectedOption, selectedOption2, espessura, produtos]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Salve o ID do intervalo para limpar mais tarde
      if (typeof window !== "undefined") {
        const valorPerfil = Number(localStorage.getItem("valorPerfil"));
        const valorFoam = Number(localStorage.getItem("valorFoam"));
        const valorVidro = Number(localStorage.getItem("valorVidro"));
        const valorPaspatur = Number(localStorage.getItem("valorPaspatur"));
        const valorImpressao = Number(localStorage.getItem("valorImpressao"));
        const valorColagem = Number(localStorage.getItem("valorColagem"));
        const valorMontagem = Number(localStorage.getItem("valorMontagem"));
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

  useEffect(() => {
    if (selectedOption) {
      if (typeof window !== "undefined") {
        localStorage.setItem("espessuraPerfil", espessura);
      }
    }
  }, [selectedOption, espessura]);

  const [selectedOptionObject, setSelectedOptionObject] =
    useState<OptionType | null>(null);

  const options = produtos.map((produto) => ({
    value: produto.codigo,
    label: `${produto.codigo} - ${produto.descricao}`,
  }));

  useEffect(() => {
    if (selectedOption) {
      const matchingOption = options.find(
        (option) => option.value === selectedOption
      );
      if (
        matchingOption &&
        matchingOption.value !== selectedOptionObject?.value
      ) {
        setSelectedOptionObject(matchingOption);
      }
    } else {
      setSelectedOptionObject(null);
    }
  }, [options, selectedOption]);

  const handleSelectChange = (option: any) => {
    setSelectedOption(option ? option.value : "");
    localStorage.setItem("codigoPerfil", option ? option.value : "");
  };

  // Transforme 'selectedOption' de string para objeto para o componente Select
  const valueForSelect = selectedOption
    ? options.find((option) => option.value === selectedOption)
    : null;

  const options2 = produtos.map((produto) => ({
    value: produto.codigo,
    label: `${produto.codigo} - ${produto.descricao}`,
  }));

  const [selectedOptionObject2, setSelectedOptionObject2] =
    useState<OptionType | null>(null);

  useEffect(() => {
    if (selectedOption2) {
      const matchingOption2 = options2.find(
        (option) => option.value === selectedOption2
      );
      if (
        matchingOption2 &&
        matchingOption2.value !== selectedOptionObject2?.value
      ) {
        setSelectedOptionObject2(matchingOption2);
      }
    } else {
      setSelectedOptionObject2(null);
    }
  }, [options2, selectedOption2]);

  const handleSelectChange2 = (option: any) => {
    setSelectedOption2(option ? option.value : "");
    localStorage.setItem("codigoPerfil2", option ? option.value : "");
  };

  const handleEspessuraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEspessura(event.target.value);
  };

  function handleButtonFinish(event: MouseEvent<HTMLButtonElement>) {
    if (typeof window !== "undefined") {
      const valorPerfil = Number(localStorage.getItem("valorPerfil"));
      const valorFoam = Number(localStorage.getItem("valorFoam"));
      const valorVidro = Number(localStorage.getItem("valorVidro"));
      const valorPaspatur = Number(localStorage.getItem("valorPaspatur"));
      const valorMontagem = Number(localStorage.getItem("valorMontagem"));
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

  function handleRemoveProduct() {
    // Limpa os valores do localStorage
    localStorage.removeItem("valorPerfil");
    localStorage.removeItem("metroPerfil");
    localStorage.removeItem("perdaPerfil");
    localStorage.removeItem("lucroPerfil");
    localStorage.removeItem("larguraPerfil");
    localStorage.removeItem("descricaoPerfil");
    localStorage.removeItem("codigoPerfil");
    localStorage.removeItem("perfil");

    // Chama setPreco(0)
    setPreco(0);
    setSelectedOption("");
  }

  const handleRemoveProduct1 = () => {
    setSelectedOption("");
    localStorage.removeItem("codigoPerfil");
  };

  const handleRemoveProduct2 = () => {
    setSelectedOption2("");
    setShowSecondInput(false);
    localStorage.removeItem("codigoPerfil2");
  };

  const [showSecondInput, setShowSecondInput] = useState(false);

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
            <p className={styles.BudgetTitle}>Qual perfil será utilizado?</p>

            <div className={styles.BudgetHeadS}>
              <div className={styles.TotalValue}>
                <p className={styles.ValueLabel}>Valor do perfil</p>
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
            Informe abaixo qual perfil será utilizado no pedido
          </p>

          <div className={styles.InputContainer}>
            <div className={styles.InputField}>
              <p className={styles.FieldLabel}>Código</p>
              <Select
                id="codigo"
                className={styles.SelectField}
                value={selectedOptionObject}
                onChange={handleSelectChange}
                options={options}
                placeholder="Selecione um código"
                isSearchable={true}
              />
            </div>
            <div className={styles.InputField}>
              <p className={styles.FieldLabel}>.</p>

              <button
                className={styles.removeProduct}
                onClick={handleRemoveProduct1}
              >
                Remover
              </button>
            </div>

            {!showSecondInput && (
              <>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>.</p>

                  <button
                    className={styles.addProduct}
                    onClick={() => setShowSecondInput(true)}
                  >
                    Adicionar mais um perfil
                  </button>
                </div>
              </>
            )}

            {showSecondInput && (
              <>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Código 2</p>
                  <Select
                    id="codigo2"
                    className={styles.SelectField}
                    value={selectedOptionObject2}
                    onChange={handleSelectChange2}
                    options={options2}
                    placeholder="Selecione um código"
                    isSearchable={true}
                  />
                </div>

                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>.</p>
                  <button
                    className={styles.removeProduct}
                    onClick={handleRemoveProduct2}
                  >
                    Remover
                  </button>
                </div>
              </>
            )}
          </div>

          <p className={styles.Preview}>PREVIEW</p>

          <div className={styles.PreviewContainer}>
            <div className={styles.PreviewImgContainer}>
              <img src="./molduraPerfil.png" className={styles.PreviewImg} />
            </div>

            <p className={styles.PreviewSize}>{espessura} CM</p>
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
