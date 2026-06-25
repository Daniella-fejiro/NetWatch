# NetWatch

## Overview

NetWatch is a full-stack network monitoring system designed to track server availability, monitor uptime and downtime events, generate incidents, and provide real-time notifications when network devices experience issues.

The application helps administrators and IT teams monitor the health and reliability of servers through a centralized dashboard. By continuously checking device status, NetWatch provides visibility into system performance and availability, enabling faster response to outages and network disruptions.

---

## Features

### Device Monitoring

* Monitor multiple servers and network devices
* Track current device status (Online/Offline)
* View device information and monitoring details
* Automatic status updates

### Uptime & Reliability Tracking

* Calculate uptime percentages
* Track total uptime and downtime
* Measure service reliability
* Generate performance statistics

### Incident Management

* Automatically create incidents when devices go offline
* Track incident status
* View incident history
* Monitor incident resolution progress

### Real-Time Notifications

* Instant alerts when device status changes
* Real-time updates using Socket.IO
* Notification center for monitoring events
* Live dashboard synchronization

### Reporting & Analytics

* Device health overview
* Incident reports
* Uptime statistics
* Reliability metrics

### Authentication & Security

* User authentication with JWT
* Protected routes
* Secure API access
* Role-based access control readiness

---

## Why I Built NetWatch

Modern organizations depend on servers and network infrastructure to keep critical services running. Downtime can impact productivity, revenue, and customer experience.

NetWatch was built to provide visibility into network availability by monitoring device health, tracking outages, and notifying users in real time whenever issues occur.

The project also served as a practical learning experience for understanding networking concepts, real-time communication, and backend system architecture.

---

## Technologies Used

### Frontend

* React.js
* React Router
* Axios
* Socket.IO Client
* Framer Motion
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* bcrypt

### Development Tools

* Git
* GitHub
* Postman

---

## System Architecture

NetWatch follows a client-server architecture.

1. The monitoring service checks device availability.
2. Device status changes are recorded in the database.
3. Incidents are automatically generated when outages occur.
4. Socket.IO broadcasts updates to connected clients.
5. Users receive real-time notifications through the dashboard.
6. Reports and statistics are generated from stored monitoring data.

---

## Networking Concepts Applied

During the development of NetWatch, the following networking concepts were explored:

* IP Addresses
* Ports
* Localhost
* Client-Server Communication
* TCP/IP
* HTTP and HTTPS
* DNS
* SMTP
* FTP
* SSH
* DHCP
* ARP
* ICMP
* UDP
* WebSockets

In total, the project involved researching and understanding over 20 networking protocols and concepts relevant to modern network communication.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Daniell-fejiro/netwatch.git
```

### Navigate to the Project Directory

```bash
cd netwatch
```

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file in the server directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start the Backend

```bash
node server
```

### Start the Frontend

```bash
npm run dev
```

---

## Future Improvements

Potential enhancements include:

* Email notifications
* SMS alerts
* Device grouping
* Advanced analytics dashboard
* Historical performance charts
* Network topology visualization
* Monitoring interval customization
* Multi-user roles and permissions
* Exportable reports
* Cloud deployment support

---

## Lessons Learned

Building NetWatch provided hands-on experience in:

* Full-stack application development
* API design and implementation
* Database modeling
* Authentication and authorization
* Real-time communication with Socket.IO
* Incident management workflows
* Uptime monitoring systems
* Git and version control
* Networking fundamentals and protocols
* Debugging complex application issues

This project demonstrated how networking concepts and software engineering principles come together to create a practical monitoring solution.

---

## Author

Daniella Akafe

Full-Stack Developer passionate about building scalable web applications, learning networking concepts, and solving real-world problems through technology.

LinkedIn: https://linkedin.com/in/daniellaakafe
GitHub: https://github.com/Daniella-fejiro
