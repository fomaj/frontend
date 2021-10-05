import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "@helpers/connectors";
import {setupNetwork} from "@helpers/wallet";

export default function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {

    setupNetwork().then(setup => {
      if (setup) {
        injected.isAuthorized().then((isAuthorized: boolean) => {
          if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        });
      } else {
        setTried(true);
        console.error("Provider not found.")
      }
    });

  }, [activate]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
