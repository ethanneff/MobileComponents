import { NotificationErrorType } from "../config";
import { getNotificationError } from "../notificationUtils";

describe("getNotificationError function", () => {
  it("returns expected NotificationError type correctly", () => {
    const postErrorType = "LOGIN_NOTIFICATION";
    expect(getNotificationError(postErrorType)).toBe("LOGIN_NOTIFICATION");
  });

  it("returns NotificationError.None type when input is falsy", () => {
    const postErrorType = "";
    expect(getNotificationError(postErrorType)).toBe(
      NotificationErrorType.None
    );

    const postErrorTypeTwo = undefined;
    expect(getNotificationError(postErrorTypeTwo)).toBe(
      NotificationErrorType.None
    );
  });
});
