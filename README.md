# Visitor Management System

A Web based Application to help keep track of Visitors.
 
## Tech Stack Used

* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool.
* [Express](https://expressjs.com/) - Express is a web application framework for Node.js
* [ReactJS](https://reactjs.org/) - JavaScript library for building user interfaces
* [Node,js](https://nodejs.org/en/about/) - JavaScript RE that executes JavaScript code outside of a browser

## What it intends to do?

* Inform the Host about Visitors through an Email and an SMS.
* Inform the Visitor about his visit through an Email an SMS.

## How was it done?

* The Host and Visitor data was stored online at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
* Emails were sent using the [smtplib](https://docs.python.org/3/library/smtplib.html) for Python.
* Messages were sent using the [way2sms](https://www.way2sms.com/) API and Python.
* A React Based User Interface was paired with an Express based server to form this Project.


## Demo Gifs

* Host Interface

![Adding a Host](demo_gifs/hostdemo.gif)

* Guest Interface

Guest Enters:-

![Guest Enters](demo_gifs/guestenter.gif)

Guest Exits:-

![Guest Exits](demo_gifs/guestexit.gif)

## Future Improvements

* Add styling to the application to impove the current minimal layout.
* Reuse prefetched data instead of querying the Database each time.
* Add appropriate error handlers and log those errors.
