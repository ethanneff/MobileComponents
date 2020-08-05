import React from "react";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import Loading from "..";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";

describe("Loading Component", () => {
  let dom: ReactTestRenderer;

  it("renders correctly", () => {
    const { TestProvider } = getTestProvider();
    dom = renderer.create(
      <TestProvider>
        <Loading />
      </TestProvider>
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders a title provided", () => {
    const { TestProvider } = getTestProvider();
    dom = renderer.create(
      <TestProvider>
        <Loading title="Some title" />
      </TestProvider>
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders a subtitle provided", () => {
    const { TestProvider } = getTestProvider();
    dom = renderer.create(
      <TestProvider>
        <Loading subtitle="Some subtitle" />
      </TestProvider>
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders nothing when hidden", () => {
    dom = renderer.create(<Loading buttonTitle="Some button title" hidden />);
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders nothing when isLoaderHidden", () => {
    const { TestProvider } = getTestProvider();
    dom = renderer.create(
      <TestProvider>
        <Loading buttonTitle="Some button title" isLoaderHidden />
      </TestProvider>
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders a button if a button title is provided", () => {
    const { TestProvider } = getTestProvider();
    dom = renderer.create(
      <TestProvider>
        <Loading buttonTitle="Some button title" />
      </TestProvider>
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("executes the button callback when the button is pressed", () => {
    const { TestProvider } = getTestProvider();
    let pressed = false;
    dom = renderer.create(
      <TestProvider>
        <Loading
          buttonTitle="Some button title"
          onButtonPress={() => {
            pressed = true;
          }}
        />
      </TestProvider>
    );
    const button = dom.root.findByProps({ testID: "loadingButton" });
    button.props.onPress();

    expect(pressed).toBe(true);
  });

  describe("when set as indeterminate", () => {
    it("renders as expected", () => {
      const { TestProvider } = getTestProvider();
      dom = renderer.create(
        <TestProvider>
          <Loading indeterminate={true} />
        </TestProvider>
      );
      expect(dom.toJSON()).toMatchSnapshot();
    });

    describe("once set as completed", () => {
      it("renders the checkmark once", () => {
        const { TestProvider } = getTestProvider();

        let isCompleted = false;

        dom = renderer.create(
          <TestProvider>
            <Loading
              indeterminate={true}
              isCompleted={isCompleted}
              onComplete={() => undefined}
            />
          </TestProvider>
        );

        isCompleted = true;
        dom.update(
          <TestProvider>
            <Loading
              indeterminate={true}
              isCompleted={isCompleted}
              onComplete={() => undefined}
            />
          </TestProvider>
        );

        expect(
          dom.root.findByProps({ testID: "loaderCheckmark" })
        ).toBeTruthy();
      });

      describe("once it times out", () => {
        jest.useFakeTimers();

        it("calls the onComplete callback", () => {
          const { TestProvider } = getTestProvider();
          let callbackExecuted = false;

          dom = renderer.create(
            <TestProvider>
              <Loading
                indeterminate={true}
                isCompleted={true}
                onComplete={() => {
                  callbackExecuted = true;
                }}
              />
            </TestProvider>
          );

          dom.update(
            <TestProvider>
              <Loading
                indeterminate={true}
                isCompleted={true}
                onComplete={() => {
                  callbackExecuted = true;
                }}
              />
            </TestProvider>
          );

          jest.runAllTimers();

          expect(callbackExecuted).toBe(true);
        });
      });

      describe("when set back to non complete", () => {
        it("renders the progress bar again", () => {
          const { TestProvider } = getTestProvider();

          let isCompleted = false;

          dom = renderer.create(
            <TestProvider>
              <Loading
                indeterminate={true}
                isCompleted={isCompleted}
                onComplete={() => undefined}
              />
            </TestProvider>
          );

          expect(
            dom.root.findByProps({ testID: "loaderProgressBar" })
          ).toBeTruthy();

          isCompleted = true;
          dom.update(
            <TestProvider>
              <Loading
                indeterminate={true}
                isCompleted={isCompleted}
                onComplete={() => undefined}
              />
            </TestProvider>
          );

          expect(
            dom.root.findAllByProps({ testID: "loaderProgressBar" })
          ).toHaveLength(0);

          isCompleted = false;
          dom.update(
            <TestProvider>
              <Loading
                indeterminate={true}
                isCompleted={isCompleted}
                onComplete={() => undefined}
              />
            </TestProvider>
          );

          expect(
            dom.root.findByProps({ testID: "loaderProgressBar" })
          ).toBeTruthy();
        });
      });
    });
  });

  describe("when set as determinate", () => {
    it("renders as expected", () => {
      const { TestProvider } = getTestProvider();
      dom = renderer.create(
        <TestProvider>
          <Loading indeterminate={false} />
        </TestProvider>
      );
      expect(dom.toJSON()).toMatchSnapshot();
    });

    describe("once progress is > 1", () => {
      it("renders the checkmark once", () => {
        const { TestProvider } = getTestProvider();

        let percent = 0;

        dom = renderer.create(
          <TestProvider>
            <Loading
              indeterminate={false}
              percent={percent}
              onComplete={() => undefined}
            />
          </TestProvider>
        );

        percent = 1;
        dom.update(
          <TestProvider>
            <Loading
              indeterminate={true}
              percent={percent}
              onComplete={() => undefined}
            />
          </TestProvider>
        );

        expect(
          dom.root.findByProps({ testID: "loaderCheckmark" })
        ).toBeTruthy();
      });

      describe("once it times out", () => {
        jest.useFakeTimers();

        it("calls the onComplete callback", () => {
          const { TestProvider } = getTestProvider();
          let callbackExecuted = false;

          dom = renderer.create(
            <TestProvider>
              <Loading
                indeterminate={true}
                percent={1}
                onComplete={() => {
                  callbackExecuted = true;
                }}
              />
            </TestProvider>
          );

          dom.update(
            <TestProvider>
              <Loading
                indeterminate={true}
                percent={1}
                onComplete={() => {
                  callbackExecuted = true;
                }}
              />
            </TestProvider>
          );

          jest.runAllTimers();

          expect(callbackExecuted).toBe(true);
        });
      });
    });
  });

  describe("when the loader is set as hidden", () => {
    it("renders as expected", () => {
      const { TestProvider } = getTestProvider();
      dom = renderer.create(
        <TestProvider>
          <Loading isLoaderHidden={true} />
        </TestProvider>
      );
      expect(dom.toJSON()).toMatchSnapshot();
      expect(
        dom.root.findAllByProps({ testID: "loaderCheckmark" }).length
      ).toEqual(0);
    });
  });
});
