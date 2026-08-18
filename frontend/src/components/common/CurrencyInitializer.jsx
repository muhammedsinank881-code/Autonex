import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../redux/slices/currencySlice.js";
import { getSettings } from "../../api/settings.api.js";

const CurrencyInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeCurrency = async () => {
      const savedCurrency = localStorage.getItem("currency");

      if (savedCurrency) {
        return;
      }

      try {
        const data = await getSettings();

        const defaultCurrency = data?.data?.defaultCurrency || "INR";

        dispatch(setCurrency(defaultCurrency));
      } catch (error) {
        console.error("Failed to load default currency:", error);

        dispatch(setCurrency("INR"));
      }
    };

    initializeCurrency();
  }, [dispatch]);

  return null;
};

export default CurrencyInitializer;
