const db        = require("./db.js");
const Log       = require("./log.js");
const api_Start = require("../http/api_Start.js") 

/** Флаг указывающий что в данный момент идет синхронизация */
let syncOn = false;
/** Отключение/включение проверки SSL сертификата "Старта" */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.get("app.checkNagiosSSL") == true? 1 : 0;


class Sync_scaner extends Log {     
    name = "Sync_scaner";
    async Charges() {
      try { 
      /** Провереяем дату последней синхронизации */

      /** Если больше установленного в конфиге, то логинимся */
      const token = await api_Start.getAuthToken();
      console.log(token)
      /** Получаем проекты из "Старта" */
      const projects = await api_Start.getProjects(token);
      /** Получаем проекты из БД*/

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
           // console.log(result);
            syncOn = false;
        }        
        /** Устанавливаем время следующего вызова */
        setTimeout(()=>{
            this.autoSyncCharges();
        }, polling_time );
        this.blue(`.interval: ${polling_time}seconds`);
    }
}

module.exports = new Sync_scaner();