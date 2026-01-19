import { Coupon, CartItem, User } from '../types';

export const validateCoupon = (
  coupon: Coupon,
  cartTotal: number,
  items: CartItem[],
  user: User | null,
  selectedPaymentMethod?: string
): { isValid: boolean; error?: string; discountAmount: number } => {

  // 1. Existence & Active Status
  if (!coupon || !coupon.isActive) {
    return { isValid: false, error: 'This coupon is invalid or inactive.', discountAmount: 0 };
  }

  // 2. Date Validity
  const now = new Date();
  const validFrom = new Date(coupon.validFrom);
  const validUntil = new Date(coupon.validUntil);
  // Set end date to end of day to be user-friendly
  validUntil.setHours(23, 59, 59, 999);

  if (now < validFrom) {
    return { isValid: false, error: 'This offer has not started yet.', discountAmount: 0 };
  }
  if (now > validUntil) {
    return { isValid: false, error: 'This coupon has expired.', discountAmount: 0 };
  }

  // 3. Usage Limits
  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
    return { isValid: false, error: 'This coupon has reached its usage limit.', discountAmount: 0 };
  }

  // 4. Cart Value Threshold
  if (cartTotal < coupon.minCartValue) {
    return {
      isValid: false,
      error: `Add items worth ₹${coupon.minCartValue - cartTotal} more to apply this offer.`,
      discountAmount: 0
    };
  }

  // 5. User Eligibility
  if (coupon.userEligibility === 'new_user') {
    // Check if user has previous orders
    if (user && user.orders && user.orders.length > 0) {
      return { isValid: false, error: 'This offer is valid for new users only.', discountAmount: 0 };
    }
  }

  // 6. Payment Method Restriction (if applicable and method is selected)
  if (selectedPaymentMethod && coupon.paymentMethod && coupon.paymentMethod !== 'all') {
    const method = selectedPaymentMethod.toLowerCase();
    const required = coupon.paymentMethod.toLowerCase();
    
    // Simple check for 'cod' vs 'prepaid' (assuming other strings map to prepaid)
    const isCOD = method.includes('cash') || method.includes('cod');
    
    if (required === 'prepaid' && isCOD) {
      return { isValid: false, error: 'This offer is only valid for Prepaid orders.', discountAmount: 0 };
    }
    if (required === 'cod' && !isCOD) {
      return { isValid: false, error: 'This offer is only valid for Cash on Delivery.', discountAmount: 0 };
    }
  }

  // 7. Product/Category Applicability & Eligible Amount Calculation
  let eligibleAmount = 0;
  let hasApplicableItems = false;

  const hasCategoryRestriction = coupon.applicableCategories && coupon.applicableCategories.length > 0;
  const hasProductRestriction = coupon.applicableProducts && coupon.applicableProducts.length > 0;

  if (!hasCategoryRestriction && !hasProductRestriction) {
    // No specific restrictions, entire cart is eligible
    eligibleAmount = cartTotal;
    hasApplicableItems = true;
  } else {
    // Filter items to find which ones are eligible
    items.forEach(item => {
      const categoryMatch = hasCategoryRestriction 
        ? coupon.applicableCategories?.includes(item.category) 
        : false;
      const productMatch = hasProductRestriction 
        ? coupon.applicableProducts?.includes(item.id) 
        : false;

      // Logic: If restrictions exist, item must match at least one context (Category OR Product)
      let isItemEligible = false;
      
      if (hasCategoryRestriction && hasProductRestriction) {
         isItemEligible = categoryMatch || productMatch;
      } else if (hasCategoryRestriction) {
         isItemEligible = categoryMatch || false;
      } else if (hasProductRestriction) {
         isItemEligible = productMatch || false;
      }

      if (isItemEligible) {
        eligibleAmount += item.price * item.quantity;
        hasApplicableItems = true;
      }
    });

    if (!hasApplicableItems) {
      return { isValid: false, error: 'This coupon is not applicable to the items in your cart.', discountAmount: 0 };
    }
  }

  // 8. Calculate Discount based on Eligible Amount
  let discount = 0;

  if (coupon.type === 'flat') {
    // Flat discount usually applies once to the order if conditions are met
    discount = coupon.value;
  } else if (coupon.type === 'percentage') {
    discount = (eligibleAmount * coupon.value) / 100;
    
    // Apply Max Discount Cap
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else if (coupon.type === 'free_shipping') {
    // Value is 0 because shipping logic is usually handled by the cart total calculation, 
    // but the coupon is marked valid here.
    discount = 0; 
  }

  // Final Safety Check: Discount shouldn't exceed cart total
  if (discount > cartTotal) {
    discount = cartTotal;
  }

  return { isValid: true, discountAmount: Math.floor(discount) };
};
