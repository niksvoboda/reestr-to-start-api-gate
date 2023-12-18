-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 16 2023 г., 14:01
-- Версия сервера: 5.7.25
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `start_to_reestr`
--

-- --------------------------------------------------------

--
-- Структура таблицы `v_personal_2012`
--

CREATE TABLE `v_personal_2012` (
  `Prim2` int(11) NOT NULL,
  `Rowid` int(11) NOT NULL,
  `Fio` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `v_personal_2012`
--

INSERT INTO `v_personal_2012` (`Prim2`, `Rowid`, `Fio`) VALUES
(1, 1, 'Иванов Иван Иванович'),
(2, 2, 'Петров Петр Петрович'),
(3, 3, 'Сидоров Сидор Сидорович'),
(4, 4, 'Алексеев Алексей Алексеевич'),
(5, 5, 'Николаев Николай Николаевич'),
(6, 6, 'Михайлов Михаил Михайлович'),
(7, 7, 'Андреев Андрей Андреевич'),
(8, 8, 'Дмитриев Дмитрий Дмитриевич'),
(9, 9, 'Егоров Егор Егорович'),
(10, 10, 'Викторов Виктор Викторович');

-- --------------------------------------------------------

--
-- Структура таблицы `v_reestr_as_asup`
--

CREATE TABLE `v_reestr_as_asup` (
  `uniq_id` int(11) NOT NULL,
  `Naimenovanie` varchar(512) DEFAULT NULL,
  `Naznachenie` varchar(512) NOT NULL,
  `Dopolnitelnye_usloviya` varchar(512) DEFAULT NULL,
  `type_confidentiality` varchar(512) DEFAULT NULL,
  `standart_contur` varchar(512) DEFAULT NULL,
  `Adres_v_VSS_gde_nahoditsya_opisanie_interfeysov_i_sami_shablony_` varchar(512) DEFAULT NULL,
  `Kompaniya_Proizvoditel_esli_pokupnaya_Upravlenie_Otdel_esli_sobs` varchar(512) DEFAULT NULL,
  `Rezhim_raboty_8h5_24h5_24h6_24h7_24h7` varchar(512) DEFAULT NULL,
  `Kritich_time` varchar(512) DEFAULT NULL,
  `Mnemokod` varchar(512) DEFAULT NULL,
  `Podryadchik_po_podderzhke` varchar(512) DEFAULT NULL,
  `Postavwik` varchar(512) DEFAULT NULL,
  `Kritich_as` varchar(512) DEFAULT NULL,
  `Kratkoe_nazvanie_prilozhenie_spisok_sinonimov` varchar(512) DEFAULT NULL,
  `Sys_sourse` varchar(512) DEFAULT NULL,
  `Adres_sistemy_registracii_problem_parametry_vhoda_dlya_chteniya` varchar(512) DEFAULT NULL,
  `It_koordinator` varchar(512) DEFAULT NULL,
  `Business_koordinator` varchar(512) DEFAULT NULL,
  `Res16` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `v_reestr_as_asup`
--

INSERT INTO `v_reestr_as_asup` (`uniq_id`, `Naimenovanie`, `Naznachenie`, `Dopolnitelnye_usloviya`, `type_confidentiality`, `standart_contur`, `Adres_v_VSS_gde_nahoditsya_opisanie_interfeysov_i_sami_shablony_`, `Kompaniya_Proizvoditel_esli_pokupnaya_Upravlenie_Otdel_esli_sobs`, `Rezhim_raboty_8h5_24h5_24h6_24h7_24h7`, `Kritich_time`, `Mnemokod`, `Podryadchik_po_podderzhke`, `Postavwik`, `Kritich_as`, `Kratkoe_nazvanie_prilozhenie_spisok_sinonimov`, `Sys_sourse`, `Adres_sistemy_registracii_problem_parametry_vhoda_dlya_chteniya`, `It_koordinator`, `Business_koordinator`, `Res16`) VALUES
(1, 'Система управления документооборотом', 'Обработка внутренней документации', 'Только для внутреннего использования', 'Высокий', 'Стандартный', 'http://example.com/description', 'Компания \"Разработчик\"', '24h7', '01:00 - 03:00', 'DOCUMGR', 'ООО \"Поддержка IT\"', 'ЗАО \"ПоставщикСофт\"', 'Низкий', 'DocManage', 'Внутренняя', 'http://example.com/support', 'Иванов Иван Иванович', 'Петров Петр Петрович', 'Дополнительные ресурсы'),
(2, 'CRM система', 'Управление взаимоотношениями с клиентами', 'Доступ для отдела продаж', 'Средний', 'Внешний', 'http://example.com/crm/description', 'CRM Solutions Inc.', '8h5', '09:00 - 11:00', 'CRM', 'ООО \"CRM Support\"', 'CRM Tech Supplier', 'Средний', 'CustomerHub', 'Клиентская', 'http://example.com/crm/support', 'Смирнов Алексей Владимирович', 'Иванова Светлана Игоревна', 'CRМ ресурсы'),
(3, 'HRM система', 'Управление человеческими ресурсами', 'Ограниченный доступ HR', 'Высокий', 'Локальный', 'http://example.com/hrm/description', 'HRM Global Inc.', '24h5', '14:00 - 16:00', 'HRMGR', 'HR Solutions Ltd.', 'Workforce Supplies LLC', 'Высокий', 'HRManager', 'Внутренняя', 'http://example.com/hrm/support', 'Павлов Дмитрий Николаевич', 'Андреева Юлия Сергеевна', 'HRM ресурсы'),
(4, 'Бухгалтерская система', 'Финансовый учет', 'Только для бухгалтерии', 'Высокий', 'Закрытый', 'http://example.com/finance/description', 'FinSoft Ltd.', '8h5', '10:00 - 18:00', 'FINANCE', 'Finance Support LLC', 'FinTech Supplies Co.', 'Высокий', 'FinanceHub', 'Корпоративная', 'http://example.com/finance/support', 'Миронов Никита Игоревич', 'Григорьева Оксана Александровна', 'Финансовые ресурсы'),
(5, 'Система продаж', 'Автоматизация продаж', 'Только для отдела продаж', 'Средний', 'Глобальный', 'http://example.com/sales/description', 'SalesSoft Corporation', '24h5', '12:00 - 14:00', 'SALES', 'ООО \"Sales Support\"', 'Sales Tech Ltd.', 'Средний', 'SalesManager', 'Клиентская', 'http://example.com/sales/support', 'Макаров Максим Игоревич', 'Васильева Елена Павловна', 'Ресурсы отдела продаж'),
(6, 'Система складского учета', 'Учет запасов на складе', 'Только для складского отдела', 'Низкий', 'Внутренний', 'http://example.com/warehouse/description', 'WareSoft Corp.', '8h5', '08:00 - 17:00', 'WAREHOUSE', 'ООО \"ЛогистикаПро\"', 'Warehouse Suppliers Inc.', 'Низкий', 'WarehouseManager', 'Внутренняя', 'http://example.com/warehouse/support', 'Лебедев Сергей Викторович', 'Кузнецова Мария Васильевна', 'Складские ресурсы'),
(7, 'Система защиты информации', 'Обеспечение информационной безопасности', 'Только для IT отдела', 'Высокий', 'Критичный', 'http://example.com/security/description', 'SecureIT Tech Ltd.', '24h7', '00:00 - 24:00', 'SECUREIT', 'Security Services LLC', 'IT Security Supplies Co.', 'Высокий', 'SecureManager', 'Корпоративная', 'http://example.com/security/support', 'Сорокин Игорь Михайлович', 'Фёдорова Анна Сергеевна', 'Информационная безопасность ресурсы'),
(8, 'Система внутренней связи', 'Корпоративная связь', 'Доступ для всех сотрудников', 'Низкий', 'Многоуровневый', 'http://example.com/communication/description', 'CommuSoft LLC', '24h7', '08:00 - 20:00', 'SECUREIT', 'Security Services LLC', 'IT Security Supplies Co.', 'Высокий', 'SecureManager', 'Корпоративная', 'http://example.com/security/support', 'Сорокин Игорь Михайлович', 'Фёдорова Анна Сергеевна', 'Информационная безопасность ресурсы'),
(9, 'Бухгалтерская система', 'Финансовый учет', 'Доступ ограничен бухгалтерией', 'Средний', 'Закрытый', 'http://example.com/accounting/description', 'ООО \"БухгалтерПлюс\"', '24h5', '12:00 - 14:00', 'ACCTNG', 'ООО \"ФинСервис\"', 'ООО \"ЭкономСофт\"', 'Высокий', 'БухPlus', 'Корпоративная', 'http://example.com/accounting/support', 'Егоров Егор Егорович', 'Сергеев Сергей Сергеевич', 'Резерв3'),
(10, 'Система электронного архива', 'Хранение электронных копий документов', 'Для юридического отдела', 'Высокий', 'Локальный', 'http://example.com/archive/description', 'ООО \"АрхивПартнер\"', '24h6', '00:00 - 02:00', 'EARCHIVE', 'ООО \"ДокументСервис\"', 'ООО \"АрхивТех\"', 'Низкий', 'АрхивОнлайн', 'Внутренняя', 'http://example.com/archive/support', 'Ларионов Ларион Ларионович', 'Рябов Роман Романович', 'Резерв4'),
(11, 'Система дистанционного обучения', 'Проведение онлайн-курсов', 'Доступ для всех сотрудников', 'Низкий', 'Масштабируемый', 'http://example.com/education/description', 'ООО \"Образование+\"', '24h7', '13:00 - 15:00', 'EDUONLINE', 'ООО \"УчебаСервис\"', 'ООО \"КурсОбраз\"', 'Средний', 'УчебаОнлайн', 'Публичная', 'http://example.com/education/support', 'Киселев Виктор Валерьевич', 'Миронова Ирина Алексеевна', 'Резерв5'),
(12, 'Система заказа транспорта', 'Заказ транспортных средств для сотрудников', 'Только для логистического отдела', 'Средний', 'Гибридный', 'http://example.com/transport/description', 'Грузоперевозки Компания', '24h5', '08:00 - 10:00', 'TRANSCOM', 'ТранспортЛогистик ООО', 'Карго Софт ООО', 'Высокий', 'ТрансЛогистика', 'Внешняя', 'http://example.com/transport/support', 'Бочаров Александр Николаевич', 'Королева Марина Андреевна', 'Резерв6'),
(13, 'Система контроля качества', 'Мониторинг качества производства', 'Для отдела контроля качества', 'Высокий', 'Закрытый', 'http://example.com/quality/description', 'ООО \"Качество+\"', '24h6', '10:00 - 12:00', 'QUALCTRL', 'ООО \"Контроль Качества\"', 'ПродКонтроль', 'Низкий', 'Качество+', 'Корпоративная', 'http://example.com/quality/support', 'Аксенов Алексей Анатольевич', 'Филатова Евгения Григорьевна', 'Резерв7');

-- --------------------------------------------------------

--
-- Структура таблицы `v_reestr_as_developer`
--

CREATE TABLE `v_reestr_as_developer` (
  `Id_reestr_abs` int(11) NOT NULL,
  `Id_PERSONAL_2012` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `v_reestr_as_developer`
--

INSERT INTO `v_reestr_as_developer` (`Id_reestr_abs`, `Id_PERSONAL_2012`) VALUES
(1, 20001),
(2, 20002),
(3, 20003),
(4, 20004),
(5, 20005),
(6, 20006),
(7, 20007),
(8, 20008),
(9, 20009),
(10, 20010);

-- --------------------------------------------------------

--
-- Структура таблицы `v_reestr_as_manager`
--

CREATE TABLE `v_reestr_as_manager` (
  `Id_reestr_abs` int(11) NOT NULL,
  `Id_PERSONAL_2012` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `v_reestr_as_manager`
--

INSERT INTO `v_reestr_as_manager` (`Id_reestr_abs`, `Id_PERSONAL_2012`) VALUES
(1, 10001),
(2, 10002),
(3, 10003),
(4, 10004),
(5, 10005),
(6, 10006),
(7, 10007),
(8, 10008),
(9, 10009),
(10, 10010);

-- --------------------------------------------------------

--
-- Структура таблицы `v_reestr_as_owners`
--

CREATE TABLE `v_reestr_as_owners` (
  `boss_id` int(11) NOT NULL,
  `reestr_as_id` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `v_reestr_as_owners`
--

INSERT INTO `v_reestr_as_owners` (`boss_id`, `reestr_as_id`) VALUES
(101, 'AS1'),
(102, 'AS2'),
(103, 'AS3'),
(104, 'AS4'),
(105, 'AS5'),
(106, 'AS6'),
(107, 'AS7'),
(108, 'AS8'),
(109, 'AS9'),
(110, 'AS10');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `v_personal_2012`
--
ALTER TABLE `v_personal_2012`
  ADD PRIMARY KEY (`Prim2`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `v_personal_2012`
--
ALTER TABLE `v_personal_2012`
  MODIFY `Prim2` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
