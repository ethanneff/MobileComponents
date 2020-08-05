import { strings } from "../../commons/Locales";

export enum NotificationErrorType {
  Submission = "SUBMISSION_NOTIFICATION",
  UpdatePost = "UPDATE_NOTIFICATION",
  JoinGroup = "JOIN_GROUP_NOTIFICATION",
  LeaveGroup = "LEAVE_GROUP_NOTIFICATION",
  Network = "NETWORK_NOTIFICATION",
  Server = "SERVER_NOTIFICATION",
  Login = "LOGIN_NOTIFICATION",
  None = "NONE"
}

type NotificationErrors = {
  [key in NotificationErrorType]: {
    errorMessage: string;
    iconName: string;
  };
};

export const notificationErrorConfig: NotificationErrors = {
  [NotificationErrorType.UpdatePost]: {
    errorMessage: strings("notification.updatePostError"),
    iconName: "alert-circle"
  },
  [NotificationErrorType.JoinGroup]: {
    errorMessage: strings("notification.joinGroupError"),
    iconName: "alert-circle"
  },
  [NotificationErrorType.LeaveGroup]: {
    errorMessage: strings("notification.leaveGroupError"),
    iconName: "alert-circle"
  },
  [NotificationErrorType.Submission]: {
    errorMessage: strings("notification.submissionError"),
    iconName: "alert-circle"
  },
  [NotificationErrorType.Network]: {
    errorMessage: strings("notification.networkError"),
    iconName: "wifi-strength-off"
  },
  [NotificationErrorType.Server]: {
    errorMessage: strings("notification.serverError"),
    iconName: "alert-circle"
  },
  [NotificationErrorType.Login]: {
    errorMessage: strings("notification.loginNetworkConnectionError"),
    iconName: "alert-circle"
  },
  [NotificationErrorType.None]: {
    errorMessage: "",
    iconName: ""
  }
};
