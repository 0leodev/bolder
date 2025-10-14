import { PRICE_FEEDS, MIN_BORROW_AMOUNT } from "@/config/constants"
import type { CollateralType, ValidationError } from "@/types/borrow"

const percent = (amount: number, percentage: number): number => (amount * percentage) / 100;

export default class BorrowCalculations {
  static calculateMaxBorrowAmount(collateral: number, collType: CollateralType): number {
    return percent(collateral * PRICE_FEEDS[collType.symbol], collType.ltvMax)
  }

  static calculateCurrentLTV(borrow: number, collateral: number, collType: CollateralType): number {
    return collateral === 0 ? 0 : (borrow / (collateral * PRICE_FEEDS[collType.symbol])) * 100
  }

  static calculateLiquidationPrice(borrow: number, collateral: number, collType: CollateralType): number {
    return collateral === 0 ? 0 : borrow / (percent(collateral, collType.ltvMax))
  }

  static calculateInterestCost(borrow: number, rate: number): number {
    return percent(borrow, rate)
  }

  static validateBorrowInputs(collateral: string, borrow: string, collType: CollateralType): ValidationError[] {
    const errors: ValidationError[] = []
    const collateralNum = parseFloat(collateral)
    const borrowNum = parseFloat(borrow)

    if (isNaN(collateralNum) || collateralNum <= 0) {
      errors.push({ field: "collateral", message: "Please enter a valid collateral amount" })
    } 
    
    if (isNaN(borrowNum) || borrowNum <= 0) {
      errors.push({ field: "borrow", message: "Please enter a valid borrow amount" })
    } else if (borrowNum < MIN_BORROW_AMOUNT) {
      errors.push({ field: "borrow", message: `Minimum borrow amount is ${MIN_BORROW_AMOUNT} BOLD` })
    }

    if (!isNaN(collateralNum) && !isNaN(borrowNum) && collateralNum > 0) {
      const maxBorrow = this.calculateMaxBorrowAmount(collateralNum, collType)
      if (borrowNum > maxBorrow) {
        errors.push({ field: "borrow", message: `Maximum borrow amount is ${maxBorrow.toFixed(2)} BOLD` })
      }
    }

    return errors
  }
}