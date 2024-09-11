import React from 'react';
import DomainInput from './DomainInput';

const Hero = ({ domain, setDomain, zone, setZone, checkDomain }) => {

    return (

        <>
            <div className='bg-black p-5 flex items-center justify-center absolute w-full left-0 top-0 bg-opacity-75 z-50'>
                <div className='container mx-auto'>
                    <div className='flex items-center justify-between'>
                    <img className="h-[18px]" src="https://mediaway.kz/themes/the_cms/assets/img/logo.svg" alt="" />
                    
                    {/* <a className='text-white' href=''>Часто задаваемые вопросы</a> */}
                    <a className='text-white' href=''>Консультация</a>
                    </div>
                </div>
            </div>
            <div className="hero h-[400px] bg-black flex items-center flex-col justify-center relative"

                style={{
                    backgroundImage: `url('/img/bg.jpg')`, // Указываем путь к изображению в public/img
                    backgroundSize: 'cover', // Покрытие всего блока
                    backgroundPosition: 'center', // Центрируем изображение
                    backgroundRepeat: 'no-repeat' // Избегаем повторения изображения
                }}

            >

                <h1 className='font-bold text-white text-[28px] py-5'>Всё начинается с домена</h1>

                <DomainInput
                    domain={domain}
                    setDomain={setDomain}
                    zone={zone}
                    setZone={setZone}
                    checkDomain={checkDomain}
                />

            </div>
        </>
    )
}

export default Hero;    
