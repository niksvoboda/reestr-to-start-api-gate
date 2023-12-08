
const config        = require("config");
const fs            = require("fs");
const path          = require("path");
const Log           = require("./components/log");
const Sync_Scaner   = require('./components/sync_Scaner');

class App extends Log {
  name = "App"
  constructor(){
      super();
      this.showSplash();
      this.startSyncScaner();  
  }
  startSyncScaner(){
    Sync_Scaner.autoSyncCharges()
  }
  showSplash() {
      const splash = [
          "\n", '-'.repeat(80),
          'Запуск системы синхронизации ' + config.get("version"),
          '-'.repeat(80)
      ];
      splash.forEach(line => this.yellow(' '+line));
  }
}

new App();