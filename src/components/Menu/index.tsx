import Head from 'next/head';
import styles from '../Menu/styles.module.css';

import Link from 'next/link';

export default function Menu() {
    return (
    <>
        <Head>
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
            `}</style>
        </Head>

        <div className={styles.Container}>
            <div className={styles.MenuLateral}>
                <img className={styles.logo} src="/logovermelha.png" alt="logo" />
                <div className="side-menu">
                    <h1 className={styles.titleMenu}>Menu Principal</h1>
                    <ul className={styles.list}>
                        <li className={styles.listElement}><img src="Home.png" alt="Home"></img><Link href="/"> Home</Link></li>
                        <li className={styles.listElement}><img src="Orcamento.png" alt="Home"></img><Link href="/"> Orçamentos</Link></li>
                        <li className={styles.listElement}><img src="pedidos.png" alt="Home"></img><Link href="/"> Pedidos</Link></li>
                        <li className={styles.listElement}><img src="relatorios.png" alt="Home"></img><Link href="/"> Relatórios</Link></li>
                    </ul>

                    <div className={styles.linha}></div>

                    <h1 className={styles.titleMenu}>Parâmetros</h1>
                    <ul className={styles.list}>
                        <li className={styles.listElement}><img src="produtos.png" alt="Home"></img><Link href="/"> Produtos</Link></li>
                        <li className={styles.listElement}><img src="config.png" alt="Home"></img><Link href="/"> Configurações</Link></li>
                        <li className={styles.listElement}><img src="Conta.png" alt="Home"></img><Link href="/"> Conta</Link></li>
                    </ul>

                    <div className={styles.linha}></div>

                    <h1 className={styles.titleMenu}> Ajuda</h1>
                    <ul className={styles.list}>
                        <li className={styles.listElement}><img src="Central de Ajuda.png" alt="Home"></img><Link href="/"> Central de Ajuda</Link></li>
                    </ul>

                    <div className={styles.linha}></div>

                    <ul className={styles.list}>
                        <li className={styles.listElement}><Link href="/">Encerrar Sessão </Link><img src="Encerrar.png" alt="Encerrar"></img></li>
                    </ul>

                </div>
            </div>
            <div className={styles.Page}>
            
            </div>
        </div>
    </>
)
}