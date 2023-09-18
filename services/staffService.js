const knex = require('../db/db')
const bcrypt = require("bcryptjs");

class StaffService {
    addNewStaff = async (res, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let checkEmail = await knex('ekyc_vna.tbl_user').select('email').where('email', '=', data.email)
                if (checkEmail.length !== 0) {
                    let mess = `Duplicate email field`
                    res.status(400).json({
                        error: "Bad Request",
                        message: mess
                    })
                    return;
                }

                let checkPhone = await knex('ekyc_vna.tbl_user').select('phone').where('phone', '=', data.phone)
                if (checkPhone.length !== 0) {
                    let mess = `Duplicate phone field`
                    res.status(400).json({
                        error: "Bad Request",
                        message: mess
                    })
                    return;
                }

                var salt = bcrypt.genSaltSync(10);
                function hashPasswords(password) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            var hash = await bcrypt.hashSync(password, salt);
                            resolve(hash);
                        } catch (e) {
                            reject(e);
                        }
                    });
                };

                let hashUserPass = await hashPasswords(data.password);
                const [id] = await knex('ekyc_vna.tbl_user').insert({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    birth_date: data.birth_date,
                    password: hashUserPass,
                    created_date: new Date().toISOString().toLocaleString("en-US", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                }).returning('id')

                await knex('ekyc_vna.tbl_user_role').insert({
                    user_id: id.id,
                    role_id: 3,
                    created_date: new Date().toISOString().toLocaleString("en-US", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                })
                resolve(id)
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = new StaffService();