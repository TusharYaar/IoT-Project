import DistanceWeight from "./Modules/DistanceWeight";

const ShowModules = ({ channel, feeds }) => {
  if (channel) return <DistanceWeight channel={channel} feeds={feeds} />;
};

export default ShowModules;
