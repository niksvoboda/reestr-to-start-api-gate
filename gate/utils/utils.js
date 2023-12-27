
const dbFile        = require("../components/db_File.js");
/**
 * 
 * @param {*} startProject 
 * @returns 
 * возвращаем объект для сохранения в бэкапфайл
 */
const getImportData = (startProject) => {
    try {
       const data = startProject?.data[0];
       const customInformation = data.customInformation ? data.customInformation : {
          fields: []
       }
       const specificationsIds = data.specificationsIds ? data.specificationsIds : []
 
       const saveData = {
          id: data.id,
          name: data.name,
          specificationsIds: specificationsIds,
          specificationsIdsSync: true,
          customInformation: customInformation.fields.map(p => p = {
             ...p,
             sync: true
          })
       }
       return saveData
    } catch (error) {
       console.log(error)
       return {
          error: 'getImportData'
       }
    }
 }
 const getSpecificationsIdsFromStart = (reestrProject, dropDownFields)=>{
   try {
      //console.log(reestrProject, dropDownFields)
      let specificationsIds = []
      for (const dropDownField of dropDownFields) {
         const idsNames = dropDownField?.idsNames? dropDownField?.idsNames : []
         const textValueFromReestr = reestrProject[dropDownField.nameReestr]? reestrProject[dropDownField.nameReestr] : ''
         for (const idsName of idsNames) {
            const searchTextValueInReestr = idsName?.reestr? idsName?.reestr : ''
            // Ищем указанное в базовом шаблоне в маппинге выпадающих полей текстовое  значение в данных реестра
            // Если есть до добавляем его ID в итоговый массив specificationsIds
            if(textValueFromReestr.includes(searchTextValueInReestr)){
               specificationsIds.push(idsName?.id)
            }
         }
      }
      return specificationsIds;
   } catch (error) {
      console.log(error)
      return [];
   }
 }
 const getOwners = (reestrProject, owners, personal_2012) => {
   try {
      let result = []
      //console.log(reestrProject, owners, personal_2012)
      // Получаем ID всех овнеров по uniq_id проекта
      const ownersIDs = owners.filter(p=>p.reestr_as_id == reestrProject.uniq_id)
      for (const ownersID of ownersIDs) {
         // Для каждого ID овнера получаем ФИО из таблицы personal_2012
         const personal_2012_fio = personal_2012.filter(p=>p.rowid == ownersID.boss_id)[0]
        // console.log(personal_2012_fio)
         result.push(personal_2012_fio.fio)
      }
      //console.log(result)
      result = [...new Set(result)]
      result = result.join(',')
      return result
   } catch (error) {
      console.log(error)
      return {
         error: 'getOwners'
      }
   }
}
const getManagers = (reestrProject, managers, personal_2012) => {
   try {
      let result = []
      // console.log(reestrProject, managers, personal_2012)
      // Получаем ID всех овнеров по uniq_id проекта
      const managersIDs = managers.filter(p=>p.id_reestr_abs == reestrProject.uniq_id)
      //console.log(managersIDs)
      for (const managerID of managersIDs) {
         // Для каждого ID овнера получаем ФИО из таблицы personal_2012
         const personal_2012_fio = personal_2012.filter(p=>p.rowid == managerID.id_PERSONAL_2012)[0]
        // console.log(personal_2012_fio)
         result.push(personal_2012_fio.fio)
      }
      //console.log(result)
      result = [...new Set(result)]
      result = result.join(',')
      return result
   } catch (error) {
      console.log(error)
      return {
         error: 'getManagers'
      }
   }
}

