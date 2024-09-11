import React from 'react';

const DomainInput = ({ domain, setDomain, zone, setZone, checkDomain }) => {
    return (
        <div className='container mx-auto'>
            <div className='border w-full bg-white border-gray-400 rounded-lg flex justify-between items-center px-2 py-2'>
                <input
                    className='focus:outline-none w-full'
                    type="text"
                    placeholder="Введите домен"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)} // Обновляем значение домена
                />

                <div className='flex items-center'>
                    {/* Выпадающий список для выбора доменной зоны */}
                    <select value={zone} onChange={(e) => setZone(e.target.value)}>
                        <option value=".kz">.kz</option>
                        <option value=".ru">.ru</option>
                        <option value=".org">.org</option>
                        <option value=".info">.info</option>
                    </select>

                    <button className='bg-red-500 px-5 py-2 rounded-lg text-white font-bold' onClick={checkDomain}>Проверить</button>
                </div>
            </div>
        </div>
    );
};

export default DomainInput;
