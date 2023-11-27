const db                = require("./db.js");
const Log               = require("./log.js");
/** Флаг указывающий что в данный момент идет синхронизация  */
let syncOn = false;

class Auto_Sync extends Log {     
    name = "Auto_Sync";
    async Charges() {
      try { 
      /** Провереяем дату последней синхронизации */

      /** Если больше установленного в конфиге, то получаем проекты из бд реестра и поочередно получаем проекты из "Старта" */

      /**  */
          
      } catch (error) {
        console.log(error)
      }
    }
    async autoSyncCharges(){
        let polling_time = 5000;
        /** Если синхронизация не выполняется в данный момент то запускаем */
        if (!syncOn) {
            syncOn = true;  
            const result = await this.Charges();
            console.log(result);
            syncOn = false;
        }
        
        /** Устанавливаем время следующего вызова */
        setTimeout(()=>{
            this.autoSyncCharges();
        }, polling_time );
        this.d(`.interval:`,`${polling_time}seconds`);
    }
}

module.exports = new Auto_Sync();