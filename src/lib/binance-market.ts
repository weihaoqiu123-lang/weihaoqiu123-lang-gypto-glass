const BINANCE_PRICE_ENDPOINT = "https://api.binance.com/api/v3/ticker/price";

type BinancePriceResponse = {
  symbol: string;
  price: string;
};

export async function getBinanceSpotPriceUsdt(symbol: string) {
  const normalizedSymbol = symbol.trim().toUpperCase();
  const response = await fetch(`${BINANCE_PRICE_ENDPOINT}?symbol=${normalizedSymbol}USDT`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch ${normalizedSymbol} price from Binance.`);
  }

  const data = (await response.json()) as BinancePriceResponse;
  const price = Number(data.price);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(`Received invalid ${normalizedSymbol} price from Binance.`);
  }

  return {
    symbol: normalizedSymbol,
    pair: data.symbol,
    price,
  };
}
