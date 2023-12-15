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