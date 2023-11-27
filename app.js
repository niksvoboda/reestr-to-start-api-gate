
const config        = require("config");
const fs            = require("fs");
const path          = require("path");
const app           = express();
const Log           = require("./components/log");
const Sync_Scaner   = require('./components/sync_scaner');

class App extends Log {
  name = "App"
  constructor(app){
      super();
      this.app = app;
      this.showSplash();
     // this.startSyncScaner();  
  }
  startSyncScaner(){
    Sync_Scaner.autoSyncCharges()
  }
  showSplash() {
      const splash = [
          "\n", '-'.repeat(80),
          'Запуск системы ' + config.get("version"),
          '-'.repeat(80)
      ];
      splash.forEach(line => this.yellow(':'+line));
  }
}

new App(app);