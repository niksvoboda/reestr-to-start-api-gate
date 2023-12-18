[24.11 15:05] Ivan Velichkin
Для получения владельцев системы (может быть несколько) существует отдельное представление:
select reestr_as_id, boss_id from V_REESTR_AS_OWNERS
где reestr_as_id – номер системы в реестре ас, а boss_id – auto_card сотрудника, который является владельцем
[24.11 15:06] Ivan Velichkin
Для получения данных по пункту 3 (так полагаю там опечатка и нужен PCI DSS) можно сделать фильтрацию, например так:

select
uniq_id, Naimenovanie,  Naznachenie,  Kratkoe_nazvanie_prilozhenie_spisok_sinonimov,  Dopolnitelnye_usloviya,  type_confidentiality,  standart_contur, 
 Adres_v_VSS_gde_nahoditsya_opisanie_interfeysov_i_sami_shablony_
from v_reestr_as_asup
where standart_contur like '%PCI DSS%'


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
  `Res16` varchar(512) DEFAULT NULL,  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `v_reestr_as_developer` (
  `Id_reestr_abs` int(11) NOT NULL,
  `Id_PERSONAL_2012` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `v_reestr_as_manager` ( // 
  `Id_reestr_abs` int(11) NOT NULL,
  `Id_PERSONAL_2012` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `V_REESTR_AS_OWNERS` (
  `boss_id` int(11) NOT NULL,
  `reestr_as_id` varchar(512)  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `v_PERSONAL_2012` (
  `Prim2` int(11) NOT NULL,
  `Rowid` int(11) NOT NULL,
  `Fio` varchar(512)  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




select reestr_as_id, boss_id from V_REESTR_AS_OWNERS