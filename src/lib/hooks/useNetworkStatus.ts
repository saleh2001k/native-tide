import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkState {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string | null;
  details: any;
}

/**
 * Hook to monitor network connectivity status
 * @returns Object containing network state information
 */
export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: null,
    isInternetReachable: null,
    type: null,
    details: null
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        details: state.details
      });
    });

    // Get the initial state
    NetInfo.fetch().then(state => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        details: state.details
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
}; 