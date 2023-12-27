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
    /** Получение проекта */
    async getProject(token, projectID){
        try {      
            console.log(token, projectID)
            const endpoint  = config.get('api_url.project_id')
            const url       = host + endpoint + '/' + projectID
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}` // "Bearer ..."
           }};
        // Тело запроса
            const data = {};
        // Получаем проекты
            let projects = null;
            await axios.get(url, data, req_config)
            .then(response => {
               // console.log(response.data)
               //console.log('проект удален')
                if (response.data) projects = response.data                   
            }).catch(error => {
                //console.error(error)
            });            
            return projects
        } catch (error) {
            console.error(error)
        }
     } 
     /** Удаление проекта */
    async deleteProject(token, projectID){
        try {      
            console.log(token, projectID)
            const endpoint  = config.get('api_url.project_id')
            const url       = host + endpoint + '/' + projectID
        // Заголовки
            const req_config = {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}` // "Bearer ..."
           }};
        // Тело запроса
            const data = {};
        // Получаем проекты
            let projects = null;
            await axios.delete(url, data, req_config)
            .then(response => {
               // console.log(response.data)
               console.log('проект удален')
                if (response.data) projects = response.data                   
            }).catch(error => {
                //console.error(error)
            });            
            return projects
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
}

module.exports =  new api_Start();