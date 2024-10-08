enum Tier {
  Animal = "Animal",
  Dinosaur = "Dinosaur",
  Alien = "Alien",
  Hero = "Hero",
}

interface TierResult {
  tierName: Tier;
  tierNumber: number;
  rangeNumber: number;
  nextTierPoints: number;
}

export function calculateTierAndRange(score: number): TierResult {
  const tierThresholds = [0, 75, 200, 400];
  const maxScore = 600;

  score = Math.min(score, maxScore);

  let tierName: Tier;
  let tierNumber: number;
  let rangeStart: number;

  if (score < tierThresholds[1]) {
    tierName = Tier.Animal;
    tierNumber = 1;
    rangeStart = tierThresholds[0];
  } else if (score < tierThresholds[2]) {
    tierName = Tier.Dinosaur;
    tierNumber = 2;
    rangeStart = tierThresholds[1];
  } else if (score < tierThresholds[3]) {
    tierName = Tier.Alien;
    tierNumber = 3;
    rangeStart = tierThresholds[2];
  } else {
    tierName = Tier.Hero;
    tierNumber = 4;
    rangeStart = tierThresholds[3];
  }

  const nextTierThreshold =
    tierName === Tier.Hero
      ? maxScore
      : tierThresholds[Object.values(Tier).indexOf(tierName) + 1];
  const tierRange = nextTierThreshold - rangeStart;
  const rangeNumber = Math.floor(((score - rangeStart) / tierRange) * 10) + 1;
  const nextTierPoints = nextTierThreshold - score;

  return { tierName, tierNumber, rangeNumber, nextTierPoints };
}
