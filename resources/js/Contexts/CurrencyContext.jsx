import React, { createContext, useContext, useEffect, useState } from 'react';

export const CURRENCIES = {
    EUR: { code: 'EUR', symbol: '€', rate: 1.00, flag: '🇪🇺', name: 'Euro' },
    USD: { code: 'USD', symbol: '$', rate: 1.10, flag: '🇺🇸', name: 'US Dollar' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.85, flag: '🇬🇧', name: 'British Pound' },
};

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    const [currency, setCurrencyState] = useState('EUR');

    useEffect(() => {
        const savedCurrency = localStorage.getItem('fitninja_currency');
        if (savedCurrency && CURRENCIES[savedCurrency]) {
            setCurrencyState(savedCurrency);
        }
    }, []);

    const setCurrency = (code) => {
        if (CURRENCIES[code]) {
            setCurrencyState(code);
            localStorage.setItem('fitninja_currency', code);
        }
    };

    const currentCurrency = CURRENCIES[currency] || CURRENCIES.EUR;

    const formatPrice = (amountInEur, decimalPlaces = 2) => {
        const converted = amountInEur * currentCurrency.rate;
        return `${currentCurrency.symbol}${converted.toFixed(decimalPlaces)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency: currentCurrency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        return {
            currency: CURRENCIES.EUR,
            setCurrency: () => {},
            formatPrice: (amount) => `€${Number(amount).toFixed(2)}`,
        };
    }
    return context;
}
