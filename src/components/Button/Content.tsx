import React from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import Icon from "../../components/Icon";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center"
  },
  left: {
    justifyContent: "flex-start"
  },
  right: {
    justifyContent: "flex-end"
  }
});

interface Props {
  clear?: boolean;
  uppercase: boolean;
  bold: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  title?: string;
  styleIcon?: ViewStyle | {};
  styleContent?: TextStyle | {};
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  link?: boolean;
  hidden?: boolean;
  caption?: boolean;
}

class Content extends React.PureComponent<Props> {
  render() {
    const {
      title,
      clear,
      uppercase,
      bold,
      alignLeft,
      alignRight,
      styleIcon,
      styleContent,
      icon,
      iconSize,
      iconColor,
      hidden,
      link,
      caption
    } = this.props;
    if (hidden) {
      return null;
    }
    const containerStyles = [
      styles.container,
      alignLeft ? styles.left : undefined,
      alignRight ? styles.right : undefined
    ];
    return (
      <View style={containerStyles}>
        <Icon
          style={styleIcon}
          name={icon}
          clear={clear}
          size={iconSize}
          color={iconColor}
        />
        <Text
          caption={caption}
          title={title}
          uppercase={uppercase}
          link={link}
          button={!link}
          center
          bold={bold}
          notBold={!bold}
          style={styleContent}
          clear={clear}
        />
      </View>
    );
  }
}

export default Content;
