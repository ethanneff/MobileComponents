import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { useRootSelector } from "../../commons/Store/selectors";
import { getShouldRenderUpdateAvailableLink } from "../../commons/Store/ControlledUpdate";
import { Event, track } from "../../commons/Analytics";
import Theme from "../../commons/Theme";
import Text from "../Text";
import Button from "../Button";
import { strings } from "../../commons/Locales";
import { ListItem } from "./index";

interface Props {
  item: ListItem;
  style: ViewStyle | {};
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center"
  },
  title: { marginRight: Theme.padding.p2 },
  subtitle: { paddingTop: Theme.padding.p1 }
});

export default function AppVersionItem({ item, style }: Props) {
  const navigation = useNavigation();
  const renderLink = useRootSelector(getShouldRenderUpdateAvailableLink);

  const navToUpdateDetails = () => {
    track(Event.ControlledUpdateDetailsViewedFromAccount);
    navigation.navigate("UpdateDetails");
  };

  return (
    <View style={style} testID={item.id}>
      <View style={styles.content}>
        <Text
          h4
          title={item.title}
          testID="listItemTitle"
          style={styles.title}
        />
        <Text
          caption
          title={item.subtitle}
          testID="versionItemSubtitle"
          style={styles.subtitle}
        />
      </View>
      {renderLink && (
        <Button
          link
          notBold
          notUppercase
          onPress={navToUpdateDetails}
          title={item.description}
          hidden={!item.description}
          accessibilityLabel={strings("appUpdates.accessibility.linkLabel")}
          testID="versionItemDescription"
        />
      )}
    </View>
  );
}
