const Log       = require("../components/log.js");
const axios     = require('axios');
const config    = require("config");
const host      = config.get('api_host')

class api_Start extends Log {     
    name = "api_Start";
    /** Авторизация */
    async getAuthToken(){
        try {      
            const password  = config.get('api_user_auth.password')
            const login     = config.get('api_user_auth.login')
            const endpoint  = config.get('api_url.login')
            const url       = host + endpoint
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8'
            }};
        // Тело запроса
            const data = {                
                    password: password, // генерим
                    login: login, // генерим
                    adServerId: null               
            };
        // Получаем токен
            let token = null;
            await axios.post(url, data, req_config)
            .then(response => {
                if (response.data.jwt) token = response.data.jwt                   
            }).catch(error => {});

            return token
        } catch (error) {
                console.error(error)
        }
    }
    /** Получение списка проектов */
    async getProjects(token){
        try {      
            const endpoint  = config.get('api_url.project_search')
            const url       = host + endpoint
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}` // "Bearer ..."
           }};
        // Тело запроса
            const data = {
                filter: {
                    name: {
                        like: {
                            value: "",
                            caseInsensitive: false
                        }
                    }
                }
            };
        // Получаем проекты
            let projects = null;
            await axios.post(url, data, req_config)
            .then(response => {
               // console.log(response.data)
                if (response.data) projects = response.data                   
            }).catch(error => {
                //console.error(error)
            });            
            return projects
        } catch (error) {
            console.error(error)
        }
     }
      /** Получение списка шаблонов */
    async getTemplates(token){
        try {      
            const endpoint  = config.get('api_url.template_search')
            const url       = host + endpoint
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}` // "Bearer ..."
           }};
        // Тело запроса
            const data = {
                filter: {
                    name: {
                        like: {
                            value: "",
                            caseInsensitive: false
                        }
                    }
                }
            };
        // Получаем проекты
            let projects = null;
            await axios.post(url, data, req_config)
            .then(response => {
               // console.log(response.data)
                if (response.data) projects = response.data                   
            }).catch(error => {
                //console.error(error)
            });            
            return projects
        } catch (error) {
            console.error(error)
        }
     }
     /** Создание проекта */
     async addProjects(token, update){
        try {      
            const endpoint  = config.get('api_url.project_add')
            const protectionKey = config.get('api_protectionKey')
            const url       = host + endpoint
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}` // "Bearer ..."
           }};
        // Тело запроса
        const data = {
            protectionKey: protectionKey,
            project: {
              name: 'Система DiasoftBank 4*4', // название проекта
              codeName: '', // Идентификатор продукта/проекта
              rolesMap: {
                data: [],
              },
              jiraLink: '', // ссылка на проект в Jira
              comment: '111Для примера по Реестру АС', // краткое описание
            },
            application: {
              name: 'Система DiasoftBank 4*4', // название сиситемы, поумолчанию название проекта
              specificationsIds: [], // id характеристик
              performerTypeId: 'dc6542e0-5b50-46e2-9b77-9229e6802286', // id типа исполнителя, можно не указывать
              customInformation: {"fields":[{"type":"multiline","value":"","fieldName":"1. Полные наименования автоматизируемых процессов с указанием их кодов","sortIndex":1,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"2. Наименования этапов процессов с указанием их кодов","sortIndex":2,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"4. a. Полное название автоматизированной системы (АС)","sortIndex":3,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"b. Краткое название АС","sortIndex":4,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"c. Номер АС в Реестре АС","sortIndex":5,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"5. Назначение АС, перечень выполняемых ей функций","sortIndex":6,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"6. Заказчик АС","sortIndex":7,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"7. Владелец АС","sortIndex":8,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"В АС планируется взаимодействие со следующими АС:","sortIndex":9,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"a. Способ ввода информации в АС:","sortIndex":10,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"b. Получатели информации из АС","sortIndex":11,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"16. (J). Дополнительные условия/ограничения/требования Заказчика АС к проектируемой АС","sortIndex":12,"fieldDescription":""}]},
              templateId: 1, // id шаблона
            },
          };
           
        // Создаем проект
            let projects = null;
            await axios.post(url, data, req_config)
            .then(response => {
              //  console.log(response.data)
                if (response.data) projects = response.data                   
            }).catch(error => {
                console.error(error)
            }); 
            return projects
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports =  new api_Start();