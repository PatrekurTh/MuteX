// components/ActivityRenderer.js

import MiningComponent from './MiningComponent';
// ... import other activity components
import AlchemyComponent from './AlchemyComponent';
import HarvestingComponent from './HarvestingComponent';
import FishingComponent from './FishingComponent';

export function ActivityRenderer({ activity }: { activity: string }) {
  switch (activity) {
    case 'Mining':
      return <MiningComponent />;
      break;
    case 'Fishing':
      return <FishingComponent />;
      break;
    case 'Harvesting':
      return <HarvestingComponent />;
      break;
    case 'Alchemy':
      return <AlchemyComponent />;
      break;
    default:
      return <div>Select an activity to begin!</div>;
  }
}
