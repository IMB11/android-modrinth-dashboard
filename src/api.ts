import axios from "@/axios";
import { convertUSD, getCurrencies } from "@/currency";

export interface StatisticData {
  lastUpdated: Date | string;
  financial_data: {
    converted: {
      last_month: number;
      all_time: number;
      balance: number;
    };
    raw: {
      last_month: number;
      all_time: number;
      balance: number;
    };
    currencyRate: number;
    targetCurrency: string;
  };
  project_data: {
    total_followers: number;
    total_downloads: number;
    number_of_projects: number;
  };
}

/**
 * Get all statistical information from the Modrinth API.
 * @param store The pinia store.
 */
export async function getStatisticalData(store: any): Promise<StatisticData> {
  //#region Project Statistics
  const { data } = await axios.get(`/user/${store.user.id}/projects`);

  const total_followers = (data as unknown as any[]).reduce((acc, project) => {
    return acc + project.followers;
  }, 0);

  const total_downloads = (data as unknown as any[]).reduce((acc, project) => {
    return acc + project.downloads;
  }, 0);

  const number_of_projects = (data as unknown as any[]).length;
  //#endregion
  //#region Financial Statistics
  const { data: financial_data } = await axios.get(
    `/user/${store.user.id}/payouts`
  );

  // Convert financial data to currencies.
  const currencies = await getCurrencies();
  const target = currencies[store.currency];
  const rate = await convertUSD(target);

  const financial_data_converted = {
    last_month: financial_data.last_month * rate,
    all_time: financial_data.all_time * rate,
    balance: store.user.payout_data.balance * rate,
  };
  //#endregion

  const statistics: StatisticData = {
    lastUpdated: new Date(),
    financial_data: {
      converted: financial_data_converted,
      raw: {
        last_month: financial_data.last_month,
        all_time: financial_data.all_time,
        balance: store.user.payout_data.balance,
      },
      currencyRate: rate,
      targetCurrency: target,
    },
    project_data: {
      total_followers,
      total_downloads,
      number_of_projects,
    },
  };

  return statistics;
}