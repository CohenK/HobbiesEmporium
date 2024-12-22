#!/usr/bin/env python3

import json, os

path = os.path.join(os.getcwd(),"public/gunpla.json")
print(path)

with open(path, 'r') as file:
    data = json.load(file)
    for d in data:
        d['model'] = [d['thumbnail']] + d['model']
    with open(path,'w') as out_file:
        json.dump(data,out_file, indent='\t')