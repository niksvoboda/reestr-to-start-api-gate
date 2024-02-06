const StartLogic = require('./service/StartLogic');
const config     = require("config");

const start = async ()=>{
     const result = await StartLogic.getProjects();

     setTimeout(async () => {
          await start ()
     }, config.get("timeout"));
}

start();