const StartLogic = require('../service/StartLogic');
const api_Start  = require('../http/api_Start')

const start = async ()=>{
    const token = await api_Start.getAuthToken();   
    const _name = 'Система DiasoftBank 4*4'
    const _comment = ''
    const _customInformation = {"fields":[{"type":"multiline","value":"dasdfas","fieldName":"1. Полные наименования автоматизируемых процессов с указанием их кодов","sortIndex":1,"fieldDescription":""},{"type":"multiline","value":"adsfasdfasd","fieldName":"2. Наименования этапов процессов с указанием их кодов","sortIndex":2,"fieldDescription":""},{"type":"multiline","value":"asdfasdf","fieldName":"4. a. Полное название автоматизированной системы (АС)","sortIndex":3,"fieldDescription":""},{"type":"multiline","value":"asdfasdf","fieldName":"b. Краткое название АС","sortIndex":4,"fieldDescription":""},{"type":"multiline","value":"asdfasdf","fieldName":"c. Номер АС в Реестре АС","sortIndex":5,"fieldDescription":""},{"type":"multiline","value":"asdfasdf","fieldName":"5. Назначение АС, перечень выполняемых ей функций","sortIndex":6,"fieldDescription":""},{"type":"multiline","value":"Иванов - заказчик","fieldName":"6. Заказчик АС","sortIndex":7,"fieldDescription":""},{"type":"multiline","value":"Петров - владелец","fieldName":"7. Владелец АС","sortIndex":8,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"В АС планируется взаимодействие со следующими АС:","sortIndex":9,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"a. Способ ввода информации в АС:","sortIndex":10,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"b. Получатели информации из АС","sortIndex":11,"fieldDescription":""},{"type":"multiline","value":"","fieldName":"16. (J). Дополнительные условия/ограничения/требования Заказчика АС к проектируемой АС","sortIndex":12,"fieldDescription":""}]}
    const result = await api_Start.addProjects(token, _name, _comment, _customInformation);
  //  const result = await api_Start.getProjectByID(token, '5382cc3a-cef9-4eca-9323-d4ed14cbd908');
  //  console.log(result)
  //  console.log('specificationsIds',JSON.stringify(result.data[0].specificationsIds))
  //  console.log('customInformation',JSON.stringify(result.data[0].customInformation))
  //  console.log('statusValueData',JSON.stringify(result.data[0].statusValueData))

}

start();

//StartLogic.createProject();