import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "../../styles/TableProducts.module.scss";

import { deleteDoc, getDocs } from "firebase/firestore";
import { collection, db, doc } from "../../../firebase";
import { useMenu } from "../Context/context";
import { ITableBudgets } from "./type";

import { toast } from "react-toastify";

interface Foam {
  id: string;
  Nome: string;

  Login: string;
  NomeEmpresa: string;
  Tipo: string;
}

export default function TableFoam({
  searchValue,
  orderValue,
  filterValue,
}: ITableBudgets) {
  const [filteredData, setFilteredData] = useState<Foam[]>([]);
  const [teste, setTeste] = useState<Foam[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  let userId: string | null;
  let typeUser: string | null;
  let adminPai: string | null;
  if (typeof window !== "undefined") {
    userId = window.localStorage.getItem("userId");
    typeUser = window.localStorage.getItem("typeUser");
    adminPai = window.localStorage.getItem("adminPai");
  }

  useEffect(() => {
    const fetchData = async () => {
      const dbCollection = collection(db, "Login");
      const budgetSnapshot = await getDocs(dbCollection);
      const budgetList: Foam[] = budgetSnapshot.docs.flatMap((doc) => {
        const data = doc.data();

        if (
          userId === "lB2pGqkarGyq98VhMGM6" ||
          (typeUser === "admin" && data.adminPai === userId) ||
          (typeUser === "vendedor" && data.adminPai === adminPai)
        ) {
          return [
            {
              id: doc.id,
              Nome: data.Nome,
              Login: data.Login,
              NomeEmpresa: data.NomeEmpresa,
              Tipo: data.Tipo,
            },
          ];
        } else {
          return [];
        }
      });

      setTeste(budgetList);
      setFilteredData(budgetList);
      console.log("Set data: ", budgetList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue !== "") {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      const newData = teste.filter((item) =>
        item.Nome.toLowerCase().includes(lowerCaseSearchValue)
      );
      setFilteredData(newData);
    } else {
      setFilteredData(teste);
    }
  }, [searchValue, teste]);

  useEffect(() => {
    let sortedData = [...teste];

    // Ordenação
    if (orderValue !== "") {
      switch (orderValue) {
        case "codigoCrescente":
          sortedData.sort((a, b) =>
            a.Nome.toUpperCase() < b.Nome.toUpperCase() ? -1 : 1
          );
          break;
        case "codigoDescrescente":
          sortedData.sort((a, b) =>
            a.Nome.toUpperCase() > b.Nome.toUpperCase() ? -1 : 1
          );
          break;

        default:
          break;
      }
    }

    setFilteredData(sortedData);
  }, [orderValue, filterValue, teste]);

  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToDisplay = filteredData.slice(startIndex, endIndex);
  const currentData = teste.slice(startIndex, endIndex);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

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
  };

  const handleDeleteItem = async (itemId: string) => {
    if (typeUser === "vendedor") {
      toast.error("Você não tem permissão para excluir usuários.");
      return;
    }

    try {
      await deleteDoc(doc(db, "Login", itemId));

      const updatedData = filteredData.filter((item) => item.id !== itemId);
      setFilteredData(updatedData);

      toast.success("Usuário excluído com sucesso!", {
        style: {
          fontSize: "12px",
          fontWeight: 600,
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir o fornecedor.");
    }
  };

  const { openMenu, setOpenMenu } = useMenu();

  const handleOpenMenuDiv = () => {
    setOpenMenu(false);
    console.log(openMenu);
  };

  useEffect(() => {
    const filterData = () => {
      const filteredItems = teste.filter(
        (item) =>
          item.Login?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.Nome?.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredData(filteredItems);
    };
    filterData();
  }, [searchValue, teste]);

  const [openFilter, setOpenFilter] = useState(false);

  const combinedData = [...filteredData, ...currentData];

  const uniqueData = combinedData.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return (
    <div className={styles.tableContianer} onClick={handleOpenMenuDiv}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.thNone}></th>
            <th>Nome</th>
            <th>Email</th>
            <th>Nome da empresa</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {dataToDisplay.map((item, index) => (
            <tr
              className={styles.budgetItem}
              key={item.id}
              onClick={() => {
                localStorage.setItem("selectedSupplierId", item.id);
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
                    {/* <button>Editar</button>
                    <button className={styles.buttonGren}>
                      Efetivar orçamento
                    </button> */}
                    {/* <button className={styles.buttonBlack}>
                      <Link
                        href={{
                          pathname: `/SupplierEdit`,
                          query: { id: item.id },
                        }}
                      >
                        Editar
                      </Link>
                    </button> */}
                    <button
                      className={styles.buttonRed}
                      onClick={() => handleDeleteItem(item.id)}
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
                <b>{item.Nome}</b>
              </td>
              <td className={styles.td}>
                <b>{item.Login}</b>
              </td>

              <td className={styles.td}>
                <b>{item.NomeEmpresa}</b>
              </td>

              <td className={styles.td}>
                <b>{item.Tipo}</b>
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
          {currentPage && (
            <div
              key={currentPage}
              className={styles.RodapePaginacaoContadorDestaque}
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage}
            </div>
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
