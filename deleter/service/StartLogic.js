const Log           = require("../components/log.js");
const api_Start     = require("../http/api_Start.js");
const config        = require("config");
const path          = require('path');

/** Отключение/включение проверки SSL сертификата "Старта" */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.get("api_check_ssl") == true? 1 : 0;

class StartLogic extends Log {     
    name = "StartLogic";
   
    /** Функция для  синхронизации всех проектов */
    async deleteProjects() {
      this.blue('updateProjects')
      try { 
        /** Получаем проекты из БД*/
        const END = config.get('sample.end')
        const START = config.get('sample.start')
        /** логинимся */
        const token = await api_Start.getAuthToken();
        /** Получаем проекты из "Старта" */
        const startProjects = await api_Start.getProjects(token);        
        /** Удаляем каждый проект по ID */
        if (startProjects?.data) {
          const projects = startProjects?.data.slice(START, END)  
         // console.log(projects)     
          for (const project of projects) { 
         // const result = await api_Start.getProject(token, project.id);    
         // console.log(result)      
          const res = await api_Start.deleteProject(token, project.id);  
          }
        }
      } catch (error) {
        console.log(error)
      }
    } 
}

module.exports = new StartLogic();