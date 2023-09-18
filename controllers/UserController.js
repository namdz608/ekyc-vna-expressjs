const UserService = require('../services/userService')
require('dotenv').config();

class UserController {
    UploadFile = async (req, res) => {
        try {
            console.log(req.files)
            res.json({ message: "Successfully uploaded files", fileUrl: `${process.env.IP_ADDRESS}:1337/images/${req.files[0].filename}` });
        } catch (e) {
            console.log(e)
        }
    }
    getListUser = async (req, res) => {
        try {
            let { filter } = req.query
            let { sort } = req.query
            let { pagination } = req.query
            if (!filter) {
                filter = null
            }
            if (!sort) {
                sort = {}
                sort.id = 'desc'
            }
            if (!pagination) {
                pagination = {}
                pagination.page = 0
            }
            let a = await UserService.getListUser(filter, sort, pagination)
            res.status(200).json(a)
        } catch (e) {
            console.log(e)
        }
    }

    addNewUser = async (req, res) => {
        try {
            const data = req.body;
            if (!data.name || !data.cccd_id || !data.email || !data.phone) {
                res.status(400).json({
                    error: "Bad Request",
                    message: "Missing required parameters"
                })
            }
            else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^(?:\+?(?:84|0))(?:\d){9}$/;
                if (emailRegex.test(data.email) === false) {
                    res.status(400).json({
                        error: "Bad Request",
                        message: "invalid email"
                    })
                }
                else if (phoneRegex.test(data.phone) === false) {
                    res.status(400).json({
                        error: "Bad Request",
                        message: "invalid phonenumber"
                    })
                }
                else {
                    const tbl_customer_info = await UserService.addNewUser(res, data)
                    res.status(201).json(tbl_customer_info)
                }
            }
        } catch (e) {
            console.log(e)
        }

    }

    getDetailUserInfo = async (req, res) => {
        try {
            const user = await UserService.getDetailUserInfo(req.params.id)
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
        }
    }

    deleteUser = async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserService.deleteUser(id)
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController();