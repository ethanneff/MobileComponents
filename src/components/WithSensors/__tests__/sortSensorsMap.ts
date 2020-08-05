import { sortSensorsMap } from "../utils/sortSensorsMap";

describe(sortSensorsMap, () => {
  it("returns a sorted map", () => {
    const map = sortSensorsMap({
      sensorB: {
        id: "sensorB",
        lastNotification: 0
      },
      sensorA: {
        id: "sensorA",
        lastNotification: 0
      }
    });

    expect(map[0].id).toBe("sensorA");
    expect(map[1].id).toBe("sensorB");
  });

  it("returns an empty map if passed an empty map", () => {
    expect(sortSensorsMap({})).toEqual([]);
    expect(() => sortSensorsMap({})).not.toThrow();
  });
});
