import React, { useState } from 'react';
import Hero from './Hero';
import DomainCheckResult from './DomainCheckResult';
import Footer from './Footer';

const DomainChecker = () => {
  const [domain, setDomain] = useState(''); // Состояние для ввода домена
  const [zone, setZone] = useState('.kz'); // Состояние для выбора доменной зоны
  const [checkResult, setCheckResult] = useState(null); // Состояние для хранения результата проверки
  const [whoisInfo, setWhoisInfo] = useState(null); // Состояние для хранения информации WHOIS

  // Доступ к логину и паролю из переменных окружения
  const username = process.env.REACT_APP_API_USERNAME;
  const password = process.env.REACT_APP_API_PASSWORD;

  // Функция для проверки домена
  const checkDomain = async () => {
    const fullDomain = `${domain}${zone}`; // Собираем полное доменное имя с зоной
    try {
      // Отправляем запрос на проверку доступности домена
      const response = await fetch(
        `https://api.ps.kz/kzdomain/domain-check?username=${username}&password=${password}&input_format=http&output_format=json&dname=${fullDomain}`
      );
      const data = await response.json();
      setCheckResult(data); // Сохраняем результат в состояние

      // Если домен занят, делаем запрос на WHOIS
      if (data.answer.domains[0].result !== 'Available') {
        const whoisResponse = await fetch(
          `https://api.ps.kz/kzdomain/domain-whois?username=${username}&password=${password}&input_format=http&output_format=json&dname=${fullDomain}&contact_whois=1`
        );
        const whoisData = await whoisResponse.json();
        setWhoisInfo(whoisData); // Сохраняем информацию WHOIS
      } else {
        setWhoisInfo(null); // Очищаем WHOIS информацию, если домен свободен
      }
    } catch (error) {
      console.error('Ошибка при проверке домена:', error);
    }
  };

  return (
    <div className="flex bg-gray-200 flex-col min-h-screen">
      {/* Контент */}
      <div className="flex-grow">
        <Hero
          domain={domain}
          setDomain={setDomain}
          zone={zone}
          setZone={setZone}
          checkDomain={checkDomain}
        />

        <section className='relative z-50 -top-14 '>
          <div className='container mx-auto '>
            <div className='flex items-center justify-center w-full h-full flex-col bg-white rounded-lg'>
              <div className=' w-full'>

                <DomainCheckResult result={checkResult} whoisInfo={whoisInfo} />
              </div>
            </div>
          </div>
        </section>

        <section className='bg-white px-5 py-10'>
          <div className='container mx-auto '>
            <h1 className='font-bold'>Что такое WHOIS?</h1>
            <p>
              WHOIS — глобальная база данных по доменам и IP-адресам, в которой хранится информация о владельцах и прочие сопутствующие данные (когда был зарегистрирован домен, какой статус и.т.д).
            </p>
          </div>

        </section>
      </div>

      {/* Футер */}
      <Footer />
    </div>
  );
};

export default DomainChecker;
