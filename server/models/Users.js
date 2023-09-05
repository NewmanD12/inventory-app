const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    userName : String, 
    password : String,
    sales : [{
        month : String,
        year : Number,
        total_sales : Number,
        taxes_and_fees : Number,
        ebay_revenue : Number,
        ebay_fees : Number,
        shipping_labels : Number,
        net_sales : Number,
        deposits : Number,
        total_refunds_credits : Number,
        total_cost_of_goods : Number,
        supplies_storage_costs: Number,
        total_mileage : Number,
        mileage_deduction : Number,
        total_taxable_revenue : Number,
        total_expenses : Number,
        taxable_total : Number
    }],
    cost_of_goods : [{
        date_bought : Date,
        item : String,
        cost : Number
    }],
    supplies : [{
        date_bought : Date,
        item : String,
        cost : Number
    }],
    mileages : [{
        date_traveled : Date,
        starting_mileage : Number,
        ending_mileage : Number,
        difference : Number
    }]
})

const User = mongoose.model('users', userSchema)
module.exports = User