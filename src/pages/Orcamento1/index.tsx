import Head from 'next/head';
import styles from '../Orcamento1/styles.module.css';
import Menu from '../../components/Menu'

import Link from 'next/link';

function Orcamento1() {
    return( 
    <>
        <Menu></Menu>

        <div className={styles.Container}>
            <div className={styles.Header}>
                <p>VISUALIZAR ORÇAMENTO</p>
                <img src="X.png" alt="Fechar"></img>
            </div>
            
            <div className={styles.listContainer}>
                <ul  className={styles.List}>
                    <li className={styles.listElement}>Dados do cliente</li>
                    <li className={styles.listOrc}>Orçamento</li>
                    <li className={styles.valorTotal}>Valor total: R$1.350,00</li>
                </ul>
                <div className={styles.Linha}></div>
                <div className={styles.formContainer}>
                        <div className={styles.Form}>
                            <p className={styles.label}>Nome Completo</p>
                            <input className={styles.field} type="text" />

                            <label className={styles.label}>Telefone</label>
                            <input className={styles.field} type="tel" />
                        </div>
                        <div className={styles.Form2}>
                            <p className={styles.label}>Email</p>
                            <input className={styles.field} type="email" />
                        </div>
                </div>
            </div>
        </div>
    </>
)
}

export default Orcamento1;