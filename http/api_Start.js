const Log       = require("../components/log.js");
const axios     = require('axios');
const config    = require("config");

const host       = config.get('api_host')

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
}

module.exports =  new api_Start();

  function getAuthToken1(){
    try {
      const password  = config.get('sms_gate.password_base_64')
              const url       = config.get('sms_gate.url') 
              const systemID  = config.get('sms_gate.systemID')  
              const naming    = config.get('sms_gate.naming')                     
              const expiredTime = Utils.formatDateForSms(3600)
              const CreateDateTime = Utils.formatDateForSms(0)
  
              // Заголовки
              const req_config = {
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CreateDateTime': CreateDateTime ,
                      'RequestID': '90100',
                      'X-From': 'smi',
                      'X-ServiceID': 'clintinfosend_01.00.00',
                      'Authorization': `Basic ${password}` // Подтягиваем из файла параметр auth_sms_gate.password_base_64 закодированный в base64 "Basic ..."
                  }
              };
              // Тело запроса
              const data = {
              "meta": {
                  "systemID": `"${systemID}"` // подтягиваем из конфига
              },
              "data": {
                  "requestID": "ce10e70d-2223-4235-b21e-dbd023eec4d7", // генерим
                  "orderId": "ce10e70d-2223-4235-b21e-dbd023eec4d7", // генерим
                  "contactInfo": {
                  "code": "contactPhoneClient", 
                  "value": `"${value}"`  // парсим из входных данных
                  },
                  "priority": "realtime",
                  "messageType": "sms",
                  "expiredTime": `"${expiredTime}"`  , // ставим + 1 час к времени сервера в формате "2019-08-10T12:08:56.235+03:00"
                  "message":  `"${message}"` , // парсим из входных данных
                  "naming": `"${naming}"` 
              }
              };
  
axios.post(url, data, req_config)  
.then(response => {
//  console.log(response.data)
})
.catch(error => {
    console.error(error)
});

    } catch (error) {
      
    }
  }