
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Login from '../components/Login';

export default function Home() {
  return (
    <>
      <div className='Container'>
        <div className='ImageContainer'>
          <img className='logo' src="/logo.png" alt="logo" />
        </div>
        teste
        <div className='LoginContainer'></div>
      </div>
    </>
  )
}
