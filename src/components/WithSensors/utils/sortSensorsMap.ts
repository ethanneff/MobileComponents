import { SensorMap } from "../../../commons/Store/Sensor";

export function sortSensorsMap(map: SensorMap) {
  return Object.values(map || {}).sort((left, right) => {
    if (!left || !right || !left.id || !right.id) {
      return 0;
    }
    if (left.id < right.id) {
      return -1;
    }
    if (left.id > right.id) {
      return 1;
    }
    return 0;
  });
}
