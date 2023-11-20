import axios from 'axios';

export default async function transformRatesToJSON() {
  let rates: any = []

  // https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data.json

  const { data } = await axios.get("https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data.json");

  rates = {
    "USD": 1,
    ...data.quotes
  }

  // Move common currencies to top.
  const commonCurrencies = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNH", "HKD", "NZD"];
  const commonCurrenciesSorted: any = {};
  commonCurrencies.forEach((currency: string) => {
    commonCurrenciesSorted[currency] = rates[currency];
  });

  rates = {
    ...commonCurrenciesSorted,
    ...rates
  }



  console.log(rates)
  return rates
}

export class CurrencyRateCache {
  private currencyRates: any = undefined

  async getCurrencyRates(): Promise<any> {
    if (!this.currencyRates) {
      this.currencyRates = await transformRatesToJSON();
    }
    return this.currencyRates;
  }
}

const currencyRateCache = new CurrencyRateCache();

export async function convertUSD(target: string) {
  const currencyRates = await currencyRateCache.getCurrencyRates();
  return currencyRates[target];
}

export async function getCurrencies(): Promise<string[]> {
  console.log("gets")
  const currencyRates = await currencyRateCache.getCurrencyRates();
  console.log(currencyRates);
  return Object.keys(currencyRates);
}