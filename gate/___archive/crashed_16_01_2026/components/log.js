
let enable = true;
try {
  const config = require("config");
  enable = config.get("log.console") === true;
} catch {
  // модуля config может не быть — тогда считаем, что логирование включено
}

const { performance } = require("perf_hooks");

// Набор ANSI-кодов
const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  colors: {
    greenBright: "\x1b[92m",
    yellowBright: "\x1b[93m",
    blueBright: "\x1b[94m",
    redBright: "\x1b[91m",
  },
};

// Хелпер для окраски и стилизации
function paint(str, ...styles) {
  const open = styles.join("");
  const close = ANSI.reset;
  return open + str + close;
}

/**
 * Класс для логирования в консоль из кода
 */
class Log {
  /**
   * @param {string} name Имя класса/модуля, откуда идёт вывод
   */
  constructor(name = "Log") {
    this.name = name;
  }

  green(msg = "") {
    if (!enable) return;
    console.log(
      paint(`${this._prefix()}${msg}`, ANSI.colors.greenBright)
    );
  }

  yellow(msg = "") {
    if (!enable) return;
    console.log(
      paint(`${this._prefix()}${msg}`, ANSI.colors.yellowBright)
    );
  }

  blue(msg = "") {
    if (!enable) return;
    console.log(
      paint(`${this._prefix()}${msg}`, ANSI.colors.blueBright)
    );
  }

  error(msg = "") {
    if (!enable) return;
    console.log(
      paint(`${this._prefix()}${msg}`, ANSI.bold, ANSI.colors.redBright)
    );
  }

  test() {
    console.log("test");
  }

  perf_start() {
    return performance.now(); // Момент начала
  }

  perf_end(start, msg = "") {
    const end = performance.now(); // Момент окончания
    const duration = end - start; // Время выполнения в миллисекундах
    this.blue(`${msg} ${duration.toFixed(2)} ms`);
  }

  _prefix() {
    return this.name ? `${this.name}.` : "";
  }
}

module.exports = Log;