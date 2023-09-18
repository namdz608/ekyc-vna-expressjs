const knex = require('../db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");

class LoginController {
    LoginUser = async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            res.status(400).json({
                error: "Bad Request",
                message: "Missing email or password"
            })
        }
        else {
            const user = await knex.select('*').from('ekyc_vna.tbl_user').where('email', '=', email).andWhere('is_delete', '=', false)
            if (user.length === 0) {
                res.status(400).json({
                    error: "Bad Request",
                    message: "Wrong email or password"
                })
            }
            else {
                let decodePassword = await bcrypt.compareSync(password, user[0].password);
                if (decodePassword === false) { return res.sendStatus(401) }
                else {
                    const role_id = await knex.select('*').from('ekyc_vna.tbl_user_role').where('user_id', '=', user[0].id)
                    const role= await await knex.select('*').from('ekyc_vna.tbl_role').where('id', '=', role_id[0].role_id)
                    const actions = await knex.select('*').from('ekyc_vna.tbl_action_role').where('role', '=', role[0].role_name)
                    let data = {}
                    data.actions = actions
                    const jsonwebtoken = jwt.sign(
                        data,
                        'namdz')
                    res.json({ jsonwebtoken, username: user[0].email })
                }
            }

        }

    }
}

module.exports = new LoginController();