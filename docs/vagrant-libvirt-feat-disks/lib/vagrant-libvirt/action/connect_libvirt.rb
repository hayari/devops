require 'fog'
require 'log4r'

module VagrantPlugins
  module ProviderLibvirt
    module Action
      class ConnectLibvirt
        def initialize(app, env)
          @logger = Log4r::Logger.new('vagrant_libvirt::action::connect_libvirt')
          @app = app
        end

        def call(env)

          # If already connected to libvirt, just use it and don't connect
          # again.
          if ProviderLibvirt.libvirt_connection
            env[:libvirt_compute] = ProviderLibvirt.libvirt_connection
            return @app.call(env)
          end

          # Get config options for libvirt provider.
          config = env[:machine].provider_config

          # Setup connection uri.
          uri = config.driver.dup
          virt_path = case uri
          when 'qemu', 'openvz', 'uml', 'phyp', 'parallels', 'kvm'
            '/system'
          when 'xen', 'esx'
            '/'
          when 'vbox', 'vmwarews', 'hyperv'
            '/session'
          else
            raise "Require specify driver #{uri}"
          end
          if uri == 'kvm'
            uri = 'qemu'	# use qemu uri for kvm domain type
          end

          if config.connect_via_ssh
            uri << '+ssh://'
            if config.username
              uri << config.username + '@'
            end

            if config.host
              uri << config.host
            else
              uri << 'localhost'
            end
          else
            uri << '://'
            uri << config.host if config.host
          end

          uri << virt_path
          uri << '?no_verify=1'

          if config.id_ssh_key_file
            # set ssh key for access to libvirt host
            home_dir = `echo ${HOME}`.chomp
            uri << "\&keyfile=#{home_dir}/.ssh/"+config.id_ssh_key_file
          end
          # set path to libvirt socket
          uri << "\&socket="+config.socket if config.socket

          conn_attr = {}
          conn_attr[:provider] = 'libvirt'
          conn_attr[:libvirt_uri] = uri
          conn_attr[:libvirt_username] = config.username if config.username
          conn_attr[:libvirt_password] = config.password if config.password

          # Setup command for retrieving IP address for newly created machine
          # with some MAC address. Get it from dnsmasq leases table
          ip_command = %q[ find /var/lib/libvirt/dnsmasq/ /var/lib/misc/ -name '*leases' -exec grep $mac {} \; | cut -d' ' -f3 ]
          conn_attr[:libvirt_ip_command] = ip_command

          @logger.info("Connecting to Libvirt (#{uri}) ...")
          begin
            env[:libvirt_compute] = Fog::Compute.new(conn_attr)
          rescue Fog::Errors::Error => e
            raise Errors::FogLibvirtConnectionError,
              :error_message => e.message
          end
          ProviderLibvirt.libvirt_connection = env[:libvirt_compute]

          @app.call(env)
        end
      end
    end
  end
end
