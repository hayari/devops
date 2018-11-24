#!/usr/bin/env python

'''
example of dynamic script for use with ansible

call it with --list to show list
call it with --host [hostname] for specific hosts
'''

import os
import argparse
import sys

try:
  import json
except ImportError:
  import simplejson as json

class OurInventory(object):
  def __init__(self):
    self.inventory = {}
    self.read_cli_args()

    # this section is called with `--list`.
    if self.args.list:
      self.inventory = self.our_inventory()
    # this section is called with `--host [hostname]`.
    elif self.args.host:
      # We return _meta info `--list` so not complete
      self.inventory = self.empty_inventory()
    else:
      self.inventory = self.empty_inventory()
    
    print json.dumps(self.inventory)
    
  # This is an example used simply for testing and so we can run a dynamic script without actualy setting up a server
  #
  
  def our_inventory(self):
    return {
    'group': {
      'hosts': ['server1', 'server2', 'server3'],
      'vars': {
        'ansible_user': 'vagrant',
        'test_variable': 'nonspecific_value'
        }
      },
      '_meta': {
        'hostvars': {
          'server1': {
            'logs_folder': '/var/log1'
            },
          'server2': {
            'logs_folder': '/var/log2'
            }
          }
        }
      }
      
  # Empty inventory for testing
  def empty_inventory(self):
    return {'_meta': {'hostvars': {}}}
  
  # Lets take the args passed to us vai command line.
  
  def read_cli_args(self):
    parser = argparse.ArgumentParser()
    parser.add_argument('--list', action = 'store_true')
    parser.add_argument('--host', action = 'store')
    self.args = parser.parse_args()
    
# Get the inventory
OurInventory()
      
