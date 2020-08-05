import DeviceInfo from "react-native-device-info";

export type InteractionLinkCommunicationType = "email" | "phone" | "text";

export type InteractionLinkContent =
  | {
      message: string;
      type?: InteractionLinkCommunicationType;
    }
  | {
      message: string;
      type?: "navigate";
      route: string;
    };

export type InteractionLinkContentType = InteractionLinkContent["type"];

export const hasInteraction = (type?: InteractionLinkContentType) =>
  type === "navigate" ||
  ((type === "email" || type === "phone") &&
    !DeviceInfo.isEmulatorSync() &&
    DeviceInfo.getBrand() !== "Amazon");

export const interactionLink = (
  message: string,
  type?: InteractionLinkContentType
) =>
  type === "phone"
    ? `tel:${message}`
    : type === "email"
    ? `mailto:${message}`
    : type === "text"
    ? `sms:${message}`
    : message;
