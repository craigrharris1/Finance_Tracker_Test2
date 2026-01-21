/**
* Functions used ONLY to test production code within the Apps Script Editor environment
*/


function testSUM_REGULAR_PAYMENTS () {


 console.log('Starting test SUM_REGULAR_PAYMENTS');
  const startOfMonth = new Date ("2024", "1", "1");
 const amountsRange = [5];
 const scheduledPaymentDayRange = [31];
 const firstPaymentDatesRange = [new Date("2024", "0", "31")];
 const finalPaymentDatesRange = [];
 //const restrictedPaymentMonthRange = [1,2,3,4,5,6,7,8,9,10,11,12];
 const restrictedPaymentMonthRange = [];
 const holidayRange = [new Date("2024", "0", "1"), new Date("2025", "0", "1")];
  console.log('startOfMonth is ', startOfMonth,
             '\namountsRange is ', amountsRange,
             '\nscheduledPaymentDayRange is ', scheduledPaymentDayRange,
             '\nfirstPaymentDatesRange is ', firstPaymentDatesRange,
             '\nfinalPaymentDatesRange is ', finalPaymentDatesRange,
             '\nrestrictedPaymentMonthRange is ',restrictedPaymentMonthRange,
             '\nholidayRange is ', holidayRange);


 let sum = SUM_REGULAR_PAYMENTS(startOfMonth, amountsRange, scheduledPaymentDayRange, firstPaymentDatesRange, finalPaymentDatesRange, restrictedPaymentMonthRange, holidayRange);


 console.log('sum is ', sum);


 return;


}


function testCheckPaymentDue(){
 console.log('starting testCheckPayments');
 const dm = new Date("2024", "1", "1");
 const pm = new Date("2024", "1", "1");
 const spd = 31;
 const firstpd = new Date("2024", "0", "28");
 const finalpd = null;
 //const rpms = [1,4,5,6,7,8,9,10,12]
 const rpms = null;
 const bh = [new Date("2024", "0", "1"), new Date("2025", "0", "1")];


 console.log(`dm is ${dm}`);
 console.log(`pm is ${pm}`);
 console.log(`spd is ${spd}`);
 console.log(`firstpd is ${firstpd}`);
 console.log(`finalpd is ${finalpd}`);
 console.log(`rpms is ${rpms}`);
 console.log(`bh is ${bh}`);


 let isPaymentDue = new Boolean (checkPaymentDue(dm, pm, spd, firstpd, finalpd, rpms, bh))


 console.log('isPaymentDue = ',isPaymentDue.toString());


 return;
}






function testgetWorkingDay() {
 console.log('starting testgetWorkingDay');
  const spd = new Date("2025", "1", "1");
 //const bh = [];
 const bh = [new Date("2024", "0", "01"), new Date("2025", "0", "01"), new Date("2025", "1", "03")];


 console.log(`spd is ${spd}`);
 console.log(`bh is ${bh}`);


 apd = getWorkingDay(spd,bh)
 console.log(`apd is ${apd}`);


return;
}


function getPotentialPaymentDate(){
 const year = [2024];
 const month = [0,1,2,3,4,5,6,7,8,9,10,11];
 const day = 31;
 for (let i = 0; i < year.length; i++) {
   for (let j = 0; j < month.length; j++) {
     const yr = year[i];
     const mn = month[j];
     const answer = new Date(yr, mn, day);
     const nm = mn +1;
     const eom = new Date (yr, nm, 0);
     //console.log(yr, mn, day, " = ", answer, eom)
    if ( answer > eom )
    {  answer.setTime(eom.getTime());
     }
   console.log (yr, mn, day, ' = ',answer);
     }
   }
 return ;
}
