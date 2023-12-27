const StartLogic = require('./service/StartLogic');

const start = async ()=>{
      const result = await StartLogic.deleteProjects();
}

start();