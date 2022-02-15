import React from "react";
import ReactDOM from "react-dom";
import Providers from "./Providers";
import Router from "./Router";
import moment from "moment"
import numeral from "numeral"
import "moment/dist/locale/zh-cn";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

moment.locale("zh-cn")

numeral.register('locale', 'zh', {
  delimiters: {
      thousands: ',',
      decimal: '.'
  },
  abbreviations: {
      thousand: '千',
      million: '百万',
      billion: '十亿',
      trillion: '万亿'
  }
});

numeral.locale('zh');

ReactDOM.render(
  <Providers>
    <Router />
  </Providers>,
  document.getElementById("root")
);
