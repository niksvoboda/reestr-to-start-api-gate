/** Функция для установки задержки */
function delay(ms) {
    console.log(`Delay: ${ms} ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** Функция для замера перформанса */
function showSpeed (text, startTime){
    console.log(`${text}: ${(performance.now() - startTime).toFixed(0)} мс`);
} 

module.exports={
    delay, showSpeed
}