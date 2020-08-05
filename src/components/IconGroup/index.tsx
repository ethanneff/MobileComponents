import React from "react";
import { ImageStyle, StyleSheet, TextStyle, View } from "react-native";
import { SvgProps } from "react-native-svg";
import Theme from "../../commons/Theme";
import Text from "../Text";

interface IconGroupItem {
  label: string;
  icon: React.FC<SvgProps>;
}

interface Props {
  items: IconGroupItem[];
  iconStyles?: ImageStyle;
  textStyles?: TextStyle;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center"
  },
  itemContainer: {
    flexDirection: "row",
    height: "auto"
  },
  icon: {
    marginTop: Theme.padding.p1,
    marginRight: Theme.padding.p2
  }
});

const iconHeight = 16;

export default function IconGroup(props: Props) {
  return (
    <View style={styles.container}>
      {props.items.map(({ label, icon: Icon }: IconGroupItem) => {
        return (
          <View style={styles.itemContainer} key={label}>
            <Icon style={styles.icon} height={iconHeight} />
            <Text caption title={label} style={[props.textStyles]} />
          </View>
        );
      })}
    </View>
  );
}
