import { PRICE_FEEDS, MIN_BORROW_AMOUNT } from "@/lib/constants"
import type { CollateralType, ValidationError } from "@/types/borrow"

const percent = (amount: number, percentage: number): number => (amount * percentage * 0.01); // or (amount * percentage) / 100

export default class BorrowCalculations {
  
  static calculateMaxBorrowAmount(collateral: number, collType: CollateralType): number {
    return percent(collateral * PRICE_FEEDS[collType.symbol], collType.ltvMax)
  }

  static calculateCurrentLTV(borrow: number, collateral: number, collType: CollateralType): number {
    const ltv = collateral === 0 ? 0 : (borrow / (collateral * PRICE_FEEDS[collType.symbol])) * 100
    return parseFloat(ltv.toFixed(2))
  }

  static calculateLiquidationPrice(borrow: number, collateral: number, collType: CollateralType): number {
    return collateral === 0 ? 0 : borrow / (percent(collateral, collType.ltvMax))
  }

  static calculateInterestCost(borrow: number, rate: number): number {
    const interest = percent(borrow, rate)     
    return parseFloat(interest.toFixed(0))
  }

  static validateBorrowInputs(collateral: string, borrow: string, collType: CollateralType, balance: number): ValidationError[] {
    const errors: ValidationError[] = []
    const collateralNum = parseFloat(collateral)
    const borrowNum = parseFloat(borrow)

    if (isNaN(collateralNum) || collateralNum <= 0 || balance <= collateralNum) {
      errors.push({ field: "collateral", message: "Please enter a valid collateral amount" })
    }

    if (isNaN(collateralNum) || borrowNum <= MIN_BORROW_AMOUNT) {
      errors.push({ field: "borrow", message: `Minimum borrow amount is ${MIN_BORROW_AMOUNT} BOLD` })
    }

    if (!isNaN(collateralNum) && !isNaN(borrowNum) && collateralNum > 0) {
      const maxBorrow = this.calculateMaxBorrowAmount(collateralNum, collType)
      if (borrowNum > maxBorrow) {
        errors.push({ field: "borrow", message: `Maximum borrow amount is ${maxBorrow.toFixed(0)} BOLD` })
      }
    }

    return errors
  }
}