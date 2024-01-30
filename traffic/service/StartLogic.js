const Log           = require("../components/log.js");
const api_Start     = require("../http/api_Start.js");
const feth_Pages    = require("../http/feth_Pages.js");
const config        = require("config");
const path          = require('path');
const clc           = require("cli-color");
const { performance } = require('perf_hooks');
const {delay, showSpeed}   = require("../utils/utils.js")
/** Отключение/включение проверки SSL сертификата "Старта" */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.get("api_check_ssl") == true? 1 : 0;

const login = config.get("api_user_auth.login")
const password = config.get("api_user_auth.password")

class StartLogic extends Log {     
    name = "StartLogic";   
    /** Функция для  синхронизации всех проектов */
    async getProjects() {
      this.blue('getProjects')
      try { 
        /** Получаем диапазон загрузки проектов из конфига*/
        const END = config.get('sample.end')
        const START = config.get('sample.start')
        /** логинимся */
        const startTask0 = performance.now()
        console.log('Старт загрузки...')
        let token = await api_Start.getAuthToken();
        showSpeed(clc.blue(`Авторизация заняла`), startTask0);   
        /** Получаем страницу */
        const startTask1 = performance.now()
        const host_url      = config.get('api_host')
        const page = await feth_Pages.fetchPageAndResources_3(token, host_url, login, password);
        showSpeed(clc.blue(`Объем загруженных данных верстки: ${page.length/1000} kBytes`), startTask1);
        await delay(config.get("delay"))
        /** Получаем проекты из "Старта" */
        const startTask3 = performance.now()
        const urlAllProjects = `${host_url}/project/all`
        const pageAllProjects = await feth_Pages.fetchPageAndResources_3(token, urlAllProjects, login, password);
        //console.log(pageAllProjects)
        const startProjects = await api_Start.getProjects(token);      
        showSpeed(clc.blue(`Объем загруженных данных из списка проектов: ${JSON.stringify(pageAllProjects).length/1000} kBytes`), startTask3);  
       // showSpeed(clc.blue(`Объем загруженных данных из списка проектов: ${JSON.stringify(startProjects).length/1000} kBytes`), startTask3);        
        /** Загружаем каждый проект по ID */
        if (startProjects?.data) {
          const projects = startProjects?.data.slice(START, END)  
          //console.log(projects)     
            for (const project of projects) {    
          //console.log(project.id)      
          const startTask2 = performance.now()
          //const urlProjectInfo = `${host_url}/project/${project.id}/info`
         // const pageProjectInfo = await feth_Pages.fetchPageAndResources_3(token, urlProjectInfo, login, password);
          //console.log(pageProjectInfo)  
          //const pageProjectInfo = await getProject(token, project.id)
          const endpoint1 = `${host_url}/v2/admin/project/search`
          const data1 = {
            "limit": 100000,
            "filter": {
                "id": project.id
            }
          }
          const result1 = await api_Start.getPromEndPoint(endpoint1, token, data1)
          showSpeed(clc.blue(`Загружено данных для ID ${project.id} из URL: ${endpoint1} : ${JSON.stringify(result1).length/1000} kBytes`), startTask2);
          const startTask3 = performance.now()
          const endpoint2 = `${host_url}/v2/admin/application/search`
          const data2 = {
            "limit": 100000,
            "filter": {
                "projectId": {
                    "equal": project.id
                }
            },
            "fields": [
                "id",
                "name",
                "performerTypeId",
                "dataId",
                "projectId"
            ]
          }
          const result2 = await api_Start.getPromEndPoint(endpoint2, token, data2)
          showSpeed(clc.blue(`Загружено данных для ID ${project.id} из URL: ${endpoint2} : ${JSON.stringify(result2).length/1000} kBytes`), startTask3);
          
          const startTask4 = performance.now()
          const endpoint3 = `${host_url}/v2/admin/application/data/search`
          const data3 = {
            "limit": 100000,
            "filter": {
                "projectId": {
                    "equal":  project.id
                }
            },
            "fields": [
                "id",
                "requirementCount",
                "applicationId",
                "projectId",
                "statusesStatistic",
                "statusesIds",
                "statusesValuesIds"
            ]
          }
          const result3 = await api_Start.getPromEndPoint(endpoint3, token, data3)
          showSpeed(clc.blue(`Загружено данных для ID ${project.id} из URL: ${endpoint3} : ${JSON.stringify(result3).length/1000} kBytes`), startTask4);
          
          const startTask5 = performance.now()
          const endpoint4 = `${host_url}/v2/admin/user/project/role/search`
          const data4 = {
            "limit": 100000
          }
          const result4 = await api_Start.getPromEndPoint(endpoint4, token, data4)
          showSpeed(clc.blue(`Загружено данных для ID ${project.id} из URL: ${endpoint4} : ${JSON.stringify(result4).length/1000} kBytes`), startTask5);
          
          const startTask6 = performance.now()
          const endpoint5 = `${host_url}/v2/admin/user/search`
          const data5 = {
              "limit": 1000000,
              "filter": {
                  "ids": {
                      "in": []
                  }
              },
              "fields": [
                  "id",
                  "displayName",
                  "login"
              ]
          }
          const result5 = await api_Start.getPromEndPoint(endpoint5, token, data5)
          showSpeed(clc.blue(`Загружено данных для ID ${project.id} из URL: ${endpoint5} : ${JSON.stringify(result5).length/1000} kBytes`), startTask6);
          
          const startTask7 = performance.now()
          const endpoint6 = `${host_url}/v2/admin/status/value/search`
          const data6 = {
            "limit": 100000
          }
          const result6 = await api_Start.getPromEndPoint(endpoint6, token, data6)
          showSpeed(clc.blue(`Загружено данных для ID ${project.id} из URL: ${endpoint6} : ${JSON.stringify(result6).length/1000} kBytes`), startTask7);
          
          const startTask8 = performance.now()
          const endpoint7 = `${host_url}/v2/api/user/active/refresh/jwt`
          const data7 = {}
          const result7 = await api_Start.getPromEndPoint(endpoint7, token, data7)
          token = result7.newJwt
                    
          showSpeed(clc.blue(`Загружено данных для ID ${project.id} из URL: ${endpoint7} : ${JSON.stringify(result7).length/1000} kBytes`), startTask8);

          await delay(config.get("delay"))
          }
        }

        showSpeed(clc.red(`Проход завершен за:`), startTask0);
      } catch (error) {
        console.log(error)
      }
    } 


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