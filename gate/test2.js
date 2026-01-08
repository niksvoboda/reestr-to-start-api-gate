const StartLogic = require('./service/StartLogic.js');
const api_Start  = require('./http/api_Start.js')
const path          = require('path');

const dbFile        = require("./components/db_File.js");

const start = async ()=>{
     
     const token = await api_Start.getAuthToken();
     console.log(token)
     // Получаем информацию о всех категориях
     const _specificationIdsCategory = await api_Start.getSpecificationIdsCategory(token);
     const fileNameCategory = path.join('setup', "_specificationIdsCategory");        
     await dbFile.writeFileJSON(fileNameCategory, _specificationIdsCategory)
     // Получаем информацию о всех полях во всех категорях
     const _specificationIds = await api_Start.getSpecificationIds(token);
     const fileNameIds = path.join('setup', "_specificationIds");        
     await dbFile.writeFileJSON(fileNameIds, _specificationIds)

     let projectData = await api_Start.getProjectByID(token, "b2223464-eebc-4ee6-b71a-a1b98d7b7614");  
     await dbFile.writeFileJSON('setup', projectData)

     process.exit(0)
}

start();

//StartLogic.createProject();