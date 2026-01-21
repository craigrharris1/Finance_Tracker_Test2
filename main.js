/**
 * 
* SUM_REGULAR_PAYMENTS
*
* Custom function to sum the Regular Payments due in a given month based on the First Payment
* Date and the Final Payment Date for each Regular Payment.
* A Regular Payment can be specified as only being paid on a subset of months of the year - the Restricted Payment Months.
*
* param {Date} startOfMonth The column of start dates of the months in which to sum the Regular Payments
* @param {amountsRange} amountRange The column of Regular Payment Amounts
* @param {Range} firstPaymentDates The column of First Payment Dates
* @param {Range} finalPaymentDates The column of Final Payment Dates
* @param {Range} monthRestrictionRange The column of comma-separated month numbers that define the subset
* of months on which the payment is due
* @return {number} The total sum of payments that meet all criteria.
* @customfunction
*/
function SUM_REGULAR_PAYMENTS(startOfMonth, amountsRange, scheduledPaymentDayRange, firstPaymentDatesRange, finalPaymentDatesRange, restrictedPaymentMonthRange, holidayRange) {
  // Receives ranges as 2D arrays, flatten them for easier iteration
 const amounts = amountsRange.flat();
 const scheduledPaymentDays = scheduledPaymentDayRange.flat();
 const firstPaymentDates = firstPaymentDatesRange.flat();
 const finalPaymentDates = finalPaymentDatesRange.flat();
 const restrictedPaymentMonths = restrictedPaymentMonthRange.flat();
  let totalSum = 0;


 // Loop through each Regular Payment and Apply Conditions
 for (let i = 0; i < amounts.length; i++) {
  
   const amount = amounts[i];
   const scheduledPaymentDay = scheduledPaymentDays[i];
   const finalPaymentDate = finalPaymentDates[i];
   const firstPaymentDate = firstPaymentDates[i];
   const restrictedPaymentMonthSet = restrictedPaymentMonths[i];


   // Ensure amount is a number before proceeding
   if (typeof amount !== 'number' || isNaN(amount))
   { continue;
   }


   // Determine whether payment is due this month and the actual payment date is in this month
   let isPaymentDue = checkPaymentDue ( startOfMonth, startOfMonth, scheduledPaymentDay, firstPaymentDate, finalPaymentDate, restrictedPaymentMonthSet, holidayRange )


   // Update sum if payment is due to be paid this month.
   if (isPaymentDue)
   { totalSum += amount;
   }


   // Determine the start date for the previous month
   const startOfPreviousMonth = new Date (startOfMonth.getFullYear(), startOfMonth.getMonth() -1, 1);


   // Determine whether payment was due last month, but overspilled to this month as
   // it is due on the next working day
   isPaymentDue = checkPaymentDue (startOfPreviousMonth, startOfMonth, scheduledPaymentDay, firstPaymentDate, finalPaymentDate, restrictedPaymentMonthSet, holidayRange )


   // Update sum if payment is due to be paid this month.
   if (isPaymentDue)
   { totalSum += amount;
   }


 }


 return totalSum;
}


