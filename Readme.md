# UTFAQ Wechat Project

## How it works
- npm install -g localtunnel
- To start the tunneling, set port to 8888
- $ lt --port 5030 --subdomain localchatbot
- We use Node Foreman to manage this application.
- $ npm install -g foreman

## How to load environment
- You will need your specific .env file for Node Foreman to load your specific environment settings. Here's an example:
```
{
    "env" : "local",
    "port" : "3000",
    "mysql" : {
        "host" : "162.144.108.45",
        "user" : "utfaqcom_lucas",
        "password" : "lucaschen",
        "database" : "utfaqcom_wpc"
    }

}
```

## How to run dev dependency updates
- $ npm install

## How to start up the web server
- $ nf start



