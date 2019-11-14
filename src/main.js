import React from "react";
import ReactDom from "react-dom";
import "./index.scss";
import App from "./test.jsx";

ReactDom.render(<App/>,document.querySelector("#root"));

// document.querySelector('#root').innerHTML = '哈哈哈，我是测试输出';