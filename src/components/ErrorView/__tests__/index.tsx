import React from "react";
import renderer from "react-test-renderer";
import Component from "..";
import Errors from "../../../commons/Errors";
import Sentry from "../../../commons/Sentry";

Sentry.error = jest.fn();

describe("ErrorView Component", () => {
  it("Registers error on Sentry", () => {
    renderer.create(<Component error={new Error(Errors.CORRUPT_CACHE)} />);
    expect(Sentry.error).toHaveBeenCalledWith(new Error(Errors.CORRUPT_CACHE));
  });

  it("Registers error on Sentry with context", () => {
    renderer.create(
      <Component
        error={new Error(Errors.CORRUPT_CACHE)}
        context={{ cacheVersion: 99 }}
      />
    );
    expect(Sentry.error).toHaveBeenCalledWith(new Error(Errors.CORRUPT_CACHE), {
      cacheVersion: 99
    });
  });
});
