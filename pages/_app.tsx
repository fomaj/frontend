import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from 'next/app'
import {store} from "@redux/store";
import { Provider } from 'react-redux'
import {getLibrary} from "@helpers/polyjuice";
import {ToastContainer} from "react-toastify";


function MyApp({ Component, pageProps }: AppProps) {
 return(
     <Provider store={store}>
     <Web3ReactProvider getLibrary={getLibrary}>
         <ToastContainer />
       <Component {...pageProps} />
     </Web3ReactProvider>
     </Provider>
 )
}
export default MyApp
