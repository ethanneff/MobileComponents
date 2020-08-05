import { ImageSourcePropType } from "react-native";
import { strings } from "../../commons/Locales";
import { NotificationErrorType } from "../Notification/config";

export enum TabType {
  Groups = "Groups",
  Progress = "Progress",
  Account = "Account",
  None = "None"
}

type TabData = {
  [key in TabType]: {
    tabName: string;
    tabIcon: string;
  };
};

export const tabsConfig: TabData = {
  [TabType.Groups]: {
    tabName: strings("errorScreen.groups"),
    tabIcon: "account-multiple"
  },
  [TabType.Progress]: {
    tabName: strings("errorScreen.progress"),
    tabIcon: "chart-line-variant"
  },
  [TabType.Account]: {
    tabName: strings("errorScreen.account"),
    tabIcon: "account-circle"
  },
  [TabType.None]: {
    tabName: "",
    tabIcon: ""
  }
};

export enum ErrorScreenType {
  Network = "NETWORK_SCREEN",
  Server = "SERVER_SCREEN",
  None = "NONE"
}

type ErrorScreens = {
  [key in ErrorScreenType]: {
    errorMessage: string;
    errorSubMessage: string;
    notificationError: NotificationErrorType;
    image: ImageSourcePropType;
  };
};

export const errorScreenConfig: ErrorScreens = {
  [ErrorScreenType.None]: {
    errorMessage: strings("errorScreen.networkErrorScreen.errorMessage"),
    errorSubMessage: strings("errorScreen.networkErrorScreen.errorSubMessage"),
    notificationError: NotificationErrorType.None,
    image: require("../../commons/Assets/ErrorScreen/Connection_error_crab.png")
  },
  [ErrorScreenType.Network]: {
    errorMessage: strings("errorScreen.networkErrorScreen.errorMessage"),
    errorSubMessage: strings("errorScreen.networkErrorScreen.errorSubMessage"),
    notificationError: NotificationErrorType.Network,
    image: require("../../commons/Assets/ErrorScreen/Connection_error_crab.png")
  },
  [ErrorScreenType.Server]: {
    errorMessage: strings("errorScreen.serverErrorScreen.errorMessage"),
    errorSubMessage: strings("errorScreen.serverErrorScreen.errorSubMessage"),
    notificationError: NotificationErrorType.Server,
    image: require("../../commons/Assets/ErrorScreen/Server_error_crab.png")
  }
};
