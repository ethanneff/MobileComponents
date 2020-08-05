import React from "react";
import { Survey, SurveyItem, SurveyOption } from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { getSurveyOptions } from "../Option";

describe("Survey Container", () => {
  const items: SurveyItem[] = [
    {
      error: true,
      id: "9",
      maxValue: 100,
      maxValueText: "1",
      minValueText: "120121",
      onChange: jest.fn(),
      testID: "slider example test id",
      title: "slider with error and value",
      type: "Slider",
      value: "99",
      hasChanged: true
    },
    {
      error: false,
      id: "8",
      maxValue: 3,
      maxValueText: "1",
      minValueText: "3",
      onChange: jest.fn(),
      testID: "slider example test id",
      title: "slider example",
      type: "Slider",
      value: "",
      hasChanged: true
    },
    {
      error: true,
      id: "5",
      onChange: jest.fn(),
      options: SurveyOption.NoneToAll,
      testID: "radio with error test id",
      title: "radio with error",
      type: "Radio",
      value: "",
      hasChanged: true
    },
    {
      error: false,
      id: "4",
      onChange: jest.fn(),
      options: SurveyOption.YesNo,
      testID: "radio example test id",
      title: "radio with value",
      type: "Radio",
      value: "3",
      hasChanged: true
    },
    {
      error: false,
      hidden: true,
      id: "2",
      onChange: jest.fn(),
      options: SurveyOption.AllToNone,
      placeholder: "input placeholder",
      testID: "input example test id",
      title: "input example",
      type: "Textarea",
      subtitle: "subtitle example",
      value: "",
      hasChanged: true
    }
  ];

  it("shows correct survey options", () => {
    const { tree } = testRender(
      <Survey
        testID="blah"
        items={items}
        onSubmit={jest.fn()}
        onRef={jest.fn()}
        title="bob"
      />
    );

    expect(
      tree.root.findByProps({ testID: "radio example test id" }).instance.props
        .options
    ).toEqual(getSurveyOptions(SurveyOption.YesNo));
    expect(
      tree.root.findByProps({ testID: "radio with error test id" }).instance
        .props.options
    ).toEqual(getSurveyOptions(SurveyOption.NoneToAll));
  });

  it("does not show hidden", () => {
    const { tree } = testRender(
      <Survey
        testID="blah"
        items={[
          {
            error: false,
            hidden: true,
            id: "2",
            onChange: jest.fn(),
            options: SurveyOption.YesNo,
            placeholder: "input placeholder",
            testID: "input example test id",
            title: "input example",
            type: "Textarea",
            subtitle: "subtitle example",
            value: "",
            hasChanged: true
          }
        ]}
        onSubmit={jest.fn()}
        onRef={jest.fn()}
        title="bob"
      />
    );

    expect(
      tree.root.findAllByProps({ testID: "input example test id" }).length
    ).toEqual(0);
  });
});
