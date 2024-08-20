# -*- coding: utf-8 -*-
"""
Created on Tue May 21 00:48:39 2024

@author: soumy
"""

import requests
import datetime
import sys,os
from Bio import SeqIO
import json,csv,numpy as np
from Bio.Seq import Seq
from pathlib import Path
from joblib import dump, load
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score,auc,precision_recall_curve,         recall_score, confusion_matrix, classification_report,         accuracy_score, f1_score,roc_auc_score,matthews_corrcoef
import warnings
warnings.filterwarnings('ignore')
#%%
#a = datetime.datetime.now()

with open("./uploads/PID_List.txt", 'r') as infile,open('../InputFile/results1.fasta', 'w') as outfile:
  for count, line in enumerate(infile, 1):
    access_id = line.strip()              
    response = requests.get(
      f'https://rest.uniprot.org/uniprotkb/{access_id}.fasta')
    # check that fetch succeeded; raise error if not
    response.raise_for_status()
    assert(response.text.startswith('>'))
    assert(response.text.endswith('\n'))
    outfile.write(response.text)

#print (f"Total sequences downloaded = {count}")
#b = datetime.datetime.now()
#print(b-a)
