const Log       = require("../components/log.js");
//const axios     = require('axios');
const config    = require("config");
const host      = config.get('api_host')
const urlModule = require('url');
const http      = require('http');
const https     = require('https');

class api_Start extends Log {     
    name = "api_Start";
    /** Авторизация */
    async getAuthToken() {
        try {
            const login     = config.get('api_user_auth.login');
            const password  = config.get('api_user_auth.password');
            const endpoint  = config.get('api_url.login');
            const url       = host + endpoint;
            const headers = {
                'Content-Type': 'application/json'
            };
            const data = JSON.stringify({
                login: login,
                password: password,
                adServerId: null
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
            });

            // Получение всех set-cookie заголовков (могут быть несколько)
              
            const cookies = response.headers.getSetCookie();

            const accessToken = cookies[1].split(';')[0].split('=')[1];
            const refreshToken = cookies[2].split(';')[0].split('=')[1];
            const csrfToken = cookies[0].split(';')[0].split('=')[1];

            // В зависимости от того, как приходят токены, возможно потребуется поиск по ключам
            // Или, если токены приходят в теле ответа, ищите там.

            return {
                accessToken,
                refreshToken,
                csrfToken
            };

        } catch (error) {
            console.error(error);
            return null;
        }
    }
    /** Получение списка проектов */
    async getProjects (tokens){
        try {
            const endpoint = config.get('api_url.project_search');
            const url = host + endpoint;
            const headers = {
                'X-Csrf-Token': tokens.csrfToken,
                'Content-Type': 'application/json; charset=UTF-8',
                'Cookie': `accessToken=${tokens.accessToken}; refreshToken=${tokens.refreshToken}; __Host-startx.x-csrf-token=${tokens.csrfToken}`
            };

            const data = JSON.stringify({
                filter: {
                    name: {
                        like: {
                            value: "",
                            caseInsensitive: false
                        }
                    }
                }
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
            });

            // Выводим тело ответа для анализа
            const result = await response.json();

            if (!response.ok) {
                console.error('Ошибка:', response.status, result);
                return null;
            }

            return result;
        } catch (error) {
            console.error(error);
        }
    };
    async getProjectByID(tokens, templateID) {
        try {
            const endpoint = config.get('api_url.application_search');
            const url = host + endpoint;

            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Csrf-Token': tokens.csrfToken,
                'Cookie': `accessToken=${tokens.accessToken}; refreshToken=${tokens.refreshToken}; __Host-startx.x-csrf-token=${tokens.csrfToken}`
            };

            const data = JSON.stringify({
                "limit": 100000,
                "filter": {
                    "projectId": {
                        "in": [templateID]
                    }
                }
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Ошибка:', response.status, result);
                return null;
            }

            return result;

        } catch (error) {
            console.error(error);
        }
    }
    async getSpecificationIds(tokens) {
        try {
            const endpoint = config.get('api_url.specification_ids_search');
            const url = host + endpoint;

            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Csrf-Token': tokens.csrfToken,
                'Cookie': `accessToken=${tokens.accessToken}; refreshToken=${tokens.refreshToken}; __Host-startx.x-csrf-token=${tokens.csrfToken}`
            };

            const data = JSON.stringify({ "limit": 100000 });

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
            });

            const result = await response.json();
            //console.log(result);

            if (!response.ok) {
                console.error('Ошибка:', response.status, result);
                return null;
            }

            return result//{data: result};

        } catch (error) {
            console.error(error);
        }
    }
    async getSpecificationIdsCategory(tokens) {
        try {
            const endpoint = config.get('api_url.specification_ids_category_search');
            const url = host + endpoint;

            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Csrf-Token': tokens.csrfToken,
                'Cookie': `accessToken=${tokens.accessToken}; refreshToken=${tokens.refreshToken}; __Host-startx.x-csrf-token=${tokens.csrfToken}`
            };

            const data = JSON.stringify({ "limit": 100000 });

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Ошибка:', response.status, result);
                return null;
            }

            return result;

        } catch (error) {
            console.error(error);
        }
    }
    /** Получение списка шаблонов */
    async getTemplates(tokens) {
        try {
            const endpoint = config.get('api_url.template_search');
            const url = host + endpoint;

            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Csrf-Token': tokens.csrfToken,
                'Cookie': `accessToken=${tokens.accessToken}; refreshToken=${tokens.refreshToken}; __Host-startx.x-csrf-token=${tokens.csrfToken}`
            };

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

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Ошибка:', response.status, result);
                return null;
            }

            return result;

        } catch (error) {
            console.error(error);
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
    /** Создание проекта */ 
    async addProject(tokens, data) {
    try {
        const endpoint = config.get('api_url.project_add');
        const protectionKey = config.get('api_protectionKey');
        const url = host + endpoint;

        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Csrf-Token': tokens.csrfToken,
            'Cookie': `accessToken=${tokens.accessToken}; refreshToken=${tokens.refreshToken}; __Host-startx.x-csrf-token=${tokens.csrfToken}`
        };

        const _data = {
            protectionKey: protectionKey,
            project: {
                name: data.name,
                codeName: data.codeName ? data.codeName : '',
                rolesMap: data.rolesMap ? data.rolesMap : { data: [] },
                jiraLink: data.jiraLink ? data.jiraLink : '',
                comment: data.comment ? data.comment : '',
            },
            application: {
                name: data.name,
                specificationsIds: data.specificationsIds ? data.specificationsIds : [],
                performerTypeId: data.performerTypeId ? data.performerTypeId : '',
                customInformation: data.customInformation ? data.customInformation : {fields: []},
                templateId: data.templateId ? data.templateId : '',
            },
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(_data)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Ошибка:', response.status, result);
            return null;
        }

        return result;

    } catch (error) {
        console.error(error);
    }
}
}

module.exports =  new api_Start();