/**
* checkPaymentDue
*
* Custom function to check whether a Regular Payment is to be paid in a given month.
* Note that a payment may be due at the end of a given month, but when that is not a working
* day payment will spill over into the following month.  This function takes both the month due
* and month to be paid as input.  It returns true only when a payment is due in the dueMonth,
* and to be paid in the paymentMonth.
* The function determines the Potential Payment Date based on the Scheduled
* Payment Day.  The function determines whether this is a working day and if not
* determines the date of the next working day.  The function then determines whether
* the payment is due to be paid.
*
* @param {Date} dueMonth The start date of the month to check whether the Regular
* Payment is due.
* @param {Date} paymentMonth  The start date of the month to check whether the Regular
* Payment is to be paid.
* @param {Number} scheduledPaymentDay The day of the month on which the Regular Payment
* is due (without consideration of whether it is a working day)
* @param {Date} firstPaymentDate The date that the first payment of the Regular Payment
* is due.
* @param {Date} finalPaymentDate The date that the final payment of the Regular Payment
* is due.
* @param {Range} restrictedMonthSet The comma-separated list month numbers (January = 1)
* @param {Range} holidayDates the list of dates that are holidays
* that define the subset of months on which the payment is due, or null if there is no
* subset of months that the payment is due.
* @return {Boolean} whether the payment is due or not.
* @customfunction
*/
function checkPaymentDue ( dueMonth, paymentMonth, scheduledPaymentDay, firstPaymentDate, finalPaymentDate, restrictedPaymentMonthSet, holidayRange ) {


// Determine the Potential Payment Date - the date the payment is due, without consideration
// of whether it is a working day. 
const potentialPaymentDate = new Date(dueMonth.getFullYear(), dueMonth.getMonth(), scheduledPaymentDay);


// where the Scheduled Payment Day is after the end of this month set the Potential Payment Date to the end of the month,
// for example where the Scheduled Payment Day is 31, but the month is February
const endOfDueMonth = new Date(dueMonth.getFullYear(), dueMonth.getMonth() + 1, 0);
if ( potentialPaymentDate > endOfDueMonth )
{  potentialPaymentDate.setTime(endOfDueMonth.getTime());
}


// Determine whether the firstPaymentDate is a valid date and whether the payment should
// have started during or prior to thisMonth
const paymentStarted = (firstPaymentDate instanceof Date && potentialPaymentDate >= firstPaymentDate);
  
// Determine whether the payment has not expired, i.e. the finalPaymentDate is after or
// equal to the potentialPaymentDate.
// Where the finalPaymentDate is not defined/set/blank the payment continues into the
// future.
const paymentNotExpired = (finalPaymentDate == '' || finalPaymentDate == null || potentialPaymentDate <= finalPaymentDate);


// The potential payment date may not be a working day, if so the actual payment date will be the
// which may not be in this month.  So the actual payment day is determined and whether the payment is
// actually due this month.
const actualPaymentDate = getWorkingDay(potentialPaymentDate, holidayRange);


const paymentDueThisMonth = (actualPaymentDate.getMonth() == paymentMonth.getMonth());


// Determine whether the payment is restricted to a subset of months of the year.
// Where restrictedPaymentMonthSet is not set/blank there are no restrictions on the
// months that a payment is due in.
let isMonthMatch = false;


if ( restrictedPaymentMonthSet?.length === 0 ||restrictedPaymentMonthSet === undefined )  {
     isMonthMatch = true; // Handles the ISBLANK part
   } else {
   // Handles the MATCH/SPLIT logic: create an array of allowed month numbers
   const allowedMonths = String(restrictedPaymentMonthSet)
     .split(',')
     .map(m => parseInt(m.trim())) // Convert strings to integers
     .filter(m => !isNaN(m));     // Filter out any non-number entries


   // Check if the target month number is in the array
   // note that the user-entered array has months starting at 1 for January, .getmonth
   // represents January as 1
   if (allowedMonths.includes(dueMonth.getMonth() + 1)) {
       isMonthMatch = true;
     }
   }
  
let isPaymentDue = false;


// Payment is due only if ALL conditional checks are TRUE
if ( paymentStarted && paymentNotExpired && paymentDueThisMonth && isMonthMatch) {
   isPaymentDue = true;
   }


return isPaymentDue;
}


/**
* getWorkingDay
*
* Determines whether a given date is a working day, if so the date is returned,
* if not the next working day is determined and returned
* Replicates: WORKDAY.INTL(DATE(year, month, day)-1, 1, 1, holidays)
* For a given date determine the next working day for the previous day.  Where this is
* the same as the given date, the given date is a working day.
*
* @param {Date} date The date to be evaluated
* @param {Range} holidayRange The range containing a list of holiday dates (e.g., 'Bank Holidays'!A2:A101)
* @return {Date} The calculated working day.
* @customfunction
*/
function getWorkingDay(scheduledPaymentDate, holidayRange) {
  // get the date for the previous day
 const actualPaymentDate = new Date(scheduledPaymentDate.getTime());
 actualPaymentDate.setDate(actualPaymentDate.getDate() - 1);


 // Process the list of Holidays
 // Flatten the range and convert dates to simple string format ("Mon Sep 28 2024")
 const holidays = holidayRange.flat();
 const holidayStrings = holidays.map(h => (h instanceof Date ? h.toDateString() : ''));


 // Find the next working day
 let daysToAdd = 1;


 while (daysToAdd > 0) {
   // Add one day to the current processing date
   actualPaymentDate.setDate(actualPaymentDate.getDate() + 1);


   // Get the day of the week (0 = Sunday)
   const dayOfWeek = actualPaymentDate.getDay();


   // Check whether the date is a weekend or a holiday
   const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
   const isHoliday = holidayStrings.includes(actualPaymentDate.toDateString());


   // If it's a valid work day (not weekend AND not holiday), we count it.
   if (!isWeekend && !isHoliday) {
     daysToAdd--;
   }
   // If it IS a weekend or holiday, the loop continues to the next day
 }


 return actualPaymentDate;
}
