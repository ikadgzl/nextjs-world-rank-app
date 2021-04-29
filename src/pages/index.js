import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import CountriesTable from './components/CountriesTable/CountriesTable';
import Layout from './components/Layout/Layout';
import SearchInput from './components/SearchInput/SearchInput';

export default function Home({ countries }) {
  const [keyword, setKeywords] = useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeywords(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.count}> Found {countries.length} countries</div>

      <SearchInput
        placeholder='Filter by Name, Region or Subregion'
        onChange={onInputChange}
      />

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const result = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await result.json();

  return {
    props: {
      countries
    }
  };
};
