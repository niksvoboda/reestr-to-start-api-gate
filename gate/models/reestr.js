const db            = require("../components/db.js");
const Log           = require("../components/log.js");

class Reestr extends Log {     
    name = "Reestr";
    /** Функция для получения АС */
    async getAs(LIMIT, OFFSET) {
        const query = `SELECT 
        uniq_id, 
        Kratkoe_nazvanie_prilozhenie_spisok_sinonimov, 
        Naimenovanie, 
        Naznachenie, 
        Type_confidentiality, 
        standart_contur
        FROM 
        v_reestr_as_asup
        WHERE 
        (sys_source != 'gpbuadmin' OR sys_source IS NULL)
        LIMIT ? OFFSET ?`
        const result = await db.asyncQuery(query, [LIMIT, OFFSET], true)
        console.log(query)
        console.log(result)
        return result
    }
    async getOwners() {
        const query = `SELECT reestr_as_id, boss_id FROM V_REESTR_AS_OWNERS`
        const result = await db.asyncQuery(query, [], true)
        return result
    }
    async getManagers() {
        const query = `SELECT id_reestr_abs, id_PERSONAL_2012 FROM v_reestr_as_manager`
        const result = await db.asyncQuery(query, [], true)
        return result
    }
    async getPersonal2012() {
        const query = `SELECT rowid, fio FROM v_PERSONAL_2012`
        const result = await db.asyncQuery(query, [], true)
        return result
    }
}

module.exports = new Reestr()