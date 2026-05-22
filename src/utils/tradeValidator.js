/**
 * Trade Validation Utility
 * Validates trade parameters before placing an order
 */

/**
 * Validates if a bid amount is acceptable for trading
 * @param {number} bidAmount - The bid amount to validate
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export const validateBidAmount = (bidAmount) => {
  if (bidAmount === undefined || bidAmount === null) {
    return {
      isValid: false,
      error: 'Bid amount is required'
    };
  }

  const amount = Number(bidAmount);

  if (isNaN(amount)) {
    return {
      isValid: false,
      error: 'Bid amount must be a valid number'
    };
  }

  if (amount === 0) {
    return {
      isValid: false,
      error: 'Bid amount cannot be zero. Please enter a valid bid amount.'
    };
  }

  if (amount < 0) {
    return {
      isValid: false,
      error: 'Bid amount cannot be negative'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Comprehensive trade validation function
 * @param {Object} tradeData - Trade data object
 * @param {number} tradeData.bidAmount - The bid amount
 * @param {string} tradeData.tradeType - 'buy' or 'sell'
 * @param {number} tradeData.quantity - Lot size quantity
 * @returns {Object} - { isValid: boolean, errors: Array<string> }
 */
export const validateTrade = (tradeData) => {
  const errors = [];

  // Validate bid amount
  const bidValidation = validateBidAmount(tradeData.bidAmount);
  if (!bidValidation.isValid) {
    errors.push(bidValidation.error);
  }

  // Validate trade type
  if (!tradeData.tradeType || !['buy', 'sell'].includes(tradeData.tradeType)) {
    errors.push('Trade type must be either "buy" or "sell"');
  }

  // Validate quantity
  if (!tradeData.quantity || Number(tradeData.quantity) <= 0) {
    errors.push('Quantity must be greater than zero');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};