/** Функция для проверки соотвествия массивов  specificationsIds 😉 */ 
function arraysAreEqual(array1, array2) {
   // Сначала проверяем одинаковую ли длину имеют массивы
   if (array1.length !== array2.length) {
     return false;
   }  
   // Проверяем соответствие всех элементов массивов
   for (let i = 0; i < array1.length; i++) {
     for (let j = 0; j < array2.length; j++) {

        const search_element = array1.filter(p=>p==array2[j])
       // console.log('search_element', search_element)
        if (search_element.length < 1) {
           return false; // Если такой элемент не найден 
         }
     }    
   }    
   // Если все проверки пройдены, массивы одинаковы
   return true;
 }
  /** Функция для получения актуальных для синхронизации specificationsIds, сравнивает бэкап, поля в старте и реестре */
  function compareIds(backupIds, currentIds, specificationsIdsFromStart){
      let resultIdsArr = []
      let syncIdsFlag = true
      const compareBackupAndStart = arraysAreEqual(backupIds, currentIds)
      const compareBackupAndReestr = arraysAreEqual(backupIds, specificationsIdsFromStart)
      if (compareBackupAndStart == true && compareBackupAndReestr == true) {
         resultIdsArr = backupIds
      } else if(compareBackupAndStart == true  && compareBackupAndReestr == false) {
         resultIdsArr = specificationsIdsFromStart
         syncIdsFlag = false
      } else if(compareBackupAndStart == false && compareBackupAndReestr == true) {
         resultIdsArr = currentIds
         syncIdsFlag = false
      } else if(compareBackupAndStart == false && compareBackupAndReestr == false) {
         resultIdsArr = currentIds
         syncIdsFlag = false
      }
      return { resultIdsArr, syncIdsFlag };
  }
 /** Функция для получения актуальных для синхронизации customInformation, сравнивает бэкап, поля в старте и реестре */
 function compareCustomFields(backupCustomFields, currentCustomFields, reestrCustomFields){
   const arr1 = backupCustomFields
   const arr2 = currentCustomFields
   const arr3 = reestrCustomFields

   // Функция для получения актуального маппинга путем сравнения бэкапа и записей в старте
   const updateSyncStatus = (arr1, arr2) => {
      // Создаем копию первого массива, чтобы не мутировать оригинальный
      const updatedArr1 = JSON.parse(JSON.stringify(arr1));    
      // Проходим по каждому элементу второго массива
      arr2.forEach((item2) => {
        // Находим соответствующий элемент в первом массиве по fieldName
        const item1 = updatedArr1.find(item => item.fieldName === item2.fieldName);            
        // Если нашелся элемент и поле value различается, устанавливаем sync в false
        if (item1 && item1.value !== item2.value) {
          item1.sync = false;
        }
      });    
      return updatedArr1;
    };   
    
    function syncAndUpdate(arr1, arr2, arr3) {
      // Создаем копии первого и второго массива, чтобы не изменять исходные данные
      const updatedArr1 = JSON.parse(JSON.stringify(arr1));
      const updatedArr2 = JSON.parse(JSON.stringify(arr2));
    
      // Итерация по элементам третьего массива
      arr3.forEach((item3) => {
        // Находим соответствующие элементы в первом и втором массиве
        const item1 = updatedArr1.find(item => item.fieldName === item3.fieldName);
        const item2 = updatedArr2.find(item => item.fieldName === item3.fieldName);
    
       // Если элементы найдены и значение value отличается во втором и третьем массивах, обновляем их
       // если маппинг позволяет и значение в Реестре отличается от старта, а в старте не отличается от бэкапа(это мы установили флагом sync оставив его в true на прошлом шаге)
        if (item1 && item2 && item2.value !== item3.value && item1.sync == true) {
          item1.sync = false;  // Устанавливаем sync как false в первом массиве
          item2.value = item3.value;  // Обновляем value во втором массиве
        }
      });    
      // Возвращаем модифицированные первый и второй массивы
      const actualCustomFieldsMapping = JSON.parse(JSON.stringify(updatedArr1));
      const actualCustomFields = JSON.parse(JSON.stringify(updatedArr2));
      return { actualCustomFieldsMapping, actualCustomFields };
    }

    // Сравниваем бэкап и записи в старте чтобы получить актуальный маппинг для синхронизации с реестром:
    const updatedArr1 = updateSyncStatus(arr1, arr2);
    // Сравниваем полученный актуальный маппинг и элементы Старта и Реестра, 
    // если маппинг позволяет и значение в Реестре отличается от бэкапа а старте нет(это мы установили флагом sync оставив его в true на прошлом шаге)
    const { actualCustomFieldsMapping, actualCustomFields } = syncAndUpdate(updatedArr1, arr2, arr3);
   
    return { actualCustomFieldsMapping, actualCustomFields };
    // Вызываем
    //console.log(modifiedArr1);
    
 }
 /** Производим сравнение по заданной логике: 
  * 1) Если поле менялось первый раз в реестре, а в старте еще не менялось то импортируем данные из реестра в старт и отключаем дальнейшуюю синхронизацию 
  * 2) Если поле уже менялось в старте то отключаем синхронизацию и ничего не импортируем, оставляем актуальные данные из старта
  * Формируем объект для отправки по апи в Старт
  */
