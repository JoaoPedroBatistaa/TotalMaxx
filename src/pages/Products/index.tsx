import Head from "next/head";
import styles from "../../styles/Requests.module.scss";
import { useRouter } from "next/router";

import SideMenuHome from "@/components/SideMenuHome";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import HeaderHome from "@/components/HeaderHome";
import HeaderProducts from "@/components/HeaderProducts";
import SearchInput from "@/components/InputSearch";
import SearchInputList from "@/components/InputSearchList";
import SearchInputListProducts from "@/components/InputSearchList";
import GridComponent from "@/components/GridRequests";
import TableFoam from "@/components/TableFoam";
import TableImpressao from "@/components/TableImpressao";
import TablePaspatur from "@/components/TablePaspatur";
import TablePerfil from "@/components/TablePerfil";
import TableVidro from "@/components/TableVidro";
import Table from "@/components/Table";

export default function Products() {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false); // Inicializa o estado openMenu

  const [filterStates, setFilterStates] = useState({
    foam: false,
    impressao: false,
    paspatur: false,
    perfil: false,
    vidro: false
  });

  const toggleFilter = (key: keyof typeof filterStates) => {
    setFilterStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("opcao1");
  const [searchValue, setSearchValue] = useState("");
  const [searchValue1, setSearchValue1] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [searchValue3, setSearchValue3] = useState("");
  const [searchValue4, setSearchValue4] = useState("");

  const [valueRadio, setValueRadio] = useState("");

  const [orderValue, setOrderValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue1(e.target.value);
  };
  const handleSearchChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue2(e.target.value);
  };
  const handleSearchChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue3(e.target.value);
  };
  const handleSearchChange4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue4(e.target.value);
  };


  console.log(searchValue);

  const handleOrderValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrderValue(event.target.value);
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValue(event.target.value);
  };
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
          <HeaderProducts></HeaderProducts>
          <div className={styles.MainContainer}>

            <div className={styles.ListContainer}>
              <div className={styles.ListMenu}>
                <div className={styles.ListMenu}>
                  <p className={styles.ProductName}>Foam</p>
                  <div
                    className={styles.ListMenuFilter}
                    onClick={() => toggleFilter("foam")}
                  >
                    <img src="./Filter.svg"></img>{" "}
                    <span className={styles.ListMenuFilterText}>Filtros</span>
                  </div>
                  <SearchInputListProducts
                    handleSearchChange={(e) => handleSearchChange(e)}
                  ></SearchInputListProducts>
                </div>

                <div className={styles.ListMenuRight}>
                  <Link href="/ProductFoam">
                    <button className={styles.ListMenuButton}>
                      <span className={styles.maisNoneMobile}>
                        {" "}
                        Novo Produto
                      </span>
                      <span className={styles.maisNone}> +</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div
                className={`${filterStates.foam
                  ? styles.containerFilter
                  : styles.containerFilterClose
                  }`}
              >
                <div className={styles.listFilter}>
                  <h2>ORDENAR POR:</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeCrescente"
                      name="ordenarPor"
                      value="nomeCrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeCrescente">Codigo crescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeDecrescente"
                      name="ordenarPor"
                      value="nomeDecrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeDecrescente">Codigo decrescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="maiorValor"
                      name="ordenarPor"
                      value="maiorValor"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="maiorValor">Maior Lucro</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataCadastro"
                      name="ordenarPor"
                      value="dataCadastro"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataCadastro">Valor Metro</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="valorPerda"
                      name="ordenarPor"
                      value="dataVencimento"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataVencimento">Valor da Perda</label>
                  </div>
                </div>
              </div>
              <div className={styles.MarginTop}></div>
              {/* <GridComponent/> */}
              <TableFoam
                searchValue={searchValue}
                orderValue={orderValue}
                filterValue={filterValue}
              />
            </div>

            <div className={styles.ListContainer}>
              <div className={styles.ListMenu}>
                <div className={styles.ListMenu}>
                  <p className={styles.ProductName}>Impressão</p>
                  <div
                    className={styles.ListMenuFilter}
                    onClick={() => toggleFilter("impressao")}
                  >
                    <img src="./Filter.svg"></img>{" "}
                    <span className={styles.ListMenuFilterText}>Filtros</span>
                  </div>
                  <SearchInputListProducts
                    handleSearchChange={(e) => handleSearchChange1(e)}
                  ></SearchInputListProducts>
                </div>
                <div className={styles.ListMenuRight}>
                  <Link href="/ProductImpressao">
                    <button className={styles.ListMenuButton}>
                      <span className={styles.maisNoneMobile}>
                        {" "}
                        Novo Produto
                      </span>
                      <span className={styles.maisNone}> +</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div
                className={`${filterStates.impressao
                  ? styles.containerFilter
                  : styles.containerFilterClose
                  }`}
              >
                <div className={styles.listFilter}>
                  <h2>ORDENAR POR:</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeCrescente"
                      name="ordenarPor"
                      value="nomeCrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeCrescente">Nome crescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeDecrescente"
                      name="ordenarPor"
                      value="nomeDecrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeDecrescente">Nome decrescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="maiorValor"
                      name="ordenarPor"
                      value="maiorValor"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="maiorValor">Maior Valor</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataCadastro"
                      name="ordenarPor"
                      value="dataCadastro"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataCadastro">Data de cadastro</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataVencimento"
                      name="ordenarPor"
                      value="dataVencimento"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataVencimento">Data de vencimento</label>
                  </div>
                  <span className={styles.sublinado}></span>
                  <h2>SITUAÇÃO</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="todos"
                      name="situacao"
                      value="todos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="todos">Todos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="ativos"
                      name="situacao"
                      value="ativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="ativos">Ativos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="inativos"
                      name="situacao"
                      value="inativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="inativos">Inativos</label>
                  </div>
                </div>
              </div>
              <div className={styles.MarginTop}></div>
              {/* <GridComponent/> */}
              <TableImpressao
                searchValue={searchValue1}
                orderValue={orderValue}
                filterValue={filterValue}
              />
            </div>

            <div className={styles.ListContainer}>
              <div className={styles.ListMenu}>
                <div className={styles.ListMenu}>
                  <p className={styles.ProductName}>Paspatur</p>
                  <div
                    className={styles.ListMenuFilter}
                    onClick={() => toggleFilter("paspatur")}
                  >
                    <img src="./Filter.svg"></img>{" "}
                    <span className={styles.ListMenuFilterText}>Filtros</span>
                  </div>
                  <SearchInputListProducts
                    handleSearchChange={(e) => handleSearchChange2(e)}
                  ></SearchInputListProducts>
                </div>
                <div className={styles.ListMenuRight}>
                  <Link href="/ProductPaspatur">
                    <button className={styles.ListMenuButton}>
                      <span className={styles.maisNoneMobile}>
                        {" "}
                        Novo Produto
                      </span>
                      <span className={styles.maisNone}> +</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div
                className={`${filterStates.paspatur
                  ? styles.containerFilter
                  : styles.containerFilterClose
                  }`}
              >
                <div className={styles.listFilter}>
                  <h2>ORDENAR POR:</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeCrescente"
                      name="ordenarPor"
                      value="nomeCrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeCrescente">Nome crescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeDecrescente"
                      name="ordenarPor"
                      value="nomeDecrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeDecrescente">Nome decrescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="maiorValor"
                      name="ordenarPor"
                      value="maiorValor"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="maiorValor">Maior Valor</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataCadastro"
                      name="ordenarPor"
                      value="dataCadastro"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataCadastro">Data de cadastro</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataVencimento"
                      name="ordenarPor"
                      value="dataVencimento"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataVencimento">Data de vencimento</label>
                  </div>
                  <span className={styles.sublinado}></span>
                  <h2>SITUAÇÃO</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="todos"
                      name="situacao"
                      value="todos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="todos">Todos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="ativos"
                      name="situacao"
                      value="ativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="ativos">Ativos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="inativos"
                      name="situacao"
                      value="inativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="inativos">Inativos</label>
                  </div>
                </div>
              </div>
              <div className={styles.MarginTop}></div>
              {/* <GridComponent/> */}
              <TablePaspatur
                searchValue={searchValue2}
                orderValue={orderValue}
                filterValue={filterValue}
              />
            </div>

            <div className={styles.ListContainer}>
              <div className={styles.ListMenu}>
                <div className={styles.ListMenu}>
                  <p className={styles.ProductName}>Perfil</p>
                  <div
                    className={styles.ListMenuFilter}
                    onClick={() => toggleFilter("perfil")}
                  >
                    <img src="./Filter.svg"></img>{" "}
                    <span className={styles.ListMenuFilterText}>Filtros</span>
                  </div>
                  <SearchInputListProducts
                    handleSearchChange={(e) => handleSearchChange3(e)}
                  ></SearchInputListProducts>
                </div>
                <div className={styles.ListMenuRight}>
                  <Link href="/ProductPerfil">
                    <button className={styles.ListMenuButton}>
                      <span className={styles.maisNoneMobile}>
                        {" "}
                        Novo Produto
                      </span>
                      <span className={styles.maisNone}> +</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div
                className={`${filterStates.perfil
                  ? styles.containerFilter
                  : styles.containerFilterClose
                  }`}
              >
                <div className={styles.listFilter}>
                  <h2>ORDENAR POR:</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeCrescente"
                      name="ordenarPor"
                      value="nomeCrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeCrescente">Nome crescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeDecrescente"
                      name="ordenarPor"
                      value="nomeDecrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeDecrescente">Nome decrescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="maiorValor"
                      name="ordenarPor"
                      value="maiorValor"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="maiorValor">Maior Valor</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataCadastro"
                      name="ordenarPor"
                      value="dataCadastro"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataCadastro">Data de cadastro</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataVencimento"
                      name="ordenarPor"
                      value="dataVencimento"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataVencimento">Data de vencimento</label>
                  </div>
                  <span className={styles.sublinado}></span>
                  <h2>SITUAÇÃO</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="todos"
                      name="situacao"
                      value="todos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="todos">Todos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="ativos"
                      name="situacao"
                      value="ativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="ativos">Ativos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="inativos"
                      name="situacao"
                      value="inativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="inativos">Inativos</label>
                  </div>
                </div>
              </div>
              <div className={styles.MarginTop}></div>
              {/* <GridComponent/> */}
              <TablePerfil
                searchValue={searchValue3}
                orderValue={orderValue}
                filterValue={filterValue}
              />
            </div>

            {/* NOME PRODUTO */}
            <div className={styles.ListContainer}>
              <div className={styles.ListMenu}>
                <div className={styles.ListMenu}>
                  <p className={styles.ProductName}>Vidro</p>
                  <div
                    className={styles.ListMenuFilter}
                    onClick={() => toggleFilter("vidro")}
                  >
                    <img src="./Filter.svg"></img>{" "}
                    <span className={styles.ListMenuFilterText}>Filtros</span>
                  </div>
                  <SearchInputListProducts
                    handleSearchChange={(e) => handleSearchChange4(e)}
                  ></SearchInputListProducts>
                </div>
                <div className={styles.ListMenuRight}>
                  <Link href="/ProductVidro">
                    <button className={styles.ListMenuButton}>
                      <span className={styles.maisNoneMobile}>
                        {" "}
                        Novo Produto
                      </span>
                      <span className={styles.maisNone}> +</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div
                className={`${filterStates.vidro
                  ? styles.containerFilter
                  : styles.containerFilterClose
                  }`}
              >
                <div className={styles.listFilter}>
                  <h2>ORDENAR POR:</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeCrescente"
                      name="ordenarPor"
                      value="nomeCrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeCrescente">Nome crescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="nomeDecrescente"
                      name="ordenarPor"
                      value="nomeDecrescente"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="nomeDecrescente">Nome decrescente</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="maiorValor"
                      name="ordenarPor"
                      value="maiorValor"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="maiorValor">Maior Valor</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataCadastro"
                      name="ordenarPor"
                      value="dataCadastro"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataCadastro">Data de cadastro</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="dataVencimento"
                      name="ordenarPor"
                      value="dataVencimento"
                      onChange={handleOrderValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="dataVencimento">Data de vencimento</label>
                  </div>
                  <span className={styles.sublinado}></span>
                  <h2>SITUAÇÃO</h2>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="todos"
                      name="situacao"
                      value="todos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="todos">Todos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="ativos"
                      name="situacao"
                      value="ativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="ativos">Ativos</label>
                  </div>
                  <div className={styles.filterItem}>
                    <input
                      type="radio"
                      id="inativos"
                      name="situacao"
                      value="inativos"
                      onChange={handleFilterValueChange}
                      className={styles.filterItem}
                    />
                    <label htmlFor="inativos">Inativos</label>
                  </div>
                </div>
              </div>
              <div className={styles.MarginTop}></div>
              {/* <GridComponent/> */}
              <TableVidro
                searchValue={searchValue4}
                orderValue={orderValue}
                filterValue={filterValue}
              />
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
