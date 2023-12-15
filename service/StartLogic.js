const db          = require("../components/db.js");
const Log         = require("../components/log.js");
const dbFile      = require("../components/db_File.js");
const api_Start   = require("../http/api_Start.js");
const config      = require("config");

/** Флаг указывающий что в данный момент идет синхронизация */
let syncOn = false;
/** Отключение/включение проверки SSL сертификата "Старта" */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.get("api_check_ssl") == true? 1 : 0;

class StartLogic extends Log {     
    name = "StartLogic";
    async createProject() {
      try {
        /** логинимся */
        const token = await api_Start.getAuthToken();
        console.log(token)
        /** Получаем проекты из "Старта" */
        const addProjects = await api_Start.addProjects(token);
      } catch (error) {
        console.log(error)
      }
    }
    async updateProject() {
      try {
        
      } catch (error) {
        console.log(error)
      }
    }
    /** Функция для первоначального переноса проектов из реестра в старт */
    async startCreateProjects() {
      try {
        
      } catch (error) {
        console.log(error)
      }
    }
    /** Функция для переодической синхронизации всех проектов */
    async updateProjects() {
      try { 
      /** Провереяем дату последней синхронизации  */
      const nowDate = new Date().getTime()
      const lastSyncDate = new Date(await dbFile.readFile('lastSyncDate')).getTime()
      const SyncPeriod = config.get("api_sync_period") * 1000;
      //console.log(lastSyncDate, nowDate, SyncPeriod)

      /** Если больше установленного в конфиге, то начинаем синхронизацию */
      if (nowDate >= lastSyncDate + SyncPeriod) {
        /** логинимся */
        const token = await api_Start.getAuthToken();
        console.log(token)
        /** Получаем шаблоный из "Старта" */
        const templates = await api_Start.getTemplates(token)
        templates?.data && templates?.data.forEach(element => {
          console.log(element)
          console.log(JSON.stringify(element?.customInformation))
        });

        /** Получаем проекты из "Старта" */
        const projects = await api_Start.getProjects(token);
        projects?.data && projects?.data.forEach(element => {
          console.log(element)
          //console.log(JSON.stringify(element?.customInformation))
        });

        /** Получаем проекты из БД*/

        /** Проверяем соотвествие изменений проектов  */

        /** Синхронизируем если выполняется условие */

        /** Обновляем карту синхронизации*/   

        /** Сохраняем в дату синхронизации */
      await dbFile.writeFile('lastSyncDate', String(new Date()))
      } else {
        console.log('Время следующей синхронизации еще не наступило')
      }
      

      } catch (error) {
        console.log(error)
      }
    }
    async autoSync(){
        let polling_time = 5000;
        /** Если синхронизация не выполняется в данный момент то запускаем */
        if (!syncOn) {
            syncOn = true;  
            const result = await this.updateProjects();
           // console.log(result);
            syncOn = false;
        }        
        /** Устанавливаем время следующего вызова */
        setTimeout(()=>{
            this.autoSync();
        }, polling_time );
        this.blue(`.interval: ${polling_time}seconds`);
    }
}

module.exports = new StartLogic();