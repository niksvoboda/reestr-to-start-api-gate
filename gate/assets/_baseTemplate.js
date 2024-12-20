
const getFieldsMap = (reestrProject, _managersStr, _ownersStr) =>{
   //console.log(reestrProject)
   const update = {
      field_1 : '',
      field_2 : '',
      field_3 : reestrProject.Naimenovanie,
      field_4 : reestrProject.Kratkoe_nazvanie_prilozhenie_spisok_sinonimov,
      field_5 : reestrProject.uniq_id,
      field_6 : reestrProject.Naznachenie,
      field_7 : _managersStr,
      field_8 : _ownersStr,
      field_9 : '',
      field_10 : '',
      field_11 : '',
      field_12 : '',
    }
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
            "fieldName": "В АС планируется взаимодействие со следующими АС",
            "sortIndex": 9,
            "fieldDescription": ""
         },
         {
            "type": "multiline",
            "value": `${update.field_10}`,
            "fieldName": "a. Способ ввода информации в АС",
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
   return fieldsMap
}
/**
 * nameStart - имя выпадающего поля в вебинтерфейсе "Старта"
 * nameReestr - столбец в таблице в бд "Реестра"
 * idsNames.start - текстовое имя значения в вебинтерфейсе "Старта"
 * idsNames.reestr - текстовое значение которое искать в столбце таблицы АС в бд "Реестра"
 */

const dropDownFields = [
   {
     nameStart: "Принадлежность АС к контуру PCI DSS", 
     nameReestr: "standart_contur",
     idsNames: [
       {start: "Да", reestr: "DSS"}
     ]
   },
   {
     nameStart: "Категории обрабатываемой в АС информации", 
     nameReestr: "Type_confidentiality",
     idsNames: [
       {start: "(B1) Открытая информация (ОИ)", reestr: "Открытая информация"},
       {start: "(B2) Информация категории «Коммерческая тайна» (КТ)", reestr: "Коммерческая тайна"},
       {start: "(B3) Информация категории «Банковская тайна» (БТ)", reestr: "Банковская тайна"},
       {start: "(B4) Информация категории «Конфиденциально»", reestr: "Конфиденциально"},
       {start: "(B5) Персональные данные", reestr: "Персональные данные"}
     ]
   }
 ]


 module.exports ={
    getFieldsMap,
    dropDownFields
 }