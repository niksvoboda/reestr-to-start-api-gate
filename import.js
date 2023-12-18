const StartLogic = require('./service/StartLogic');

const start = async ()=>{ 
    const result = await StartLogic.importProjects();
    if (result) {
        console.log('Импорт произведен')
    } else {
        console.log('Импорт завершился с ошибкой')
    }
}

start();