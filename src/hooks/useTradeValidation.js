import { useState } from 'react';
import { validateBidAmount, validateTrade } from '../utils/tradeValidator';

/**
 * Custom hook for trade validation
 * Provides validation functions and state management for trade errors
 */
export const useTradeValidation = () => {
  const [validationError, setValidationError] = useState(null);

  /**
   * Validate and attempt to place a trade
   * @param {Object} tradeData - Trade data to validate
   * @returns {boolean} - True if trade is valid, false otherwise
   */
  const validateAndPlaceTrade = (tradeData) => {
    // Clear previous errors
    setValidationError(null);

    // Perform validation
    const validation = validateTrade(tradeData);

    if (!validation.isValid) {
      // Set error message (display first error or all errors)
      setValidationError(validation.errors.join(', '));
      return false;
    }

    return true;
  };

  /**
   * Quick validation for just bid amount
   * @param {number} bidAmount - Bid amount to validate
   * @returns {boolean} - True if bid is valid
   */
  const isBidAmountValid = (bidAmount) => {
    const validation = validateBidAmount(bidAmount);
    setValidationError(validation.isValid ? null : validation.error);
    return validation.isValid;
  };

  /**
   * Clear validation errors
   */
  const clearError = () => {
    setValidationError(null);
  };

  return {
    validationError,
    validateAndPlaceTrade,
    isBidAmountValid,
    clearError
  };
};
