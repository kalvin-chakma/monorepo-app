import { useBalanceStore } from "../useBalanceStore";

export const useBalance = () => {
    return useBalanceStore((state) => state.balance);
};
