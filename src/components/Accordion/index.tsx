import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import AccordionComponent from "react-native-collapsible/Accordion";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import Text from "../Text";

export interface AccordionItemType {
  title: string;
  content: string;
}

interface Props {
  title: string;
  items: AccordionItemType[];
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Theme.padding.p8
  },
  itemTitle: {
    marginTop: Theme.padding.p6,
    flexDirection: "row"
  },
  flex: {
    flex: 1
  },
  titleIcon: {
    padding: Theme.padding.p1,
    flexDirection: "row-reverse",
    width: Theme.padding.p8
  },
  contentContainer: {
    marginTop: Theme.padding.p5
  },
  spacer: {
    height: 2,
    marginTop: Theme.padding.p4,
    backgroundColor: Theme.color.neutral50
  },
  itemContent: {
    marginBottom: Theme.padding.p1
  }
});

export default function Accordion(props: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const renderHeader = useCallback((section, _, isActive) => {
    return (
      <>
        <View style={styles.itemTitle}>
          <View style={styles.flex}>
            <Text h5 title={section.title} />
          </View>
          <Icon
            name={isActive ? "chevron-up" : "chevron-down"}
            size={24}
            style={styles.titleIcon}
          />
        </View>
        {!isActive && <View style={styles.spacer} />}
      </>
    );
  }, []);

  const renderContent = useCallback(({ content }) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.itemContent} title={content} />
        <View style={styles.spacer} />
      </View>
    );
  }, []);

  const onChange = useCallback(
    sections => {
      setActiveSections(sections);
    },
    [setActiveSections]
  );

  return (
    <View style={styles.container}>
      <Text h3 title={props.title} />
      <AccordionComponent
        sections={props.items}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={onChange}
        underlayColor={Theme.color.transparent}
        expandMultiple={true}
        touchableProps={{ testID: "accordionTouchable" }}
      />
    </View>
  );
}
