export const formatQuantity = (amount, options = {}) =>
  `${new Intl.NumberFormat('en-US', options).format(amount)} pcs`;
