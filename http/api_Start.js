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
                            "5382cc3a-cef9-4eca-9323-d4ed14cbd908"
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
     async addProjects(token, _name, _comment, _customInformation){
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
              name: _name, // название проекта
              codeName: '', // Идентификатор продукта/проекта
              rolesMap: {
                data: [],
              },
              jiraLink: '', // ссылка на проект в Jira
              comment: _comment, // краткое описание
            },
            application: {
              name: _name, // название сиситемы, поумолчанию название проекта
              specificationsIds: [
                "3a850d05-630f-41ae-b1ca-4b0a76a90199",
                "1a3f65c7-096d-451f-bea9-fb540abedb71",
                "5b3dc0f1-ac82-4c61-abc7-840211138734",
                "7bd0f442-e2a0-4ea5-b8c1-27124ca201b0",
                "f49ed135-f398-45c6-b379-e1da65960fd3",
                "af795863-354b-4606-aaf1-5bca3c37d767",
                "98365587-9af9-43e7-aa8f-64862cf31767"
            ], // id характеристик
              performerTypeId: '', // id типа исполнителя, можно не указывать
              customInformation: _customInformation,
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