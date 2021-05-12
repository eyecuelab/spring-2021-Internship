import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
body { 
  margin: auto;
  overflow-x: hidden;
  
  
}
@media only screen and (max-width: 1120px) {
  body {
    overflow-x: auto;
  }
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
`;

export default GlobalStyles;
