const validate = require('../helpers/validationSchema')
const { createResponse, formatResponse } = require('../helpers/utility')
const Subscription = require('../model/subscription')
const { BaseError } = require("../helpers/ErrorHandling")
const Stripe = require('../helpers/stripeConnect')
const stripe = require('stripe')(process.env.Your_Secret_Key)
const User = require("../model/user")
const productToPriceMap = {
    Starter: 'price_1L8fDCDrZeHhqq3gj16wBWfD',
    Growth: 'price_1L8fDpDrZeHhqq3g5CNnviL7'
  }
  
async function setupIntent(data){
    const { customerId, client_secret } = data
    
    // if(client_secret){
    //     return formatResponse(200, "success", "",{client_secret})    
    // }
    
    const intent = await Stripe.setupIntent(customerId)
    await User.findOneAndUpdate(
        { customerId },
        {
            $set: {
                client_secret: intent.client_secret
            },
        }
    ); 
    return formatResponse(200, "success", "",{client_secret: intent.client_secret})
}
//this api can be hit anytime
async function  addSubscription(data,_id,userData) {
    // const {stripeEmail,stripeToken,name,description,stripe_priceId} = data
    const {stripeEmail,stripeToken,stripe_priceId} = data

    const { subscriptionId } = await Subscription.findOne({ userId: _id})

    // currentyl he has free plan and want to move to paid 
    if(!subscriptionId){
        
        const customer = await Stripe.addNewCustomer(stripeEmail,stripeToken,name,description)
        const subscription = await Stripe.subscription(customer.id,stripe_priceId)
        
        await User.findOneAndUpdate({_id:user.id},
        {stripeId : customer.id},
        { new: true }
        )
        
        await Subscription.create({
            userId: user.id,
            stripe_planId: subscription.product,
            subscriptionId: subscription.id
        })
        
        return formatResponse(201, "success", "successfully subscribed")
    }
    //he is moving from paid to free plan
    else if(!stripe_priceId){
        await Stripe.cancelSubscription(subscriptionId)
        const validData = { stripeId : null }
        await User.findOneAndUpdate({_id:user.id},
        validData,
        { new: true }
        )
        await Subscription.findOneAndDelete({_id:user.id});
        return formatResponse(200,"Success", "successfully cancelled")
    }

    //moving from one paid plan to another paid plan
    else if(subscriptionId && stripe_priceId){
        
        await Stripe.cancelSubscription(subscriptionId)
        const subscription = await Stripe.subscription(userData.stripeId,stripe_priceId)
        
        await Subscription.findOneAndUpdate({_id:user.id},
        {
            stripe_planId: subscription.product,
            subscriptionId: subscription.id
        },
        { new: true }
        )

        return formatResponse(201, "success", "successfully updated subscription")
    }

    
   
}

async function  retrieveCustomer(id) {
    const customer = await Stripe.getCustomerByID(id)
    return formatResponse(200,"Success", "", {customer})
}
async function getListOfSubscription() {
    const customer = await Stripe.getListOfSubscription()
    return formatResponse(200,"Success", "", {customer})
}
async function  removeSubscription(_id) {
    const { id } = req.params
    const subscription = await Stripe.cancelSubscription(id)
    return formatResponse(200,"Success", "successfully cancelled")
}

async function webhook(payload,sig){
    const key = process.env.webhookKey
    const event   = await stripe.webhooks.constructEvent(payload,sig,key)
    console.log(event)
    switch (event.type) {
        case 'issuing_card.created':
            const issuingCard = event.data.object;
            const Data = { client_secret : null }
            await User.findOneAndUpdate({_id:user.id},
            validData,
                { new: true }
            )
      // Then define and call a function to handle the event issuing_card.created
      break;
        // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
        }
    
}
module.exports = {
    addSubscription,
    retrieveCustomer,
    removeSubscription,    
    getListOfSubscription,
    setupIntent,
    webhook
}