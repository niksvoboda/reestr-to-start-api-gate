const db            = require("../components/db.js");
const Log           = require("../components/log.js");
const dbFile        = require("../components/db_File.js");
const api_Start     = require("../http/api_Start.js");
const config        = require("config");
const path          = require('path');
const Reestr        = require('../models/reestr.js')
const { getFieldsMap, 
      dropDownFields }= require("../assets/baseTemplate.js")
const { getImportData, 
  getUpdateData, 
  getSpecificationsIdsFromStart,
  getManagers,
  getOwners,
  getUnsyncMapping,
  getReSyncMapping
} = require("../utils/utils.js")

const saveFile = true

/** Флаг указывающий что в данный момент идет синхронизация */
let syncOn = false;
/** Отключение/включение проверки SSL сертификата "Старта" */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.get("api_check_ssl") == true? 1 : 0;

class StartLogic extends Log {     
    name = "StartLogic";
    /** Функция получения ID выпадающих полей шаблона и ID их значенией  */
    async getDropDownFields() {
      try {
        // Получаем ID категорий заданных в базовом шаблоне
        const token = await api_Start.getAuthToken();
        const _specificationIdsCategory = await api_Start.getSpecificationIdsCategory(token); 
        await saveFile && dbFile.writeFileJSON("_specificationIdsCategory", _specificationIdsCategory, true)
        let dropDownFieldsWithID = []      
        for (const field of dropDownFields) {
          const categorys = _specificationIdsCategory.data    
          //console.log(field.nameStart) 
          const thisCategory = categorys.filter(p => p.name.includes(field.nameStart))
          if(thisCategory.length>0){
            const newField = {
              ...field, categoryId: thisCategory[0]?.id
            }
            dropDownFieldsWithID.push(newField)
          }  
        }      
        await saveFile && dbFile.writeFileJSON("dropDownFieldsWithID", dropDownFieldsWithID, true)
        // Получаем ID значений полей в каждой категории  
        let dropDownFieldsWithIDWithIds = []
        const _specificationIds = await api_Start.getSpecificationIds(token);
        for (const field of dropDownFieldsWithID) {
          const fieldSpecificationIds = _specificationIds.data   
          // Получаем поля данной категории целиком с ID 
          const thisCategoryIds = fieldSpecificationIds.filter(p => p.categoryId.includes(field.categoryId))
          // Для каждого поля данной категории сопоставляем исходное имя  ID в системе          
          let idsNamesWithIds = []
          for (const iterator of field.idsNames) {
            // Получаем поле данной категории с именем как в шаблоне чтобы узнать его ID 
            const thisIds = thisCategoryIds.filter(p => p.name.includes(iterator.start))
            if(thisIds.length>0){
              const newIterator = {
                ...iterator, id: thisIds[0]?.id
              }
              idsNamesWithIds.push(newIterator)
            }  
          }
          // Сохраняем в новый массив
          if(idsNamesWithIds.length>0){
            const newField = {
              nameStart: field.nameStart, 
              nameReestr: field.nameReestr,
              idsNames: idsNamesWithIds,
              categoryId: field.categoryId
            }
            dropDownFieldsWithIDWithIds.push(newField)
          }          
        }
        //console.log(JSON.stringify(dropDownFieldsWithIDWithIds)) 
        await saveFile && dbFile.writeFileJSON("dropDownFieldsWithIDWithIds", dropDownFieldsWithIDWithIds, true)
        return dropDownFieldsWithIDWithIds
      } catch (error) {
         console.log(error)
      }
    }
     /** Функция для  синхронизации одного проекта */
     async updateProject(token, project, reestrProjects, dropDownFields, owners, managers, personal_2012) {      
      try {      
          const projectId = project.id? project.id : ''
          const projectName = project.name? project.name : ''
          // Проверяем есть ли проект в базе реестра  и в старте одновременно, 
          const check = reestrProjects.filter(p=>p.Naimenovanie == projectName)
          // console.log('check',  check) 
          // Проверяем есть ли маппинг 
          const fileName = path.join('import', projectId); 
          const mappingProject = await dbFile.readFileJSON(fileName)
          
          // Если есть бэкап и проект в обоих базах то обрабатываем
          if (check?.length > 0 && mappingProject) {
           // this.blue('updateProject')
           // console.log(mappingProject)  
            const reestrProject = check[0]
            const specificationsIdsFromStart = getSpecificationsIdsFromStart(reestrProject, dropDownFields) //выпадающие поля из старта
             
            const _ownersStr = getOwners(reestrProject, owners, personal_2012)
            const _managersStr = getManagers(reestrProject, managers, personal_2012)
            const customInformationFromReestr = getFieldsMap(reestrProject, _managersStr, _ownersStr);  // кастомные текстовые поля из реестра в преобразованном для старта виде
             
            //Получаем кастомные поля проекта индивидуальным запросом, так как как они не отдаются общим запросом            
            const startProjectFromByID = await api_Start.getProjectByID(token, projectId);
            /** Производим сравнение по заданной логике: 
             * 1) Если поле менялось первый раз в реестре, а в старте еще не менялось то импортируем данные из реестра в старт и отключаем дальнейшуюю синхронизацию 
             * 2) Если поле уже менялось в старте то отключаем синхронизацию и ничего не импортируем, оставляем актуальные данные из старта
             */    
           // await dbFile.writeFileJSON(fileName, startProject)
            const { updateData, newMappingProject, updateProjectFlag } = await getUpdateData(startProjectFromByID, project, customInformationFromReestr, 
              mappingProject, specificationsIdsFromStart, _ownersStr, _managersStr)
            // Апдейтим проект если проект изменялся и флаг апдейта включен
            if (updateProjectFlag == true) {
              // Апдейтим в старте
              //console.log(updateData)
              const result = await api_Start.addProject(token, updateData)                           
              //Обновляем маппинг синхронизации проекта в файле 
              const fileName = path.join('import', projectId);        
              await dbFile.writeFileJSON(fileName, newMappingProject, true)
              this.blue(`Проект ID: ${projectId} проверен и обновлен`)               
            } else {
              this.blue(`Проект ID: ${projectId} проверен`) 
            }
          }        
      } catch (error) {
          console.log(error)
      }
     }
    /** Функция для  синхронизации всех проектов */
    async updateProjects() {
      this.blue('updateProjects')
      try { 
      /** Провереяем дату последней синхронизации  */
      const nowDate = new Date().getTime()
      const lastSyncDate = new Date(await dbFile.readFile('lastSyncDate')).getTime()
      const SyncPeriod = config.get("api_sync_period") * 1000;
      //console.log(lastSyncDate, nowDate, SyncPeriod)

      /** Если больше установленного в конфиге, то начинаем синхронизацию */
      if (nowDate >= lastSyncDate + SyncPeriod) {
        /** логинимся */
        const token = await api_Start.getAuthToken();
        /** Получаем проекты из БД*/
        const LIMIT = config.get('db_reestr.limit')
        const OFFSET = config.get('db_reestr.offset')
        const reestrProjects = await Reestr.getAs(LIMIT, OFFSET);
        /** Получаем данные о персонале */
        const owners = await Reestr.getOwners(); 
        const managers = await Reestr.getManagers();
        const personal_2012 = await Reestr.getPersonal2012();
        /** Получаем проекты из "Старта" */
        const startProjects = await api_Start.getProjects(token);
        //console.log(startProjects)        
        /** Получаем выпадающие поля шаблона с их текущими ID в данной конкретной системе */
        const dropDownFields = await  this.getDropDownFields()
        if (startProjects?.data) {
          const projects = startProjects?.data//.slice(0,1)          
          for (const project of projects) {     
            //console.log(await this.updateProject(token, project, reestrProjects)) 
            const result = await this.updateProject(token, project, reestrProjects, dropDownFields, owners, managers, personal_2012)        
          }
        }
        /** Сохраняем дату синхронизации от нее будет отталкиваться дата следующей синхронизации*/
        await dbFile.writeFile('lastSyncDate', String(new Date()))
      } else {
        console.log(`До следующей синхронизации ${(lastSyncDate + SyncPeriod - nowDate)/1000} секунд`)
      }     

      } catch (error) {
        console.log(error)
      }
    }    
    /** Функция первоначального переноса всех проектов */
    async importProjects() {
      try {        
        /** Получаем проекты из БД*/
        const LIMIT = config.get('db_reestr.limit')
        const OFFSET = config.get('db_reestr.offset')
        const reestrProjects = await Reestr.getAs(LIMIT, OFFSET);
        /** Получаем данные о персонале */
        const owners = await Reestr.getOwners();
        const managers = await Reestr.getManagers();
        const personal_2012 = await Reestr.getPersonal2012();
        /** логинимся */
        const token = await api_Start.getAuthToken();
        //console.log(reestrProjects)        
        /** Получаем проекты из "Старта" */
        let s0_startProjects = await api_Start.getProjects(token);
        s0_startProjects = s0_startProjects.data
        // await dbFile.writeFile('s0_startProjects', s0_startProjects)  
        // console.log(s0_startProjects)     
        /** Получаем выпадающие поля шаблона с их текущими ID в данной конкретной системе */
        const dropDownFields = await this.getDropDownFields()
        /** Проходим по списку проектов из реестра и для каждого создаем проект в старте, в старте проекты создаются по имени */
        for (const reestrProject of reestrProjects) {
            // Проверяем есть ли проект в базе реестра  и в старте одновременно, если да то сначала получаем проект из Старта чтобы 
            // не затереть уже заполненные поля и дополняем только не заполнеными            
            const reestrProjectName = reestrProject.Naimenovanie? reestrProject.Naimenovanie : ''
            const check = s0_startProjects.filter(p=>p.name == reestrProjectName)
           // console.log(check)
            if (check?.length > 0) { // если проект есть
              const project = check[0]
              const projectId = project.id? project.id : ''
              // Получаем кастомные поля проекта индивидуальным запросом, так как как они не отдаются общим запросом,
              const projectData = await api_Start.getProjectByID(token, projectId);
              // Делаем бэкап маппинга тех проектов которые есть c таким именем в реестре
              const saveData = getImportData(projectData)
              // Предварительно обрабатываем маппинг проекта так чтобы отключить синхронизацию у всех полей которые уже являются заполенными в старте  
              const unsyncSaveData = getUnsyncMapping(saveData)
              const fileName = path.join('import', projectId);        
              await dbFile.writeFileJSON(fileName, unsyncSaveData, true)
              // После сохранения маппинга сразу же проводим процедуру апдейта из реестра и таким образом заполним поля у которых синхронизация не отключена
              const result = await this.updateProject(token, project, reestrProjects, dropDownFields, owners, managers, personal_2012)    
              // так как стандартная процедура апдейта отключит синхронизацию, то нужно включить для полей полученых из реестра еще раз
              const thisProjectMapping =  await dbFile.readFileJSON(fileName)
             // console.log(thisProjectMapping, unsyncSaveData)
              const reSyncSaveData = getReSyncMapping(thisProjectMapping, unsyncSaveData)
              await dbFile.writeFileJSON(fileName, reSyncSaveData, true)
              
            } else { // если такого проекта нет то просто создаем новый
              const name = reestrProject.Naimenovanie
              const comment = ''
              const _ownersStr = getOwners(reestrProject, owners, personal_2012)
              const _managersStr = getManagers(reestrProject, managers, personal_2012)   
              const customInformation = getFieldsMap(reestrProject, _managersStr, _ownersStr);    
              const specificationsIds = getSpecificationsIdsFromStart(reestrProject, dropDownFields)
              const data = {
                name, 
                comment, 
                customInformation, 
                specificationsIds
              }
              /** Создаем в старте проект */
              //console.log(data)
              const result = await api_Start.addProject(token, data)
              /** Узнаем его ID */
              let s1_startProjects = await api_Start.getProjects(token);
              s1_startProjects  = s1_startProjects.data
              const _s1_startProjects = s1_startProjects.filter(p=>p.name == name)

              if (_s1_startProjects.length>0) { // если проект сохранился то делаем его маппинг
                const thisProjectInStart = _s1_startProjects[0]
                const projectId = thisProjectInStart.id? thisProjectInStart.id : ''
                // Получаем кастомные поля проекта индивидуальным запросом, так как как они не отдаются общим запросом,
                const projectData = await api_Start.getProjectByID(token, projectId);
                // Делаем бэкап маппинга тех проектов которые есть c таким именем в реестре
                const saveData = getImportData(projectData)
                const fileName = path.join('import', projectId);        
                await dbFile.writeFileJSON(fileName, saveData, true)
              } else {
                console.log(`Проект с именем: ${name} не найден в АС "Старт"`)
              }
            }
        }
        /** Сохраняем дату импорта от нее будет отталкиваться дата следующей синхронизации*/
        await dbFile.writeFile('lastSyncDate', String(new Date()))       
        
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }

     /** Функция для переодического вызова функции синхронизации всех проектов */
    async autoSync(){
        let polling_time = config.get("api_check_sync_period") * 1000;;
        /** Если синхронизация не выполняется в данный момент то запускаем */
        if (!syncOn) {
            syncOn = true;  
            const result = await this.updateProjects();
           // console.log(result);
            syncOn = false;
        }        
        /** Устанавливаем время следующего вызова */
        setTimeout(()=>{
            this.autoSync();
        }, polling_time );
        this.blue(`sync_interval: ${config.get("api_sync_period")} seconds`);
    }
}

module.exports = new StartLogic();