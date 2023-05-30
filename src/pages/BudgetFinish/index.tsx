import Head from 'next/head';
import styles from '../../styles/BudgetFinish.module.scss';
import { useRouter } from 'next/router';

import HeaderBudget from '@/components/HeaderBudget';
import SideMenuBudget from '@/components/SideMenuBudget';
import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';

import { db, addDoc, collection } from '../../../firebase';

export default function BudgetFinish() {

  const router = useRouter();

  const nomeCompleto = localStorage.getItem('nomeCompleto');
  const Telefone = localStorage.getItem('Telefone');
  const email = localStorage.getItem('email');
  const instalacao = localStorage.getItem('instalacao');
  const valorInstalacao = localStorage.getItem('valorInstalacao');
  const tipoEntrega = localStorage.getItem('tipoEntrega');
  const valorEntrega = localStorage.getItem('valorEntrega');
  const impressao = localStorage.getItem('impressao');
  const tipoImpressao = localStorage.getItem('tipoImpressao');
  const fileInput = localStorage.getItem('fileInput');
  const collage = localStorage.getItem('collage');
  const paspatur = localStorage.getItem('paspatur');
  const codigoPaspatur = localStorage.getItem('codigoPaspatur');
  const dimensoesPaspatur = localStorage.getItem('dimensoesPaspatur');
  const foam = localStorage.getItem('foam');
  const codigoFoam = localStorage.getItem('codigoFoam');
  const mdf = localStorage.getItem('mdf');
  const codigoMdf = localStorage.getItem('codigoMdf');
  const vidro = localStorage.getItem('vidro');
  const espessuraVidro = localStorage.getItem('espessuraVidro');
  const espelho = localStorage.getItem('espelho');
  const espessuraEspelho = localStorage.getItem('espessuraEspelho');
  const codigoPerfil = localStorage.getItem('codigoPerfil');
  const espessuraPerfil = localStorage.getItem('espessuraPerfil');
  const Tamanho = localStorage.getItem('Tamanho');
  const tipoPessoa = localStorage.getItem('tipoPessoa');

  const handleSaveOrder = async () => {
    try {
      await addDoc(collection(db, 'Orders'), {
        nomeCompleto,
        Telefone,
        email,
        instalacao,
        valorInstalacao,
        tipoEntrega,
        valorEntrega,
        impressao,
        tipoImpressao,
        fileInput,
        collage,
        paspatur,
        codigoPaspatur,
        dimensoesPaspatur,
        foam,
        codigoFoam,
        mdf,
        codigoMdf,
        vidro,
        espessuraVidro,
        espelho,
        espessuraEspelho,
        codigoPerfil,
        espessuraPerfil,
        Tamanho,
        dataCadastro,
        Entrega,
        cpf,
        endereco,
        cidade,
        bairro,
        cep,
        complemento,
        tipoPessoa,
      });
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  };

  const formatarData = (data: Date) => {
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses começam do 0 em JavaScript
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  const dataCadastroInicial = new Date();
  const EntregaInicial = new Date();
  EntregaInicial.setDate(dataCadastroInicial.getDate() + 5);

  const dataCadastro = formatarData(dataCadastroInicial);
  const Entrega = formatarData(EntregaInicial);

  const [selectedOption, setSelectedOption] = useState('opcao1');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    localStorage.setItem('tipoPessoa', selectedOption);
  };

  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    localStorage.setItem('cpf', cpf);
    localStorage.setItem('endereco', endereco);
    localStorage.setItem('numero', numero);
    localStorage.setItem('cep', cep);
    localStorage.setItem('estado', estado);
    localStorage.setItem('complemento', complemento);
    localStorage.setItem('bairro', bairro);
    localStorage.setItem('cidade', cidade);
  }, [cpf, endereco, numero, cep, estado, complemento, bairro, cidade]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'CPF':
        setCpf(event.target.value);
        break;
      case 'Endereco':
        setEndereco(event.target.value);
        break;
      case 'Numero':
        setNumero(event.target.value);
        break;
      case 'CEP':
        setCep(event.target.value);
        break;
      case 'estado':
        setEstado(event.target.value);
        break;
      case 'Complemento':
        setComplemento(event.target.value);
        break;
      case 'Bairro':
        setBairro(event.target.value);
        break;
      case 'Cidade':
        setCidade(event.target.value);
        break;
    }
  };

  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
        `}</style>
      </Head>

      <HeaderBudget></HeaderBudget>
      <div className={styles.Container}>
        <SideMenuBudget activeRoute={router.pathname} ></SideMenuBudget>

        <div className={styles.BudgetContainer}>

          <div className={styles.BudgetHead}>
            <p className={styles.BudgetTitle}>Efetivar Pedido</p>
          </div>

          <div className={styles.BudgetData}>
            <div className={styles.PessoalData}>
              <p className={styles.BudgetSubTitle}>Dados pessoais</p>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Tipo de pessoa</p>
                  <select className={styles.SelectFieldPerson} value={selectedOption}
                    onChange={handleSelectChange}>
                    <option value="FÍSICA" selected={selectedOption === 'FÍSICA'}>
                      FÍSICA
                    </option>
                    <option value="JURÍDICA" selected={selectedOption === 'JURÍDICA'}>
                      JURÍDICA
                    </option>
                  </select>
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Nome completo</p>
                  <input type="text" className={styles.FieldSave} placeholder='' />
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>CPF</p>
                  <input id='CPF' type="text" className={styles.FieldSave} placeholder='' onChange={handleInputChange} />
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Telefone</p>
                  <input type="tel" className={styles.FieldSave} placeholder='' />
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Email</p>
                  <input type="mail" className={styles.FieldSave} placeholder='' />
                </div>
              </div>
            </div>

            <div className={styles.linhaData}></div>

            <div className={styles.AdressData}>
              <p className={styles.BudgetSubTitle}>Endereço</p>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>CEP</p>
                  <input id='CEP' type="text" className={styles.FieldSmall} placeholder='' onChange={handleInputChange} />
                </div>

                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Endereço *</p>
                  <input id='Endereco' type="text" className={styles.FieldSave} placeholder='' onChange={handleInputChange} />
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Número *</p>
                  <input id='Numero' type="text" className={styles.FieldSmall} placeholder='' onChange={handleInputChange} />
                </div>

                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Complemento</p>
                  <input id='Complemento' type="text" className={styles.FieldSave} placeholder='' onChange={handleInputChange} />
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Bairro *</p>
                  <input id='Bairro' type="text" className={styles.Field} placeholder='' onChange={handleInputChange} />
                </div>

                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Cidade</p>
                  <input id='Cidade' type="text" className={styles.Field} placeholder='' onChange={handleInputChange} />
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Estado *</p>
                  <input id='estado' type="text" className={styles.Field} placeholder='' onChange={handleInputChange} />
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Tipo de entrega</p>
                  <select className={styles.SelectField} value={selectedOption}
                    onChange={handleSelectChange}>
                    <option value="opcao1" selected={selectedOption === 'opcao1'}>
                      TRANSPORTADORA
                    </option>
                    <option value="opcao2" selected={selectedOption === 'opcao2'}>
                      SEDEX
                    </option>
                  </select>
                </div>

                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Valor da entrega</p>
                  <p className={styles.FixedValue}>R$245,30</p>
                </div>
              </div>

              <div className={styles.InputContainer}>
                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Necessita de instalação?</p>
                  <select className={styles.SelectField} value={selectedOption}
                    onChange={handleSelectChange}>
                    <option value="opcao1" selected={selectedOption === 'opcao1'}>
                      SIM
                    </option>
                    <option value="opcao2" selected={selectedOption === 'opcao2'}>
                      NÃO
                    </option>
                  </select>
                </div>

                <div className={styles.InputField}>
                  <p className={styles.FieldLabel}>Valor da instalação</p>
                  <p className={styles.FixedValue}>R$125,30</p>
                </div>
              </div>


            </div>
          </div>

          <div className={styles.linhaSave}></div>

          <div className={styles.ButtonsFinish}>
            <Link href='BudgetSave'>
              <button className={styles.CancelButton}>Cancelar</button>
            </Link>
            <Link href='Home'>
              <button className={styles.SaveButton} onClick={handleSaveOrder}>Efetivar pedido</button>
            </Link>
          </div>

          <div className={styles.Copyright}>
            <p className={styles.Copy}>© Total Maxx 2023, todos os direitos reservados</p>
          </div>

        </div>
      </div >
    </>
  )
}