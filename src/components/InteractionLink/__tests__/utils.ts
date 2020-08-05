import DeviceInfo from "react-native-device-info";
import { hasInteraction, interactionLink } from "../utils";

describe("hasInteraction", () => {
  it("no simulators", () => {
    jest.spyOn(DeviceInfo, "isEmulatorSync").mockReturnValue(true);
    jest.spyOn(DeviceInfo, "getBrand").mockReturnValue("Google");
    expect(hasInteraction("phone")).toBe(false);
  });

  it("no amazon tablets", () => {
    jest.spyOn(DeviceInfo, "isEmulatorSync").mockReturnValue(false);
    jest.spyOn(DeviceInfo, "getBrand").mockReturnValue("Amazon");
    expect(hasInteraction("phone")).toBe(false);
  });

  it("no undefined type", () => {
    jest.spyOn(DeviceInfo, "isEmulatorSync").mockReturnValue(false);
    jest.spyOn(DeviceInfo, "getBrand").mockReturnValue("Google");
    expect(hasInteraction()).toBe(false);
  });

  it("yes phone type", () => {
    jest.spyOn(DeviceInfo, "isEmulatorSync").mockReturnValue(false);
    jest.spyOn(DeviceInfo, "getBrand").mockReturnValue("Google");
    expect(hasInteraction("phone")).toBe(true);
  });

  it("yes email type", () => {
    jest.spyOn(DeviceInfo, "isEmulatorSync").mockReturnValue(false);
    jest.spyOn(DeviceInfo, "getBrand").mockReturnValue("Google");
    expect(hasInteraction("email")).toBe(true);
  });
});

describe("interactionLink", () => {
  it("phone", () => {
    expect(interactionLink("hello", "phone")).toBe("tel:hello");
  });

  it("email", () => {
    expect(interactionLink("hello", "email")).toBe("mailto:hello");
  });

  it("text", () => {
    expect(interactionLink("hello", "text")).toBe("sms:hello");
  });

  it("undefined", () => {
    expect(interactionLink("hello")).toBe("hello");
  });
});
