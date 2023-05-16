import Head from 'next/head';
import styles from '../../pages/Orcamento1/Orcamento1.module.css';

import Link from 'next/link';

export default function Orcamento1() {
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
                    Menu Principal
                    <ul>
                        <li><img src="dwad" alt="Home"></img><Link href="/">Home</Link></li>
                        <li><img src="Orcamento.png" alt="Home"></img><Link href="/">Orçamentos</Link></li>
                        <li><img src="pedidos.png" alt="Home"></img><Link href="/">Pedidos</Link></li>
                        <li><img src="relatorios.png" alt="Home"></img><Link href="/">Relatórios</Link></li>
                    </ul>
                    Parâmetros
                    <ul>
                        <li><img src="produtos.png" alt="Home"></img><Link href="/">Produtos</Link></li>
                        <li><img src="config.png" alt="Home"></img><Link href="/">Configurações</Link></li>
                        <li><img src="Conta.png" alt="Home"></img><Link href="/">Conta</Link></li>
                    </ul>
                    Ajuda
                    <ul>
                        <li><img src="Central de Ajuda.png" alt="Home"></img><Link href="/">Central de Ajuda</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.Page}>
            
            </div>
        </div>
    </>
)
}