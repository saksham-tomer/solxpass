import nftData from "../components/Data/Tier.json";

interface NFTItem {
  id: number;
  name: string;
  tier: number;
  range: number;
  category: string;
  image_url: string;
  uri: string;
}

function getNFTByTierAndRange(
  tier: number,
  range: number
): NFTItem | undefined {
  return (nftData as NFTItem[]).find(
    (item) => item.tier === tier && item.range === range
  );
}

export { getNFTByTierAndRange };
