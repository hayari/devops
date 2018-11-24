
sudo echo "192.168.121.10  centrale  centrale.example.com">>/etc/hosts
sudo echo "192.168.121.11  server1  server1.example.com">>/etc/hosts
sudo echo "192.168.121.12  server2  server2.example.com">>/etc/hosts
sudo yum -y update
sudo yum -y install epel-release 
useradd ansible
echo "ansible" | passwd --stdin ansible
echo "ansible ALL=(ALL)  NOPASSWD:ALL" >/etc/sudoers.d/ansible

