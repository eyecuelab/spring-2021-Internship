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

.react-datepicker__input-container > input{
  width: 584px;
  height: 54px;
  font-family: 'Montserrat';
  font-size: 16px;
  padding: 18px;
  margin-bottom: 24px;
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
