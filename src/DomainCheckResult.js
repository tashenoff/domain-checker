import React from 'react';

const DomainCheckResult = ({ result, whoisInfo }) => {
    if (!result) return null; // Если результата нет, ничего не показываем

    const domain = result.answer.domains[0]; // Получаем первый (и единственный) домен

    return (
        <div className='overflow-y-auto'>
           
            <div>


                {/* Объединяем информацию о статусе и количестве дней в одном блоке */}
                <div className='flex flex-col text-center w-full items-center justify-center border-b border-gray-400  p-5 rounded-t-lg bg-white'>
                    {/* Строка с доменом и его статусом (занят или свободен) */}
                    <div className='flex items-center'>
                        <h1 className='uppercase font-bold text-[24px]'>
                            Домен: {domain.dname}
                        </h1>
                        {domain.result === 'Available' ? (
                            <span className='uppercase text-[24px] text-green-500 ml-2'> - доступен для регистрации.</span>
                        ) : (
                            <span className='uppercase text-[24px] text-red-500 ml-2'> - занят!</span>
                        )}
                    </div>

                    {/* Кнопка "Купить" для свободного домена */}
                    {domain.result === 'Available' && (
                        <a className='flex items-center justify-center underline bg-red-500 text-white px-5 py-2 rounded-lg mt-4' href=''>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            Зарегистрировать домен
                        </a>
                    )}

                    {/* Блок с количеством дней до окончания регистрации, если домен занят */}
                    {domain.result !== 'Available' && whoisInfo && whoisInfo.answer && whoisInfo.answer.expire && (
                        <p className='mt-4'>
                            {(() => {
                                const currentDate = new Date(); // Текущая дата
                                const expireDate = new Date(whoisInfo.answer.expire.utc); // Дата окончания регистрации
                                const differenceInTime = expireDate - currentDate; // Разница в миллисекундах
                                const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Преобразуем миллисекунды в дни

                                return differenceInDays > 0
                                    ? `Истекает через ${differenceInDays} дней`
                                    : 'Регистрация истекла';
                            })()}
                        </p>
                    )}
                </div>

                {whoisInfo && (
                    <div >
                        <div className='my-10 px-5 py-5 rounded-lg bg-white'>
                            <h4 className='uppercase font-bold my-2 text-gray-600'>Информация о домене:</h4>
                            <p className='flex items-center justify-between w-full py-2 border-b border-dashed border-gray-400'><strong>Регистратор:</strong> {whoisInfo.answer.registrar}</p>

                            <p className='flex items-center justify-between w-full py-2 border-b border-dashed border-gray-400'>
                                <strong>Дата создания:</strong> {new Date(whoisInfo.answer.create.utc).toLocaleString()}
                            </p>

                            <p className='flex items-center justify-between w-full py-2'>
                                <strong>Дата окончания:</strong> {new Date(whoisInfo.answer.expire.utc).toLocaleString()}
                            </p>
                        </div>

                        <div className='px-5 py-5 rounded-lg bg-white'>
                            <h5 className='uppercase font-bold my-2 text-gray-600'>Контактная информация регистранта:</h5>
                            <p className='flex items-center justify-between w-full py-2 border-b border-dashed border-gray-400'><strong>Имя:</strong> {whoisInfo.answer.registrant_contact.name}</p>
                            <p className='flex items-center justify-between w-full py-2 border-b border-dashed border-gray-400'><strong>Организация:</strong> {whoisInfo.answer.registrant_contact.org}</p>
                            <p className='flex items-center justify-between w-full py-2 border-b border-dashed border-gray-400'><strong>Адрес:</strong> {whoisInfo.answer.registrant_contact.street}, {whoisInfo.answer.registrant_contact.city}, {whoisInfo.answer.registrant_contact.sp}, {whoisInfo.answer.registrant_contact.pc}, {whoisInfo.answer.registrant_contact.cc}</p>
                            <p className='flex items-center justify-between w-full py-2 border-b border-dashed border-gray-400'><strong>Телефон:</strong> {whoisInfo.answer.registrant_contact.voice}</p>
                            <p className='flex items-center justify-between w-full py-2'><strong>Email:</strong> {whoisInfo.answer.registrant_contact.email}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DomainCheckResult;
