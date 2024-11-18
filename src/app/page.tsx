"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { useQuery } from "@tanstack/react-query";

interface AproReport {
  configDigest: string;
  epochAndRound: number;
  extraHash: string;
  feedID: string;
  validFromTimestamp: number;
  observationsTimestamp: number;
  nativeFee: string;
  tokenFee: string;
  expireAt: number;
  benchmarkPrice: string;
  askPrice: string;
  bidPrice: string;
  signatures: string[];
  recovery_ids: number[];
}

interface ApiResponse {
  bitcoin: {
    report: AproReport;
  };
  ethereum: {
    report: AproReport;
  };
  timestamp: number;
}

interface PriceCardProps {
  title: string;
  data: AproReport;
}

const formatPrice = (priceInWei: string): string => {
  const price = Number(priceInWei) / 1e18;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const fetchPrices = async (): Promise<ApiResponse> => {
  const response = await fetch("/api/oracle");
  if (!response.ok) throw new Error("Failed to fetch prices");
  return response.json();
};

const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
const PriceCard: React.FC<PriceCardProps> = ({ title, data }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">
              Current Price at {formatTime(data.observationsTimestamp)}
            </div>
            <div className="text-2xl font-bold">
              {formatPrice(data.benchmarkPrice)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AproPrices() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["AproPrices"],
    queryFn: fetchPrices,
    refetchInterval: 2000,
    staleTime: 2000,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-center">
          <p>Failed to fetch prices</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Apro Oracle Prices on SOON devnet
        </h1>

        {isLoading ? (
          <div className="text-center">Loading prices...</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <PriceCard title="Bitcoin (BTC)" data={data!.bitcoin.report} />
            <PriceCard title="Ethereum (ETH)" data={data!.ethereum.report} />
          </div>
        )}

        <div className="text-sm text-gray-500 mt-6 text-center">
          Auto-updating every 2 seconds
        </div>
      </div>
    </div>
  );
}
