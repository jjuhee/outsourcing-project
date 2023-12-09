import { createGlobalStyle } from 'styled-components';

const GlobalColor = createGlobalStyle`
  :root {
    --header-color:#e79992;
    --header-button-color:#ff5f5f;
    --login-signup-background-color:#f9e8e6;
    --login-signup-input-background-color:	#add8e6;
    --login-signup-input-bottom:#c0827b;
    --login-signup-button:#e9b0ab;
    --login-signup-button-transition:#ed8957;
    --login-signup-button-border:#757f76;
    --signup-profileimg-text:#0044ff;
    --search-input-background-color:#d1e9ff;
    --search-button:#4dcaff;
  }
`;

export default GlobalColor;
