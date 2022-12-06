const http = require("http");
const express = require("express");
const {app} = require("./app");
const server = http.createServer(app);
const cors = require("cors");
const path = require('path')


const {API_PORT} = process.env;
const port = process.env.PORT || API_PORT;
const userRoutes = require('./routes/auth/user.routes')
const authRoutes = require('./routes/auth/auth.routes')
const requestRoutes = require('./routes/auth/request.routes')
const categoriesRoute = require('./routes/auth/categories.routes')
const issuesRoute = require('./routes/auth/issue.routes')
const propertyRoute = require('./routes/property.routes')
const planRoute = require('./routes/plan.routes')
const contactRoute = require('./routes/contact.routes')
const listingRoute = require('./routes/listing.routes')
const leaseRoute = require('./routes/lease.route')
const applicationRoute = require('./routes/application.routes')
const reminderRoute = require('./routes/reminder.routes')
const taskRoute = require('./routes/task.routes')
const accountingRoute = require('./routes/accounting.routes')
const subscriptionRoute = require('./routes/subscription.route')


// View Engine Setup
app.set('views',path.join(__dirname, 'temp'))
app.set('view engine', 'ejs')


app.use(express.json());
app.use(cors());

//setup static folders
// app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

//setup routes\
app.use(userRoutes)
app.use(authRoutes)
app.use(requestRoutes)
app.use(categoriesRoute)
app.use(issuesRoute)
app.use(propertyRoute)
app.use(planRoute)
app.use(contactRoute)
app.use(listingRoute)
app.use(leaseRoute)
app.use(applicationRoute)
app.use(reminderRoute)
app.use(taskRoute)
app.use(accountingRoute)
app.use(subscriptionRoute)


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
