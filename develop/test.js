        const data = {
            protectionKey: protectionKey,
            project: {
              name: update.name, // название проекта
              codeName: update.name, // Идентификатор продукта/проекта
              rolesMap: {
                data: [],
              },
              jiraLink: '', // ссылка на проект в Jira
              comment: '', // краткое описание
            },
            application: {
              name: update.name, // название сиситемы, поумолчанию название проекта
              specificationsIds: update.specificationsIds, // id характеристик
              performerTypeId: update.performerTypeId, // id типа исполнителя, можно не указывать
              customInformation: update.customInformation,
              templateId: update.templateId, // id шаблона
            },
          };