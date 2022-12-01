import os
from os.path import join, getsize

path = "/home/aagam41/Development/Accio"

def main():
  root_bytes = 0
  root_files = 0
  root_lines = 0
  for root, dirs, files in os.walk(path):
    total_bytes = sum(getsize(join(root, name)) for name in files)
    total_files = len(files)

    root_bytes += total_bytes
    root_files += total_files
    
    total_lines = 0

    for name in files:
      if "package-lock" in name:
        continue
      print(join(root, name))
      with open(join(root, name), 'rb') as fp:
        for count, line in enumerate(fp):
            pass
        total_lines += count + 1
    
    root_lines += total_lines

    if '__pycache__' in dirs:
        dirs.remove('__pycache__')
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if 'venv' in dirs:
        dirs.remove('venv')
    if '.git' in dirs:
        dirs.remove('.git')
  
  print(root_bytes, root_files, root_lines)

if __name__ == "__main__":
  main()