#!/usr/bin/env python3
import subprocess
import sys
try:
    url = sys.argv[1] #always put url at index 1
    #flags = sys.argv[2:].join(' ') #using list slicing and joining using space to form a flags string eg: '-sA -sT -vV'
    tool = "nikto"
    cmd = "{} -h {}".format(tool, url)
    # print('In nmap PIPE')
    # print(cmd)
    output = subprocess.call(cmd,stderr=subprocess.STDOUT, shell=True)
    print(output)
except subprocess.CalledProcessError as e:
    print("Calledprocerr {}").format(e)

#print("Output is {} bytes long.".format(len(output)))
#print("Output is ")
#print(str(output), file=sys.stdout)
