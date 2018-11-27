# oracledb_preinstall [![Build Status](https://travis-ci.org/rdwinter2/oracledb_preinstall.png?branch=master)](https://travis-ci.org/rdwinter2/oracledb_preinstall)

This role will prepare an EL7 host for Oracle database installation. Some networking prerequisites are deferred due to limitations in testing inside Docker. 

* prereq checks
    * kernel version
    * memory
    * /tmp
    * swap
    * /u01
    * system architecture
* rpm packages
	* add required
	* remove conflicting
* SELinux
* PAM config
    * /etc/pam.d/login
* Security limits
    * /etc/security/limits.d/
* kernel limits
    * /etc/sysctl.d/
* groups
* users
    * .bashrc
    * .bash_profile
    * .aliases
* sudoers
* hugepages
    * disable transparent hugepages
    * set hugepages
* ulimit
    * /etc/profile.d/
* tuned-profiles-oracle
* ORAchk

```
KERNEL=="sd?", PROGRAM=="/usr/lib/udev/scsi_id -g -u -d /dev/$parent", RESULT=="", SYMLINK+="oracleasm/disk3", OWNER="grid", GROUP="oinstall", MODE="0660"

/sbin/partprobe /dev/sdb1
/sbin/udevadm control --reload-rules
/sbin/udevadm trigger
```

## Requirements

N/A

## Role Variables

Name | description | type | default
--- | --- | --- | ---
hostname | | | localhost
domain | | localdomain
N/A | N/A | N/A | N/A

## Dependencies

N/A

## Example Playbook

	- name: PLAY | Prepare hosts for Oracle database install
	  hosts: [databases]
	  become: true
	  become_method: 'sudo'
	  roles:
	    - { role: oracledb_preinstall }

## License

MIT

## Author Information

|Author|E-mail|
|---|---|
|Bob Winter|TBD|

## References

* [Database Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/12.2/ladbi/database-installation-guide-linux.pdf)
* [Grid Infrastructure Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/12.2/cwlin/grid-infrastructure-installation-guide-linux.pdf)
* [Deploying Oracle RAC Database 12c Release 2 on Red Hat Enterprise Linux 7](https://access.redhat.com/documentation/en-us/reference_architectures/2017/pdf/deploying_oracle_rac_database_12c_release_2_on_red_hat_enterprise_linux_7/Reference_Architectures-2017-Deploying_Oracle_RAC_Database_12c_Release_2_on_Red_Hat_Enterprise_Linux_7-en-US.pdf)
* [Oracle Databases on VMware Best Practices Guide](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/solutions/vmware-oracle-databases-on-vmware-best-practices-guide.pdf)
* [Oracle Databases on VMware RAC Deployment Guide](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/partners/oracle/vmware-oracle-rac-deploy-guide.pdf)
* [UDEV SCSI Rules Configuration In Oracle Linux 5, 6 and 7](https://oracle-base.com/articles/linux/udev-scsi-rules-configuration-in-oracle-linux)
* [Github oravirt/ansible-oracle](https://github.com/oravirt/ansible-oracle/blob/a72988c393367697263bb4d47c9582d833bc1360/roles/orahost/defaults/main.yml)
* [Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/12.2/ladbi/server-configuration-checklist-for-oracle-database-installation.html)
* [	ORAchk - Health Checks for the Oracle Stack (Doc ID 1268927.2)](https://support.oracle.com/epmos/faces/DocumentDisplay?_afrLoop=25321399487020&id=1268927.2&_afrWindowMode=0&_adf.ctrl-state=1694ohstq3_4)
