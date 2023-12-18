
const getFieldsMap = (update) =>{
   const fieldsMap = {
      "fields": [
         {
            "type": "multiline",
            "value": `${update.field_1}`,
            "fieldName": "1. Полные наименования автоматизируемых процессов с указанием их кодов",
            "sortIndex": 1,
            "fieldDescription": ""
         },
         {
            "type": "multiline",
            "value": `${update.field_2}`,
            "fieldName": "2. Наименования этапов процессов с указанием их кодов",
            "sortIndex": 2,
            "fieldDescription": ""
         },
         {
            "type": "multiline",
            "value": `${update.field_3}`,
            "fieldName": "4. a. Полное название автоматизированной системы (АС)",
            "sortIndex": 3,
            "fieldDescription": ""
         },
         {  
            "type": "multiline",
            "value": `${update.field_4}`,
            "fieldName": "b. Краткое название АС",
            "sortIndex": 4,
            "fieldDescription": ""
         },
         {
            "type": "multiline",
            "value": `${update.field_5}`,
            "fieldName": "c. Номер АС в Реестре АС",
            "sortIndex": 5,
            "fieldDescription": ""
         },
         {  
            "type": "multiline",
            "value": `${update.field_6}`,
            "fieldName": "5. Назначение АС, перечень выполняемых ей функций",                    
            "sortIndex": 6,
            "fieldDescription": ""
         },
         {  
            "type": "multiline",
            "value": `${update.field_7}`,
            "fieldName": "6. Заказчик АС",
            "sortIndex": 7,
            "fieldDescription": ""
         },
         {
            "type": "multiline",
            "value": `${update.field_8}`,
            "fieldName": "7. Владелец АС",
            "sortIndex": 8,
            "fieldDescription": ""
         },
         {  
            "type": "multiline",
            "value": `${update.field_9}`,
            "fieldName": "В АС планируется взаимодействие со следующими АС:",
            "sortIndex": 9,
            "fieldDescription": ""
         },
         {
            "type": "multiline",
            "value": `${update.field_10}`,
            "fieldName": "a. Способ ввода информации в АС:",
            "sortIndex": 10,
            "fieldDescription": ""
         },
         {  
            "type": "multiline",
            "value": `${update.field_11}`,
            "fieldName": "b. Получатели информации из АС",
            "sortIndex": 11,
            "fieldDescription": ""
         },
         {  
            "type": "multiline",
            "value": `${update.field_12}`,
            "fieldName": "16. (J). Дополнительные условия/ограничения/требования Заказчика АС к проектируемой АС",
            "sortIndex": 12,
            "fieldDescription": ""
         }
      ]
   }
}

 module.exports ={
    getFieldsMap
 }