const knex = require('../db/db')
const bcrypt = require("bcryptjs");
class UserServices {
    getListUser = async (filter, sort, pagination) => {
        return new Promise(async (resolve, reject) => {
            try {
                let paginate = 0;
                if (pagination.page >= 1) {
                    paginate = (pagination.page - 1) * 3
                }
                if (filter !== null) {
                    let data = await knex('ekyc_vna.tbl_customer_info').select()
                        .where((qb) => {
                            Object.keys(filter).forEach(key => {
                                const value = filter[key];
                                Object.keys(value).forEach(async element => {
                                    const newValue = value[element];
                                    if (element === '$eq') {
                                        qb.where(key, '=', newValue)
                                    }
                                    else if (element === '$>') {
                                        qb.where(key, '>', newValue)
                                    }
                                    else if (element === '$<') {
                                        qb.where(key, '<', newValue)
                                    }
                                });

                            })
                        }).limit(3).offset(paginate).orderBy(Object.keys(sort)[0], Object.values(sort)[0]);
                    delete data[0].password
                    resolve(data)
                }
                else {
                    let data = await knex('ekyc_vna.tbl_customer_info').select().limit(3).offset(paginate).orderBy(Object.keys(sort)[0], Object.values(sort)[0]);
                    resolve(data)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    getDetailUserInfo = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await knex('ekyc_vna.tbl_customer_info').select()
                    .where('id', '=', id).andWhere('is_delete', '=', false)
                delete data[0].password
                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    }


    addNewUser = async (res, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let checkEmail = await knex('ekyc_vna.tbl_customer_info').select('email').where('email', '=', data.email)
                if (checkEmail.length !== 0) {
                    let mess = `Duplicate email field`
                    res.status(400).json({
                        error: "Bad Request",
                        message: mess
                    })
                    return;
                }

                let checkPassport_id = await knex('ekyc_vna.tbl_customer_info').select('passport_id').where('passport_id', '=', data.passport_id)
                if (checkPassport_id.length !== 0) {
                    let mess = `Duplicate passport_id field`
                    res.status(400).json({
                        error: "Bad Request",
                        message: mess
                    })
                    return;
                }

                let checkCccd_id = await knex('ekyc_vna.tbl_customer_info').select('cccd_id').where('cccd_id', '=', data.cccd_id)
                if (checkCccd_id.length !== 0) {
                    let mess = `Duplicate cccd_id field`
                    res.status(400).json({
                        error: "Bad Request",
                        message: mess
                    })
                    return;
                }

                let checkPhone = await knex('ekyc_vna.tbl_customer_info').select('phone').where('phone', '=', data.phone)
                if (checkPhone.length !== 0) {
                    let mess = `Duplicate phone field`
                    res.status(400).json({
                        error: "Bad Request",
                        message: mess
                    })
                    return;
                }

                const [id] = await knex('ekyc_vna.tbl_customer_info').insert({
                    name: data.name,
                    cccd_id: data.cccd_id,
                    type: data.type,
                    email: data.email,
                    phone: data.phone,
                    passport_id: data.passport_id,
                    created_date: new Date().toISOString().toLocaleString("en-US", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                }).returning('id')
                resolve(id)


            } catch (e) {
                reject(e)
            }
        })

    }

    deleteUser = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await knex("ekyc_vna.tbl_customer_info")
                    .where("id", id)
                    .update(
                        {
                            is_delete: true,
                            last_modified_date: new Date().toISOString().toLocaleString("en-US", {
                                timeZone: "Asia/Ho_Chi_Minh",
                            }),
                        },
                        ["id"]
                    );
                resolve(result)
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = new UserServices();