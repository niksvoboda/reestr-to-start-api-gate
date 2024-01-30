const Log       = require("../components/log.js");
const puppeteer = require('puppeteer');
const config    = require("config");



class feth_Pages extends Log {     
    name = "feth_Pages";    
    async fetchPageAndResources(token, url) {
        try {
            const browser = await puppeteer.launch({
                headless: "new", // Указывает на использование нового режима без головы
                ignoreHTTPSErrors: true, // Игнорировать все ошибки HTTPS
            });
            const page = await browser.newPage();    
            // Настройка заголовков для запроса
            await page.setExtraHTTPHeaders({
                'Authorization': `Bearer ${token}`, // Используйте ваш токен здесь
                'Content-Type': 'application/json; charset=UTF-8',
            });   
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ждать, пока сетевые соединения не прекратятся
            });    
            // Действия после загрузки страницы, например, получение HTML
            const pageContent = await page.content();
            // Закрыть браузер
            await browser.close();
            return pageContent
        } catch (error) {
            console.error(`Ошибка при загрузке страницы: ${error.message}`);
        }
    }

    async fetchPageAndResources_2(token, url) {
        try {
            const browser = await puppeteer.launch({
                headless: true, // Обычно для автоматизации задач используется режим 'true'
                ignoreHTTPSErrors: true, // Игнорировать все ошибки HTTPS
            });
            const page = await browser.newPage();
            // Настройка заголовков для запроса
            await page.setExtraHTTPHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=UTF-8',
            });
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ждём, когда сетевые соединения прекратятся
            });
    
            // Проверяем, есть ли предупреждение на странице
            const isWarningPresent = await page.evaluate(() => {
                const warningText = "Я понимаю риск и хочу"; // Текст, который можем искать в предупреждении
                let warningEl = Array.from(document.querySelectorAll('p')).find(p => p.innerText.includes(warningText));
                if (warningEl) {
                    warningEl.querySelector('a').click(); // Клик по ссылке, если нашли предупреждение
                    return true;
                }
                return false;
            });
    
            // Если было выполнено перенаправление, дождитесь загрузки новой страницы
            if (isWarningPresent) {
                // Можно использовать другие варианты waitUntil в зависимости от нужной надежности
                await page.waitForNavigation({ waitUntil: 'networkidle0' });
            }
    
            // Действия после загрузки страницы, например, получение HTML
            const pageContent = await page.content(); // Получаем содержание страницы
            // Закрыть браузер
            await browser.close();
            return pageContent;
        } catch (error) {
            console.error(`Ошибка при загрузке страницы: ${error.message}`);
        }
    }
    async  fetchPageAndResources_3(token, url, login, password) {
        try {
            const browser = await puppeteer.launch({
                headless: "new", // Указывает на использование нового режима без головы
                ignoreHTTPSErrors: true,
            });
            const page = await browser.newPage();
            // Настройка заголовков для запроса
            await page.setExtraHTTPHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=UTF-8',
            });
            // Переход на страницу
            await page.goto(url, { waitUntil: 'networkidle2' });
            
            // Проверяем, есть ли элемент с текстом "Войти в систему"
            const isLoginPage = await page.evaluate(() => document.body.innerHTML.includes("Войти в систему"));
            
            if (isLoginPage) {
                // Заполняем форму логина и пароля и отправляем её
                await page.type('input#email', login);
                await page.type('input#password', password);
                await page.click('button[type="submit"]');
                
                // Дожидаемся перехода после отправки формы, это может потребовать кастомной логики
                await page.waitForNavigation({ waitUntil: 'networkidle0' });
            }
    
            // После входа или если страница логина не была обнаружена,
            // выполнить основные действия, например, получить содержимое страницы
            const pageContent = await page.content();
            
            // Закрыть браузер
            await browser.close();
            
            return pageContent;
        } catch (error) {
            console.error(`Ошибка при загрузке страницы: ${error.message}`);
        }
    }
}

module.exports =  new feth_Pages();