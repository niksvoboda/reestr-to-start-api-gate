const db          = require("../components/db.js");
const Log         = require("../components/log.js");
const dbFile      = require("../components/db_File.js");
const api_Start   = require("../http/api_Start.js");
const config      = require("config");
const {getFieldsMap} = require("../assets/baseTemplate.js")

/** Флаг указывающий что в данный момент идет синхронизация */
let syncOn = false;
/** Отключение/включение проверки SSL сертификата "Старта" */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.get("api_check_ssl") == true? 1 : 0;

class StartLogic extends Log {     
    name = "StartLogic";

    /** Функция для  синхронизации всех проектов */
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
        //console.log(token)
        /** Получаем id шаблона из "Старта" для использования его по умолчанию */
        const templateName = config.get("default_template_name")
        const templateId = await api_Start.getTemplateIDbyName(token, templateName)
      //  console.log('templateId', templateId)
        /** Получаем проекты из "Старта" */
        const projects = await api_Start.getProjects(token);
        projects?.data && projects?.data.forEach(element => {
          console.log(element)
          console.log(JSON.stringify(element?.fieldsMap))

        //  console.log(JSON.stringify(element?.rolesMap))
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
    
    /** Функция первоначального переноса всех проектов */
    async importProjects() {
      try {        
        /** Получаем проекты из БД*/
        const query = `SELECT * FROM v_reestr_as_asup`
        const reestrProjects = await db.asyncQuery(query, [], true)
        /** логинимся */
        const token = await api_Start.getAuthToken();
        console.log(reestrProjects)
        /** Проходим по списку проектов из реестра и для каждого создаем проект в старте, в старте проекты создаются по имени */
        for (const reestrProject of reestrProjects) {
          const name = reestrProject.Naimenovanie
          const comment = ''
          const owner_as = 'Петров Петр'
          const manager_as = 'Иванов Иван'
          const update = {
            field_1 : '',
            field_2 : '',
            field_3 : reestrProject.Naimenovanie,
            field_4 : reestrProject.Kratkoe_nazvanie_prilozhenie_spisok_sinonimov,
            field_5 : reestrProject.uniq_id,
            field_6 : Naznachenie,
            field_7 : manager_as,
            field_8 : owner_as,
            field_9 : '',
            field_10 : '',
            field_11 : '',
            field_12 : '',
          }
          const customInformation = getFieldsMap(update); 
          const result = await addProjects(token, update, name, comment, customInformation)

        }        
        /** Создаем в старте проекты  */

        /** Получаем проекты из "Старта" */
        const startProjects = await api_Start.getProjects(token);
        //console.log(startProjects)
        

        /** Делаем бэкап маппинга тех проектов которые есть в с реестре */

        /** Синхронизируем если выполняется условие */

        /** Обновляем карту синхронизации*/
        
        /** Сохраняем в дату импорта */
        await dbFile.writeFile('lastSyncDate', String(new Date()))       

      return true
      } catch (error) {
        console.log(error)
        return false
      }
    }

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
     /** Функция для переодического вызова функции синхронизации всех проектов */
    async autoSync(){
        let polling_time = config.get("api_check_sync_period") * 1000;;
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