# SensorCloud-App

Deployment Steps

After ssh on the trystack instance

make sure u r in /home/ubuntu

curl -L https://www.opscode.com/chef/install.sh | sudo -E bash

git clone https://github.com/aakash77/SensorCloud-cookbook.git

git clone https://github.com/aakash77/SensorCloud-App.git

cd SensorCloud-cookbook

sudo chef-solo -c solo.rb

cd ../SensorCloud-App

cd server	

sudo npm install

npm start

Another terminal

cd SensorCloud-App

cd load_balancer

sudo npm install

npm start
