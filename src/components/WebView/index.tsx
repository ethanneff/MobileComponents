import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  WebView as Original,
  WebViewProps as OriginalProps
} from "react-native-webview";
import { strings } from "../../commons/Locales";
import { getOffline } from "../../commons/Store/Device";
import { useRootSelector } from "../../commons/Store/selectors";
import Loading from "../../components/Loading";

export type WebViewState = "Loading" | "Failure" | "Success" | "Reload";

type Props = WebViewProps & OriginalProps;
interface WebViewProps {
  renderImmediately?: boolean;
  retryCountdown?: number;
  label?: string;
  onLoaded?: () => void;
}

const defaultRetryCountdown = 10000;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  invisible: {
    opacity: 0
  },
  loading: {
    flex: 10
  }
});

const WebView: React.FC<Props> = ({
  renderImmediately = true,
  retryCountdown = defaultRetryCountdown,
  style,
  label,
  onLoaded,
  ...restProps
}: Props) => {
  const isOffline = useRootSelector(getOffline);
  const [webViewState, setWebViewState] = useState(
    renderImmediately ? "Success" : "Loading"
  );

  const handleLoad = useCallback(() => {
    setWebViewState("Success");
    if (onLoaded) {
      onLoaded();
    }
  }, [onLoaded]);
  const handleReload = useCallback(() => {
    setWebViewState("Reload");
  }, []);

  const webView = useRef<Original | null>(null);
  const loading = webViewState === "Loading";
  const reload = webViewState === "Reload";
  const failure = webViewState === "Failure";
  const buttonTitle = failure ? strings("webview.retryButton") : undefined;
  const loadingTitle = failure ? strings("webview.retryMessage") : undefined;
  const overrideProps = reload ? { source: { uri: "about:blank" } } : {};
  const loadingStyles = [
    styles.loading,
    { display: loading ? "flex" : "none" }
  ];

  useEffect(() => {
    let failTimer: number | undefined;
    let unmounted = false;

    const handleLoadingFailure = () => {
      clearTimeout(failTimer);
      if (webView.current) {
        webView.current.stopLoading();
      }
      setWebViewState("Failure");
    };

    switch (webViewState) {
      case "Loading":
        failTimer = setTimeout(handleLoadingFailure, retryCountdown);

        if (!isOffline && !unmounted) {
          handleLoadingFailure();
        }
        break;
      case "Reload":
        failTimer = setTimeout(() => setWebViewState("Loading"), 0);
        break;
    }

    return () => {
      unmounted = true;
      clearTimeout(failTimer);
    };
  }, [webViewState, isOffline, retryCountdown]);

  return (
    <View style={styles.container} testID="webViewContainer">
      <Loading
        testID="webViewLoading"
        hidden={!(loading || failure)}
        label={label}
        noLoading={label !== undefined}
        indeterminate
        style={loadingStyles}
        title={loadingTitle}
        buttonTitle={buttonTitle}
        onButtonPress={handleReload}
      />
      <Original
        testID="webView"
        ref={webView}
        onLoad={handleLoad}
        style={style}
        {...restProps}
        {...overrideProps}
      />
    </View>
  );
};

export default WebView;
