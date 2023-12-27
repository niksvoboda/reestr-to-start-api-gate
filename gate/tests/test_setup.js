const StartLogic = require('../service/StartLogic');
const api_Start  = require('../http/api_Start')
const path          = require('path');

const dbFile        = require("../components/db_File.js");

const start = async ()=>{
     // Получаем ID категорий заданных в базовом шаблоне
     const token = await api_Start.getAuthToken();
     const _specificationIdsCategory = await api_Start.getSpecificationIdsCategory(token); 
  
     const fileNameCategory = path.join('setup', "_specificationIdsCategory");        
     await dbFile.writeFileJSON(fileNameCategory, _specificationIdsCategory)

     const _specificationIds = await api_Start.getSpecificationIds(token);
     const fileNameIds = path.join('setup', "_specificationIds");        
     await dbFile.writeFileJSON(fileNameIds, _specificationIds)
  // console.log('customInformation',JSON.stringify(result.data[0].customInformation))
  // console.log('statusValueData',JSON.stringify(result.data[0].statusValueData))

}

start();

//StartLogic.createProject();