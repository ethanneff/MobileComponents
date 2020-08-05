import { NotificationErrorType } from "./config";

export const getNotificationError = (postErrorType: string | undefined) => {
  if (!postErrorType) {
    return NotificationErrorType.None;
  }
  return postErrorType;
};
