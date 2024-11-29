#!/usr/bin/env python3

import json, os

path = os.path.join(os.getcwd(),"public/gunpla.json")
print(path)

with open(path, 'r') as file:
    data = json.load(file)
    for d in data:
        d['thumbnail'] = d['name'] + ".webp"
        d['model'] = []
        for i in range(1,4):
            d['model'].append(d['name']+f"{i}.webp")
    with open(path,'w') as out_file:
        json.dump(data,out_file, indent='\t')