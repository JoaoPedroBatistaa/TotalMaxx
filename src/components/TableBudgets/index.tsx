import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/TableBudgets.module.scss";

import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { collection, db, doc } from "../../../firebase";
import { useMenu } from "../../components/Context/context";
import { ITableBudgets } from "./type";

import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Budget {
  id: string;
  NumeroPedido: string;
  Telefone: string;
  nomeCompleto: string;
  Ativo: boolean;
  Entrega: string;
  dataCadastro: string;
  formaPagamento: string;
  valorTotal: string;
  email: string;
  budgets: any;
}

export default function TableBudgets({
  searchValue,
  orderValue,
  filterValue,
}: ITableBudgets) {
  const [filteredData, setFilteredData] = useState<Budget[]>([]);
  const [teste, setTeste] = useState<Budget[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  let userId: string | null;
  if (typeof window !== "undefined") {
    userId = window.localStorage.getItem("userId");
  }

  useEffect(() => {
    const fetchData = async () => {
      const dbCollection = collection(db, `Login/${userId}/Budget`);
      const budgetSnapshot = await getDocs(dbCollection);
      const budgetList = budgetSnapshot.docs
        .filter((doc) => doc.id !== "NumeroDoOrçamento")
        .map((doc) => {
          const data = doc.data();
          const budget: Budget = {
            id: doc.id,
            NumeroPedido: data.NumeroPedido,
            Telefone: data.Telefone,
            nomeCompleto: data.nomeCompleto,
            Ativo: data.Ativo,
            Entrega: data.Entrega,
            dataCadastro: data.dataCadastro,
            formaPagamento: data.formaPagamento,
            valorTotal: data.valorTotal,
            email: data.email,
            budgets: data.budgets,
          };
          return budget;
        });

      // Ordenando de forma decrescente pelo NumeroPedido
      budgetList.sort(
        (a, b) => Number(b.NumeroPedido) - Number(a.NumeroPedido)
      );

      setTeste(budgetList);
      setFilteredData(budgetList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filteredItems = teste.filter(
        (item) =>
          item.nomeCompleto
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.dataCadastro?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredItems);
    };
    filterData();
  }, [searchValue, teste]);

  useEffect(() => {
    let sortedData = [...teste];

    // Filtragem
    if (filterValue !== "") {
      if (filterValue === "ativos") {
        sortedData = sortedData.filter((item) => item.Ativo === true);
      } else if (filterValue === "inativos") {
        sortedData = sortedData.filter(
          (item) => item.Ativo === undefined || item.Ativo === false
        );
      }
    }

    // Ordenação
    if (orderValue !== "") {
      switch (orderValue) {
        case "nomeCrescente":
          sortedData.sort((a, b) => {
            const nomeA = a.nomeCompleto.toUpperCase();
            const nomeB = b.nomeCompleto.toUpperCase();
            if (nomeA < nomeB) {
              return -1;
            }
            if (nomeA > nomeB) {
              return 1;
            }
            return 0;
          });
          break;
        case "nomeDecrescente":
          sortedData.sort((a, b) => {
            const nomeA = a.nomeCompleto.toUpperCase();
            const nomeB = b.nomeCompleto.toUpperCase();
            if (nomeA > nomeB) {
              return -1;
            }
            if (nomeA < nomeB) {
              return 1;
            }
            return 0;
          });
          break;
        case "maiorValor":
          sortedData = [...sortedData]; // Cria uma cópia da array original
          sortedData.sort(
            (a, b) => parseFloat(b.valorTotal) - parseFloat(a.valorTotal)
          );
          break;
        case "dataCadastro":
          sortedData.sort((a, b) => {
            const dataA = new Date(a.dataCadastro);
            const dataB = new Date(b.dataCadastro);
            if (dataA < dataB) {
              return -1;
            }
            if (dataA > dataB) {
              return 1;
            }
            return 0;
          });
          break;
        case "dataVencimento":
          sortedData.sort((a, b) => {
            const dataA = new Date(a.Entrega);
            const dataB = new Date(b.Entrega);
            if (dataA < dataB) {
              return -1;
            }
            if (dataA > dataB) {
              return 1;
            }
            return 0;
          });
          break;
        // Adicione mais casos para outras opções de ordenação
      }
    }

    setFilteredData(sortedData);
  }, [orderValue, filterValue, teste]);

  // ...

  const totalItems = filteredData.length; // Total de resultados
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const [openFilter, setOpenFilter] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleClickImg = (event: any, itemId: any) => {
    event.stopPropagation();
    setOpenMenus((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
    console.log(itemId);
  };

  const handleDeleteItem = async (
    itemId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    try {
      await deleteDoc(doc(db, `Login/${userId}/Budget`, itemId));

      const updatedData = filteredData.filter((item) => item.id !== itemId);
      setFilteredData(updatedData);

      toast.success("Orçamento excluído com sucesso!", {
        autoClose: 2000,
        style: {
          fontSize: "12px",
          fontWeight: 600,
        },
      });
      router.push("/Budgets");
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir o orçamento.");
      // router.push("/Budgets");
    }
  };
  // Função para ordenar a lista pelo campo 'dataCadastro' em ordem decrescente
  const sortDataByDate = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return (
        new Date(b.dataCadastro).getTime() - new Date(a.dataCadastro).getTime()
      );
    });
    setFilteredData(sortedData);
  };

  useEffect(() => {
    sortDataByDate();
  }, []);

  const { openMenu, setOpenMenu } = useMenu();
  const handleOpenMenuDiv = () => {
    setOpenMenu(false);
    console.log(openMenu);
  };

  const router = useRouter();

  // EFETIVAR

  const buscarDadosCliente = async (nomeCompleto: unknown, email: unknown) => {
    const clientsRef = collection(db, `Login/${userId}/Clients`);

    const q = query(
      clientsRef,
      where("NomeCompleto", "==", nomeCompleto),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const clientData = querySnapshot.docs[0].data();
      const tipoPessoa =
        clientData.cpf?.replace(/\D/g, "").length === 11
          ? "FÍSICA"
          : "JURÍDICA";

      return {
        cpf: clientData.cpf || "",
        endereco: clientData.venue || "",
        cidade: clientData.cidade || "",
        bairro: clientData.bairro || "",
        cep: clientData.cep || "",
        numero: clientData.numero || "",
        complemento: clientData.complemento || "",
        tipoPessoa: tipoPessoa,
        estado: clientData.estado || "",
      };
    } else {
      return {};
    }
  };

  const salvarOrcamento = async (orcamentoSelecionado: any) => {
    console.log("Dados recebidos:", orcamentoSelecionado);

    try {
      const numeroDoPedidoRef = doc(
        db,
        `Login/${userId}/Orders`,
        "NumeroDoPedido"
      );
      const numeroDoPedidoSnap = await getDoc(numeroDoPedidoRef);

      let NumeroPedido;

      if (!numeroDoPedidoSnap.exists()) {
        await setDoc(numeroDoPedidoRef, {
          numero: 0,
        });
        NumeroPedido = 1;
      } else {
        const numeroAtual = numeroDoPedidoSnap.data().numero;
        NumeroPedido = Number(numeroAtual) + 1;
        await setDoc(numeroDoPedidoRef, { numero: NumeroPedido });
      }

      const dadosCliente = await buscarDadosCliente(
        orcamentoSelecionado.nomeCompleto,
        orcamentoSelecionado.email
      );

      console.log(dadosCliente);

      const orcamento = {
        NumeroPedido: NumeroPedido,
        Telefone: orcamentoSelecionado.Telefone || "",
        dataCadastro:
          orcamentoSelecionado.dataCadastro || new Date().toISOString(),
        desconto: orcamentoSelecionado.desconto || 0,
        email: orcamentoSelecionado.email || "",
        nomeCompleto: orcamentoSelecionado.nomeCompleto || "",
        valorTotal: orcamentoSelecionado.valorTotal || 0,
        budgets: orcamentoSelecionado.budgets || {},
        ...dadosCliente,
      };

      await addDoc(collection(db, `Login/${userId}/Orders`), orcamento);
      toast.success("Orçamento efetivado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar orçamento: ", error);
      toast.error("Erro ao efetivar orçamento.");
    }
  };

  return (
    <div className={styles.tableContianer} onClick={handleOpenMenuDiv}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.thNone}></th>
            <th>Nº Orçamento</th>
            <th>CLIENTE</th>
            <th>SITUAÇÃO</th>
            <th id={styles.tdNone}>PRAZO DE ENTREGA </th>
            <th id={styles.tdNone}>DATA DE CADASTRO</th>
            <th id={styles.tdNone}>VALOR TOTAL</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item, index) => (
            <tr
              className={styles.budgetItem}
              key={item.id}
              onClick={() => {
                localStorage.setItem("selectedBudgetId", item.id);
                router.push("/ViewBudgetData");
              }}
            >
              <td className={styles.tdDisabled}>
                <div
                  className={`${
                    openMenus[item.id]
                      ? styles.containerMore
                      : styles.containerMoreClose
                  }`}
                >
                  <div
                    className={styles.containerX}
                    onClick={(event) => handleClickImg(event, item.id)}
                  >
                    X
                  </div>
                  <div className={styles.containerOptionsMore}>
                    <Link href="/ViewBudgetData">Vizualizar</Link>

                    {/* <button>Editar</button> */}
                    <button
                      className={styles.buttonGren}
                      onClick={(event) => {
                        event.stopPropagation(); // Para evitar que o evento se propague
                        salvarOrcamento(item);
                      }}
                    >
                      Efetivar orçamento
                    </button>

                    <button
                      className={styles.buttonRed}
                      onClick={(event) => handleDeleteItem(item.id, event)}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <img
                  src="./More.png"
                  width={5}
                  height={20}
                  className={styles.MarginRight}
                  onClick={(event) => handleClickImg(event, item.id)}
                />
              </td>

              <td className={styles.td}>
                <b>#{item.NumeroPedido}</b>
              </td>
              <td className={styles.td}>
                <b>{item.nomeCompleto}</b>
                <br />
                <span className={styles.diasUteis}> {item.Telefone}</span>
              </td>
              <td className={styles.td}>
                <span
                  className={
                    item.Ativo == true ? styles.badge : styles.badgeInativo
                  }
                >
                  {item.Ativo ? (
                    <img
                      src="./circleBlue.png"
                      width={6}
                      height={6}
                      className={styles.marginRight8}
                    />
                  ) : (
                    <img
                      src="./circleRed.png"
                      width={6}
                      height={6}
                      className={styles.marginRight8}
                    />
                  )}
                  {item.Ativo ? "Ativo" : "Inativo"}
                </span>
                <br />
                <span className={styles.dataCadastro}>
                  <p id={styles.tdNone}>
                    {" "}
                    Data de cadastro:{item.dataCadastro}
                  </p>
                </span>
              </td>
              <td className={styles.td} id={styles.tdNone}>
                Confira no orçamento
                <br />
                <span className={styles.diasUteis}></span>
              </td>
              <td className={styles.td} id={styles.tdNone}>
                {item.dataCadastro}
                <br />
                <span className={styles.diasUteis}>{item.nomeCompleto}</span>
              </td>
              <td className={styles.td} id={styles.tdNone}>
                R$ {parseFloat(item.valorTotal || "0").toFixed(2)}
                <br />
                <span className={styles.diasUteis}>À Vista</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.RodapeContainer}>
        <div className={styles.RodapeContinaerLeft}>
          <div className="pagination-info">
            Exibindo {startIndex + 1} - {Math.min(endIndex, totalItems)} de{" "}
            {totalItems} resultados
          </div>
          <div>
            <select
              className={styles.SelectMax}
              value={itemsPerPage.toString()}
              onChange={handleItemsPerPageChange}
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>60</option>
              <option>70</option>
              <option>80</option>
              <option>90</option>
              <option>100</option>
            </select>
          </div>
          <div>
            <b>de {totalItems}</b> resultados
          </div>
        </div>
        <div className={styles.RodapeContinaerRight}>
          <div
            className={styles.RodapePaginacaoContador}
            onClick={() => {
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className={styles.RodapePaginacaoIcone}
            />
          </div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <div
                key={pageNumber}
                className={`${
                  pageNumber === currentPage
                    ? styles.RodapePaginacaoContadorDestaque
                    : styles.RodapePaginacaoContadorSemBorda
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </div>
            )
          )}
          <div
            className={styles.RodapePaginacaoContador}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className={styles.RodapePaginacaoIcone}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
