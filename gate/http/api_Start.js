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
        // Получаем шаблоны
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
     /** Получение ID шаблона по его имени */
    async getTemplateIDbyName(token, templateName){
        try {      
            const templates = await this.getTemplates(token)
            /** Узнаем ID шаблона по его имени */
            const searchTemplate = templates?.data.filter(p=>p.name == templateName)
            const templateId = searchTemplate[0]//?.id      
            console.log(JSON.stringify(templateId?.customInformation))      
            return templateId
        } catch (error) {
            console.error(error)
        }
     }
     async getProjectByID(token, templateID){
        try {      
            const endpoint  = config.get('api_url.application_search')
            const url       = host + endpoint
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}` // "Bearer ..."
           }};
        // Тело запроса

            const data = {
                "limit": 100000,
                "filter": {
                    "projectId": {
                        "in": [
                            templateID
                        ]
                    }
                }
            };

        // Получаем шаблоны
            let projects = null;
            await axios.post(url, data, req_config)
            .then(response => {
                //console.log(response)
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
     async addProject(token, data){
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
        const _data = {
            protectionKey: protectionKey,
            project: {
              name:     data.name,  // название проекта
              codeName: data.codeName?  data.codeName : '', // Идентификатор продукта/проекта
              rolesMap: data.rolesMap?  data.rolesMap : { data: [] },
              jiraLink: data.jiraLink?  data.jiraLink : '', // ссылка на проект в Jira
              comment:  data.comment?   data.comment : '', // краткое описание
            },
            application: {
              name:                 data.name, // название сиситемы, поумолчанию название проекта
              specificationsIds:    data.specificationsIds? data.specificationsIds : [], // id характеристик для полей с выпадающими опциями
              performerTypeId:      data.performerTypeId?   data.performerTypeId : '', // id типа исполнителя, можно не указывать
              customInformation:    data.customInformation? data.customInformation : {fields: []},
              templateId:           data.templateId?        data.templateId : '', // id шаблона
            },
          };  
          
          
        //  console.log(JSON.stringify(_data))
        // Создаем проект
            let projects = null;
            await axios.post(url, _data, req_config)
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
    async getSpecificationIds(token){
        try {      
            const endpoint  = config.get('api_url.specification_ids_search')
            const url       = host + endpoint
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}` // "Bearer ..."
           }};
        // Тело запроса
            const data = {
                "limit": 100000
            };

        // Получаем шаблоны
            let projects = null;
            await axios.post(url, data, req_config)
            .then(response => {
                //console.log(response)
                if (response.data) projects = response.data                   
            }).catch(error => {
                //console.error(error)
            });            
            return projects
        } catch (error) {
            console.error(error)
        }
     }
     async getSpecificationIdsCategory(token){
         try {      
             const endpoint  = config.get('api_url.specification_ids_category_search')
             const url       = host + endpoint
         // Заголовки
             const req_config = {
             headers: {
             'Content-Type': 'application/json; charset=UTF-8',
             'Authorization': `Bearer ${token}` // "Bearer ..."
            }};
         // Тело запроса
             const data = {
                 "limit": 100000
             }; 
         // Получаем шаблоны
             let projects = null;
             await axios.post(url, data, req_config)
             .then(response => {
                 //console.log(response)
                 if (response.data) projects = response.data                   
             }).catch(error => {
                 //console.error(error)
             });            
             return projects
         } catch (error) {
             console.error(error)
         }
      }
}

module.exports =  new api_Start();