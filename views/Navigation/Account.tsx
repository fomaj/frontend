import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useRef, useState } from "react";
import { injected } from "@helpers/connectors";
import {useDispatch} from "react-redux";
import {setWalletOpen} from "@redux/app/appSlice";

const Account = ({ triedToEagerConnect }: {triedToEagerConnect: any}) => {
  const {
    active,
    error,
    activate,
    account,
    setError,
  } = useWeb3React();
  const dispatch = useDispatch();
  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (error) {
    console.error(error);
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      (window as any)?.ethereum ||
      (window as any)?.web3;

    return (
      <div>
        {hasMetaMaskOrWeb3Available ? (
          <button
          className="bg-gray-900 text-white block px-3 py-2 text-base font-medium"
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {MetaMaskOnboarding.isMetaMaskInstalled()
              ? "Connect to MetaMask"
              : "Connect to Wallet"}
          </button>
        ) : (
          //@ts-ignore
          <button 
          className="bg-gray-900 text-white block px-3 py-2 text-base font-medium"
          onClick={() => onboarding.current?.startOnboarding()}>
            Install Metamask
          </button>
        )}
      </div>
    );
  }

  return (
      <div>
      <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => dispatch(setWalletOpen(true))}
      >
        My Wallet
      </button>
      </div>
  );
};

export default Account;
