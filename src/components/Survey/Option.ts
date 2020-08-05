import { strings } from "../../commons/Locales/index";

export interface Option {
  name: string;
  value: string;
}

export enum SurveyOption {
  ZeroToTen,
  ZeroToFive,
  OneToTen,
  NoneToExtreme,
  NotToEvery,
  NeverToAlways,
  YesNo,
  AllToNone,
  AllToNoneMinusBit,
  ExcellentToPoor,
  LotToAll,
  NoneToAll,
  NotToExtreme,
  BetterToWorse
}

export const getSurveyOptions = (
  option: SurveyOption | undefined
): Option[] => {
  const key = "survey.options.";
  switch (option) {
    case SurveyOption.ZeroToTen:
      return [
        { name: "0", value: "0" },
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" }
      ];
    case SurveyOption.ZeroToFive:
      return [
        { name: "0", value: "0" },
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" }
      ];
    case SurveyOption.OneToTen:
      return [
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" }
      ];
    case SurveyOption.NoneToExtreme:
      return [
        { name: strings(`${key}none`), value: "1" },
        { name: strings(`${key}mild`), value: "2" },
        { name: strings(`${key}moderate`), value: "3" },
        { name: strings(`${key}severe`), value: "4" },
        { name: strings(`${key}extreme`), value: "5" }
      ];
    case SurveyOption.NotToExtreme:
      return [
        { name: strings(`${key}notAll`), value: "1" },
        { name: strings(`${key}littleBit`), value: "2" },
        { name: strings(`${key}moderately`), value: "3" },
        { name: strings(`${key}quiteBit`), value: "4" },
        { name: strings(`${key}extremely`), value: "5" }
      ];
    case SurveyOption.AllToNone:
      return [
        { name: strings(`${key}allOfTime`), value: "1" },
        { name: strings(`${key}mostOfTime`), value: "2" },
        { name: strings(`${key}bitOfTime`), value: "3" },
        { name: strings(`${key}someOfTime`), value: "4" },
        { name: strings(`${key}littleOfTime`), value: "5" },
        { name: strings(`${key}noneOfTime`), value: "6" }
      ];
    case SurveyOption.AllToNoneMinusBit:
      return [
        { name: strings(`${key}allOfTime`), value: "1" },
        { name: strings(`${key}mostOfTime`), value: "2" },
        { name: strings(`${key}someOfTime`), value: "3" },
        { name: strings(`${key}littleOfTime`), value: "4" },
        { name: strings(`${key}noneOfTime`), value: "5" }
      ];
    case SurveyOption.AllToNone:
      return [
        { name: strings(`${key}allOfTime`), value: "1" },
        { name: strings(`${key}mostOfTime`), value: "2" },
        { name: strings(`${key}someOfTime`), value: "3" },
        { name: strings(`${key}littleOfTime`), value: "4" },
        { name: strings(`${key}noneOfTime`), value: "5" }
      ];
    case SurveyOption.NoneToAll:
      return [
        { name: strings(`${key}noneTime`), value: "1" },
        { name: strings(`${key}littleTime`), value: "2" },
        { name: strings(`${key}someTime`), value: "3" },
        { name: strings(`${key}mostTime`), value: "4" },
        { name: strings(`${key}allTime`), value: "5" }
      ];
    case SurveyOption.LotToAll:
      return [
        { name: strings(`${key}limitedLot`), value: "1" },
        { name: strings(`${key}limitedLittle`), value: "2" },
        { name: strings(`${key}limitedAll`), value: "3" }
      ];
    case SurveyOption.NotToEvery:
      return [
        { name: strings(`${key}not`), value: "1" },
        { name: strings(`${key}several`), value: "2" },
        { name: strings(`${key}half`), value: "3" },
        { name: strings(`${key}every`), value: "4" }
      ];
    case SurveyOption.NeverToAlways:
      return [
        { name: strings(`${key}never`), value: "1" },
        { name: strings(`${key}monthly`), value: "2" },
        { name: strings(`${key}weekly`), value: "3" },
        { name: strings(`${key}daily`), value: "4" },
        { name: strings(`${key}always`), value: "5" }
      ];
    case SurveyOption.ExcellentToPoor:
      return [
        { name: strings(`${key}excellent`), value: "1" },
        { name: strings(`${key}veryGood`), value: "2" },
        { name: strings(`${key}good`), value: "3" },
        { name: strings(`${key}fair`), value: "4" },
        { name: strings(`${key}poor`), value: "5" }
      ];
    case SurveyOption.BetterToWorse:
      return [
        { name: strings(`${key}muchBetter`), value: "1" },
        { name: strings(`${key}slightlyBetter`), value: "2" },
        { name: strings(`${key}same`), value: "3" },
        { name: strings(`${key}slightlyWorse`), value: "4" },
        { name: strings(`${key}muchWorse`), value: "5" }
      ];
    case SurveyOption.YesNo:
      return [
        { name: strings(`${key}yes`), value: "1" },
        { name: strings(`${key}no`), value: "2" }
      ];
    default:
      return [];
  }
};
