import axios from "axios";

const fetchData = async (feedID: string, timestamp: number) => {
  const headers = {
    Authorization: process.env.APRO_KEY as string,
    "X-Authorization-Timestamp": timestamp.toString(),
  };
  const response = await axios.get("http://live-api-test.apro.com/api/soon/reports", {
    params: { feedID, timestamp },
    headers,
  });
  return response.data;
};

export const GET = async () => {
  const BTC_feedID =
    "0x0003665949c883f9e0f6f002eac32e00bd59dfe6c34e92a91c37d6a8322d6489";

  const ETH_feedID =
    "0x0003555ace6b39aae1b894097d0a9fc17f504c62fea598fa206cc6f5088e6e45";
  const currentTimestamp = Math.floor(Date.now() / 1000);

  try {
    const [btcData, ethData] = await Promise.all([
      fetchData(BTC_feedID, currentTimestamp),
      fetchData(ETH_feedID, currentTimestamp),
    ]);
    
    const combinedData = {
      bitcoin: btcData,
      ethereum: ethData,
      timestamp: currentTimestamp,
    };

    return Response.json(combinedData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return Response.json(
      { error: `Failed to fetch data, ${error}` },
      { status: 500 }
    );
  }
};
