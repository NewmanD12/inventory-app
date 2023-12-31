
const { generatePasswordHash, validatePW, generateUserToken } = require('../middleware/auth')
const User = require('../models/Users')

async function createUser(req, res) {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const userName = req.body.userName
        const password = req.body.password

        const user = await User.find({userName : {$eq : userName}})

        // res.json({
        //     user : user
        // })

        if(user.length === 0){
            const saltRounds = 10
            const hashedPW = await generatePasswordHash(password, saltRounds)

            const newUser = new User({
                firstName,
                lastName,
                userName,
                password : hashedPW
            })

            const savedUser = await newUser.save()
            res.json({
                success : true,
                user : savedUser
            })
        }
        else {
            res.json({
                success : false,
                message : "User already exits"
            })
        }
    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

const findUser = async (req, res) => {
    try {

        let user = await User.findOne({_id : req.params.userID})
        user = {
            firstName : user.firstName,
            lastName : user.lastName,
            mileages : user.mileages,
            sales : user.sales,
            supplies : user.supplies,
            userName : user.userName
        }

        res.json({
            success : true,
            user : user
        })

    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

const login = async (req, res) => {
    try {
        const { userName, password} = req.body;
        const user = await User.findOne({userName : userName})

        if(!user){
            res.json({
                success : false,
                message : 'Could not find user'
            }).status(204)
        }

        const isPWValid = await validatePW(password, user.password)

        if (!isPWValid) {
            res
            .json({ success: false, message: "Password was incorrect." })
            .status(204);
            return;
        }

        const userData = {
            userName : user.userName,
        }

        const token = generateUserToken(userData)
        res.json({
            success : true,
            userID : user._id,
            userName : user.userName,
            token
        })
    } catch (error) {
        // console.log(error)
    }
}

async function addToSales(req, res) {
    try {
        const { month, year, total_sales, taxes_and_fees, ebay_revenue, ebay_fees, shipping_labels, net_sales, deposits, total_refunds_credits, total_cost_of_goods, supplies_storage_costs, total_mileage, mileage_deduction, total_taxable_revenue, total_expenses, taxable_total, userID } = req.body

        const user = await User.findOne({_id : userID})
        let updatedSales = []
        const sale = {
            month,
            year, 
            total_sales,
            taxes_and_fees,
            ebay_revenue,
            ebay_fees,
            shipping_labels,
            net_sales,
            deposits,
            total_refunds_credits,
            total_cost_of_goods,
            supplies_storage_costs,
            total_mileage,
            mileage_deduction,
            total_taxable_revenue,
            total_expenses,
            taxable_total
        }

        if(user){
            updatedSales = [...user.sales, sale]
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            sales : updatedSales
        })

        res.json({
            success : true,
            user : updatedUser
        })
        

    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

async function addToCostOfGoods(req, res){
    try {
        const { date_bought, item, cost, userID } = req.body
        const user = await User.findOne({_id : userID})
        let updatedCostOfGoods = []

        const newCostOfGoods = {
            date_bought,
            item,
            cost
        }

        if(user) {
            updatedCostOfGoods = [...user.cost_of_goods, newCostOfGoods]
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            cost_of_goods : updatedCostOfGoods
        })

        res.send({
            success : true,
            user : updatedUser
        })
    }
    catch (e) {
        res.send({
            success : false,
            error : e.toString()
        })
    }
}

async function addToSupplies(req, res){
    try {
        const { date_bought, item, cost, userID } = req.body
        const user = await User.findOne({_id : userID})
        let updatedSupplies = []

        const newSupply = {
            date_bought,
            item, 
            cost
        }

        if(user){
            updatedSupplies = [...user.supplies, newSupply]
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            supplies : updatedSupplies
        })

        res.send({
            success : true,
            user : updatedUser
        })
    }
    catch (e) {
        res.send({
            success : false,
            error : e.toString()
        })
    }
}

async function addToMileages(req, res){
    try {
        const { date_traveled, starting_mileage, ending_mileage, difference, userID } = req.body
        const user = await User.findOne({_id : userID})
        let updatedMileages = []

        const newMileage = {
            date_traveled,
            starting_mileage,
            ending_mileage,
            difference
        }

        if(user){
            updatedMileages = [...user.mileages, newMileage]
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            mileages : updatedMileages
        })

        res.send({
            success : true,
            user : updatedUser
        })
    }
    catch (e) {
        res.send({
            success : false,
            error : e.toString()
        })
    }
}

module.exports = {
    createUser,
    findUser,
    login,
    addToSales,
    addToCostOfGoods,
    addToSupplies,
    addToMileages
}