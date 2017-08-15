import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html, body
  {
    height: 100%;
    width: 100%;
  }

  body
  {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded
  {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app
  {
    min-height: 100%;
    min-width: 100%;
  }

  p
  {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  #top-bar
  {
    margin: auto;
    max-width: 820px;
    text-align: left;
    min-height: 10px;
    overflow: auto;
  }

  #top-bar.quote
  {
    background: #03a9f4;
  }

  #top-bar.invoice
  {
    background: rgba(122, 185, 0, 0.7);
  }

  #top-bar input
  {
    display: none;
  }

  #top-bar button, #top-bar label
  {
    margin: 5px;
    background: rgb(66, 184, 221);
    color: white;
    cursor:pointer;
    display: none;
    padding: 2px 6px 3px 6px;
  }

  #top-bar label
  {
    float: left;
  }

  #top-bar button
  {
    float: right;
  }

  #top-bar:hover button, #top-bar:hover label
  {
    display: block;
  }

`;
