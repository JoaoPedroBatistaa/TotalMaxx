import Head from 'next/head';
import styles from '../Orcamento2/styles.module.css';
import Menu from '../../components/Menu'

import Link from 'next/link';

function Orcamento2() {
    return( 
    <>
        <Menu></Menu>

        <div className={styles.Container}>
            
                <div className={styles.Header}>
                    <p>VISUALIZAR ORÇAMENTO</p>
                    <Link href='/'><img src="X.png" alt="Fechar"></img></Link>
                </div>
                
                <div className={styles.listContainer}>
                    <ul  className={styles.List}>
                        <Link href='Orcamento1'>
                            <li className={styles.listElement}>Dados do cliente</li>
                        </Link>
                            <li className={styles.listOrc}>Orçamento</li>
                        <li className={styles.valorTotal}>Valor total: R$1.350,00</li>
                    </ul>

                    <div className={styles.Linha}></div>
                    
                    <div className={styles.formContainer}>
                            <div className={styles.Form}>
                                <p className={styles.label}>Resumo do roçamento</p>
                                <div className={styles.bloco}>
                                    <p className={styles.label2}>Tamanho</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>120cm x 90cm</p>
                                    </div>
                                    <p className={styles.label2}>Impressão</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Sim</p>
                                        <p className={styles.label3}>Papel</p>
                                    </div>
                                    <p className={styles.label2}>Perfil</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>4402</p>
                                        <p className={styles.label3}>10 cm</p>
                                    </div>
                                    <p className={styles.label2}>Vidro</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Sim</p>
                                        <p className={styles.label3}>10 cm</p>
                                    </div>
                                    <p className={styles.label2}>Foam</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Não</p>
                                    </div>
                                    <p className={styles.label2}>Paspatur</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Sim</p>
                                        <p className={styles.label3}>4052</p>
                                        <p className={styles.label3}>10cm x 10cm x 10cm x 10cm</p>
                                    </div>
                                    <p className={styles.label2}>Colagem</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Não</p>
                                    </div>
                                    <p className={styles.label2}>Impressão</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Não</p>
                                    </div>
                                    <p className={styles.label2}>Instalação</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Sim</p>
                                        <p className={styles.label3}>R$82,00</p>
                                    </div>
                                    <p className={styles.label2}>Entrega</p>
                                    <div className={styles.conteudo}>
                                        <p className={styles.label3}>Retirada na loja</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.Form2}>
                                <p className={styles.label}>Pagamentos e prazos</p>
                                    <div className={styles.bloco}>
                                        <p className={styles.label2}>Mão de obra extra</p>
                                        <div className={styles.conteudo}>
                                            <p className={styles.label3}>R$100,00</p>
                                        </div>
                                        <p className={styles.label2}>Forma de pagamento</p>
                                        <div className={styles.conteudo}>
                                            <p className={styles.label3}>À vista</p>
                                        </div>
                                        <p className={styles.label2}>Prazo para entrega</p>
                                        <div className={styles.conteudo}>
                                            <p className={styles.label3}>27/05/2023</p>
                                        </div>
                                        <p className={styles.Obeservacao}>Observação</p>
                                        <div className={styles.conteudo}>
                                            <p className={styles.label3}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                                        </div>
                                    </div>
                            </div>

                            <div className={styles.Form3}>
                            <p className={styles.Valor}>Valor Total</p>
                                    <div className={styles.bloco}>
                                        <div className={styles.conteudo}>
                                            <p className={styles.preco}>R$1350,00</p>
                                        </div>
                                    </div>
                            </div>

                            <div className={styles.Form4}>
                                <div className={styles.whats}>
                                    <img src="whatsapp.png" alt="" width='100px' />
                                    <p>ENVIAR POR WHATSAPP</p>
                                </div>
                                <div className={styles.pdf}>
                                    <img src="PDF.png" alt="" width='100px' />
                                    <p>GERAR PDF</p>
                                </div>
                            </div>
                    </div>
                </div>
            <div className={styles.Footer}>
                <p>© Total Maxx 2023, todos os direitos reservados</p>
            </div>
        </div>
    </>
)
}

export default Orcamento2;