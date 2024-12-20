const db  = require("./components/db.js");

async function  getOwners() {
    const query = `SELECT * FROM V_REESTR_AS_OWNERS LIMIT 1`
    const result = await db.asyncQuery(query, [], true)
    return result
}
async function getManagers() {
    const query = `SELECT * FROM v_reestr_as_manager  LIMIT 1`
    const result = await db.asyncQuery(query, [], true)
    return result
}
async function getPersonal2012() {
    const query = `SELECT * FROM v_PERSONAL_2012  LIMIT 1`
    const result = await db.asyncQuery(query, [], true)
    return result
}

const getTables = async () =>{
    try {   
        const result  = await getOwners();
        console.log(result)
    } catch (error) {
        
    }
    try {   
        const result  = await getManagers();
        console.log(result)
    } catch (error) {
        
    }
    try {   
        const result  = await getPersonal2012();
        console.log(result)
    } catch (error) {
        
    }
}

getTables();