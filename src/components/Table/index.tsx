import React, { useEffect, useState } from "react";
import styles from "../../styles/Table.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { collection, db, getDoc, doc } from "../../../firebase";
import { GetServerSidePropsContext } from "next";
import { getDocs } from "firebase/firestore";
import { ITableBudgets } from "./type";

interface Order {
  id: string;

  NumeroPedido: string;
  Telefone: string;
  nomeCompleto: string;
  Ativo: boolean;
  Entrega: string;
  dataCadastro: string;
  formaPagamento: string;
  valorTotal: string;
}

export default function Table({ searchValue }: ITableBudgets) {
  const [filteredData, setFilteredData] = useState<Order[]>([]);
  const [teste, setTeste] = useState<Order[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // I

  useEffect(() => {
    const fetchData = async () => {
      const dbCollection = collection(db, "Orders");
      const budgetSnapshot = await getDocs(dbCollection);
      const budgetList = budgetSnapshot.docs.map((doc) => {
        const data = doc.data();
        const budget: Order = {
          id: doc.id,
          NumeroPedido: data.NumeroPedido,
          Telefone: data.Telefone,
          nomeCompleto: data.nomeCompleto,
          Ativo: data.Ativo,
          Entrega: data.Entrega,
          dataCadastro: data.dataCadastro,
          formaPagamento: data.formaPagamento,
          valorTotal: data.valorTotal,
        };
        return budget;
      });
      setTeste(budgetList);
      console.log(budgetList);
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
      console.log(filteredItems);
    };
    filterData();
  }, [searchValue, teste]);

  const data = [
    {
      numeroPedido: "1231",
      numeroTelefone: "(11) 99999-9999",
      cliente: "Cliente A",
      situacao: "Ativo",
      prazoEntrega: "10/05/2023",
      dataCadastro: "05/05/2023",
      valorTotal: "R$ 100,00",
    },
    {
      numeroPedido: "4567",
      numeroTelefone: "(11) 99999-9999",
      cliente: "Cliente B",
      situacao: "Inativo",
      prazoEntrega: "15/05/2023",
      dataCadastro: "08/05/2023",
      valorTotal: "R$ 150,00",
    },
    {
      numeroPedido: "4562",
      numeroTelefone: "(11) 99999-9999",
      cliente: "Cliente B",
      situacao: "Ativo",
      prazoEntrega: "15/05/2023",
      dataCadastro: "08/05/2023",
      valorTotal: "R$ 150,00",
    },
    {
      numeroPedido: "4561",
      numeroTelefone: "(11) 99999-9999",
      cliente: "Cliente B",
      situacao: "Ativo",
      prazoEntrega: "15/05/2023",
      dataCadastro: "08/05/2023",
      valorTotal: "R$ 150,00",
    },
    {
      numeroPedido: "4563",
      numeroTelefone: "(11) 99999-9999",
      cliente: "Cliente B",
      situacao: "Ativo",
      prazoEntrega: "15/05/2023",
      dataCadastro: "08/05/2023",
      valorTotal: "R$ 150,00",
    },
    {
      numeroPedido: "4568",
      numeroTelefone: "(11) 99999-9999",
      cliente: "Cliente B",
      situacao: "Inativo",
      prazoEntrega: "15/05/2023",
      dataCadastro: "08/05/2023",
      valorTotal: "R$ 150,00",
    },
    // ... adicione mais linhas de dados conforme necessário
  ];
  const totalItems = filteredData.length; // Total de resultados
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.tableContianer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.thNone}></th>
            <th>Nº Orçamento</th>
            <th>CLIENTE</th>
            <th>SITUAÇÃO</th>
            <th>PRAZO DE ENTREGA</th>
            <th>DATA DE CADASTRO</th>
            <th>VALOR TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <Link href="/ViewBudgetData">
            {currentData.map((item, index) => (
              <tr
                className={styles.budgetItem}
                key={item.id}
                onClick={() => {
                  localStorage.setItem("selectedBudgetId", item.id);
                }}
              >
                <td>
                  <img
                    src="./More.png"
                    width={5}
                    height={20}
                    className={styles.MarginRight}
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
                    <p> Data de cadastro:{item.dataCadastro}</p>
                  </span>
                </td>
                <td className={styles.td}>
                  {item.Entrega}
                  <br />
                  <span className={styles.diasUteis}>15 dias Utéis</span>
                </td>
                <td className={styles.td}>
                  {item.dataCadastro}
                  <br />
                  <span className={styles.diasUteis}>{item.nomeCompleto}</span>
                </td>
                <td className={styles.td}>
                  {item.valorTotal}
                  <br />
                  <span className={styles.diasUteis}>À Vista</span>
                </td>
              </tr>
            ))}
          </Link>
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
