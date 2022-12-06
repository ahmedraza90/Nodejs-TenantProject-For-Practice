const stripe = require('stripe')(process.env.Your_Secret_Key)

const addNewCustomer = async (email) => {
  const customer = await stripe.customers.create({
		email,
  })

  return customer
}

const getCustomerByID = async (id) => {
  const customer = await stripe.customers.retrieve(id,{ expand : ['subscriptions'] })
  
  return customer
}
const getListOfSubscription = async () => {
  const customer = await stripe.products.list();  
  return customer
}
const createCheckoutSession = async (customer, price) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer,
    line_items: [
      {
        price,
        quantity: 1
      }
    ],
    subscription_data: {
      trial_period_days: 14
    },

    success_url: `http://localhost:4242/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:4242/failed`
  })

  return session
}

const subscription = async (id,price,trial_period_days)=>{
  const subscription = await stripe.subscriptions.create({
    customer: id,
    items: [
      {price,}
    ],
    collection_method:"charge_automatically"
  });
  return subscription
}

const cancelSubscription = async (id)=>{
  const subscription = await stripe.subscriptions.del(id);
  return subscription
}
const updateSubscription = async(sub_id,order_id)=>{
  const subscription = await stripe.subscriptions.update(
    sub_id,
    {metadata: {order_id}}
  );
}
const setupIntent = async(customer)=>{ 
  console.log(customer)
  const Intent = await stripe.setupIntents.create({
    customer:customer,
    payment_method_types: ['bancontact', 'card', 'ideal'],
  });
  return Intent
}
module.exports = {
  addNewCustomer,
  createCheckoutSession,
  getCustomerByID,
  subscription,
  cancelSubscription,
  getListOfSubscription,
  updateSubscription,
  setupIntent
}