const getUpdateData = async (startProjectFromByID, project, customInformationFromReestr, mappingProject, specificationsIdsFromStart, _ownersStr, _managersStr) => {   
    try {
      let updateProjectFlag = true; // флаг отдаем из функции для того чтобы перезаписывать или не перезаписывать маппинг
      let newMappingProject = JSON.parse(JSON.stringify(mappingProject)); // создаем новый маппинг      
       const data = startProjectFromByID?.data[0]; // Актуальные данные проекта
       const data_2 = project // Нехватающие актуальные данные из общего списка проектов
       //console.log(data_2)
       //console.log(specificationsIdsFromStart)
       // Проверяем соотвествие выпадающих полей specificationsIds в маппинге и в текущем состоянии проекта
       // Для этого сравниваем массивы 
       const backupIds  = mappingProject.specificationsIds
       const currentIds = data.specificationsIds
       // Если в результате сравнения трех источников были выявлены отличия specificationsIds то отключаем флаг синхронизации и в результирующий массив идет значение из Старта 
       // если флаг уже был отключен либо реестра если флаг был включен и значение в старте было такое же как в бэкапе а в реестре нет
       const { resultIdsArr, syncIdsFlag }  = compareIds(backupIds, currentIds, specificationsIdsFromStart)      
       if(syncIdsFlag != true) newMappingProject.specificationsIdsSync = false
       //console.log(resultIdsArr, syncIdsFlag)
       // Работаем с кастомными текстовыми полями
       const backupCustomFields  = mappingProject.customInformation
       const currentCustomFields = data.customInformation.fields
       const reestrCustomFields = customInformationFromReestr.fields

      // const fileName = 'test_info'
      // const ___data = [backupCustomFields, currentCustomFields, reestrCustomFields]
      // const info =  await dbFile.writeFileJSON(fileName, ___data)

       const { actualCustomFieldsMapping, actualCustomFields } = compareCustomFields(backupCustomFields, currentCustomFields, reestrCustomFields)
       newMappingProject.customInformation = actualCustomFieldsMapping
      // const fileName2 = 'test_info2'
      // const ___data2 = [actualCustomFieldsMapping, actualCustomFields]
      // const info2 =  await dbFile.writeFileJSON(fileName2, ___data2)
      // Узнаем нужно ли перезаписывать файл синхронизации и выполнять запрос к апи для апдейта проекта
      if(JSON.stringify(mappingProject)!= JSON.stringify(newMappingProject)) {
       //  console.log('маппинги отличаются')        
      } else {
        // console.log('маппинги идентичны')
         updateProjectFlag = false;
      }

       const updateData = {
        name:               data.name,
        codeName:           data_2.codeName,
        rolesMapDate:       data_2.rolesMap,
        jiraLink:           data_2.jiraLink,
        comment:            data_2.comment,
        specificationsIds:  resultIdsArr,
        performerTypeId:    data.performerTypeId,
        customInformation:  {fields: actualCustomFields? actualCustomFields : []},
        templateId:         data.templateId,
       }
       return {updateData, newMappingProject, updateProjectFlag}
    } catch (error) {
       console.log(error)
       return {
          error: 'getUpdateData'
       }
    }
 }
 
 module.exports = {
    getImportData,
    getUpdateData,
    getSpecificationsIdsFromStart,
    getManagers,
    getOwners
 }