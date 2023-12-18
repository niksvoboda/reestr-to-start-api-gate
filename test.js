const StartLogic = require('./service/StartLogic');
const api_Start  = require('./http/api_Start')


const start = async ()=>{

    const token = await api_Start.getAuthToken();   
//    const result = await api_Start.addProjects(token, 'update');
const result = await api_Start.getProjectByID(token, '5382cc3a-cef9-4eca-9323-d4ed14cbd908');
//   const result = await api_Start.getProjectForUser(token, '5382cc3a-cef9-4eca-9323-d4ed14cbd908');
   console.log(result)
  // console.log('fieldsMap',JSON.stringify(result.fieldsMap))
  // console.log('specificationsIds',JSON.stringify(result.data[0].specificationsIds))
  // console.log('customInformation',JSON.stringify(result.data[0].customInformation))
  // console.log('statusValueData',JSON.stringify(result.data[0].statusValueData))

}

start();

//StartLogic.createProject();