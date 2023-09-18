const StaffService = require('../services/staffService')
class StaffController {
    addNewStaff = async (req, res) => {
        try {
            const data = req.body;
            if (!data.password || !data.email || !data.phone || !data.name) {
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
                    const tbl_customer_info = await StaffService.addNewStaff(res, data)
                    res.status(201).json(tbl_customer_info)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new StaffController();