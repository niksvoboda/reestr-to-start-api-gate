let GPBAdditionalController = class GPBAdditionalController extends BaseController_1.BaseController {
    async createProjectApplication(data) {
        return await this.createProjectApplicationAction(data);
    }
    async createProjectApplicationAction(data) {
        const { project, application, protectionKey } = data;
        if (protectionKey === 'rKCAEnD3KNkVTqpvr9YSvrQWn8xhEL9q') {
            const projects = await this.projectService.search({ limit: 1000000 });
            const applications = await this.applicationService.search({ limit: 1000000 });
            const existsProjectWithSameName = projects.data.find((projectFromDB) => (projectFromDB.name || '').toLocaleLowerCase() === (project.name || '').toLocaleLowerCase());
            const existsApplicationWithSameName = applications.data.find((app) => app.projectId === (existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.id));
            const performerTypes = await this.performerService.search({ limit: 10000 });
            const projectData = Object.assign(Object.assign({}, (existsProjectWithSameName && { id: existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.id })), { unitedApplicationId: existsApplicationWithSameName ? existsApplicationWithSameName.id : null, isUnitedWithApplication: true, comment: project.comment || '     ', name: project.name, codeName: project.codeName || '', jiraLink: project.jiraLink, rolesMap: project.rolesMap || [] });
            const applicationData = Object.assign(Object.assign({}, (existsProjectWithSameName && { id: existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.unitedApplicationId })), { unitedProjectId: null, projectId: null, isUnitedWithProject: true, acceptStatus: existsApplicationWithSameName ?
                    (existsApplicationWithSameName.acceptStatus || IApplication_1.ApplicationAcceptStatus.draft) :
                    IApplication_1.ApplicationAcceptStatus.draft, versionNumber: existsApplicationWithSameName ?
                    (existsApplicationWithSameName.versionNumber || '0.0') :
                    '0.0', customInformation: application.customInformation, name: application.name || project.name, templateId: application.templateId || null, performerTypeId: application.performerTypeId || (performerTypes === null || performerTypes === void 0 ? void 0 : performerTypes.data[0].id), specificationsIds: application.specificationsIds || [] });
            await this.projectService.validateByStore(project, [EntityGroups_1.StoreGroups.create], true);
            await this.applicationService.validateByStore(applicationData, [EntityGroups_1.StoreGroups.create], true);
            const projectId = existsProjectWithSameName
                ? await this.projectService.update(projectData)
                : await this.projectService.create(projectData);
            const applicationId = existsProjectWithSameName
                ? await this.applicationService.update(Object.assign(Object.assign({}, applicationData), { projectId: (existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.id) || projectId, unitedProjectId: (existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.id) || projectId }))
                : await this.applicationService.create(Object.assign(Object.assign({}, applicationData), { projectId: (existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.id) || projectId, unitedProjectId: (existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.id) || projectId }));
            if (typeof projectId === 'string') {
                const project = await this.projectService.getById(projectId);
                if (typeof applicationId === 'string') {
                    project.unitedApplicationId = applicationId;
                    this.projectService.update(project);
                }
            }
            return {
                applicationId: existsProjectWithSameName ? existsProjectWithSameName === null || existsProjectWithSameName === void 0 ? void 0 : existsProjectWithSameName.unitedApplicationId : applicationId,
                projectId: existsProjectWithSameName ? existsProjectWithSameName.id : projectId,
            };
        }
    }
};


{
    "fields": [
       {
          "values": [
             {
                "name": "name",
                "type": "name",
                "title": "Наименование продукта/проекта",
                "description": "Данное поле должно содержать полное наименование Проекта/Продукта"
             }
          ]
       },
       {
          "values": [
             {
                "name": "codeName",
                "type": "codeName",
                "title": "Идентификатор продукта/проекта",
                "description": "Данное поле должно содержать уникальный идентификатор проекта/продукта в организации. В случае отсутствия кода указывается “Отсутствует“"
             }
          ]
       },
       {
          "values": [
             {
                "name": "jiraLink",
                "type": "jiraLink",
                "title": "Ссылка на проект в Jira",
                "description": "Ссылка на страницу проекта/продукта в Jira"
             }
          ]
       },
       {
          "values": [
             {
                "name": "comment",
                "type": "comment",
                "title": "Комментарий",
                "description": "Любая дополнительная информация по проекту"
             }
          ]
       },
       {
          "values": [
             {
                "name": "rolesMap",
                "type": "rolesMap",
                "title": "Пользователи проекта",
                "description": " "
             }
          ]
       }
    ]
 }

 {
    "fields": [
       {
          "type": "multiline",
          "value": "",
          "fieldName": "1. Полные наименования автоматизируемых процессов с указанием их кодов",
          "sortIndex": 1,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "2. Наименования этапов процессов с указанием их кодов",
          "sortIndex": 2,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "4. a. Полное название автоматизированной системы (АС)",
          "sortIndex": 3,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "b. Краткое название АС",
          "sortIndex": 4,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "c. Номер АС в Реестре АС",
          "sortIndex": 5,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "5. Назначение АС, перечень выполняемых ей функций",
          "sortIndex": 6,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "6. Заказчик АС",
          "sortIndex": 7,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "7. Владелец АС",
          "sortIndex": 8,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "В АС планируется взаимодействие со следующими АС:",
          "sortIndex": 9,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "a. Способ ввода информации в АС:",
          "sortIndex": 10,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "b. Получатели информации из АС",
          "sortIndex": 11,
          "fieldDescription": ""
       },
       {
          "type": "multiline",
          "value": "",
          "fieldName": "16. (J). Дополнительные условия/ограничения/требования Заказчика АС к проектируемой АС",
          "sortIndex": 12,
          "fieldDescription": ""
       }
    ]
 }