import Head from 'next/head';
import styles from '../../styles/HeaderViewBudget.module.scss';
import Link from 'next/link';

export default function HeaderBudget() {
  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
        `}</style>
      </Head>

      <div className={styles.HeaderContainer}>
        <p className={styles.NewBudget}>VISUALIZAR ORÇAMENTO</p>
        <Link href='/Budgets'>
          <img src="./close.png" className={styles.Close} />
        </Link>
      </div>
    </>
  )
}