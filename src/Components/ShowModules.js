import DistanceWeight from "./Modules/DistanceWeight";

const ShowModules = ({ channel, feeds }) => {
  if (channel.modules && channel.modules.indexOf("distance_weight") > -1)
    return <DistanceWeight channel={channel} feeds={feeds} />;

  return null;
};

export default ShowModules;
