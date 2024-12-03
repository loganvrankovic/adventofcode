with open('input.txt') as f: s = f.read()
reports = s.splitlines()

safe_reports = 0

def test1(data):
  report = [int(num) for num in data.split()]
  inc_score = 0
  dec_score = 0

  for i in range(len(report) - 1):
    if report[i] < report[i + 1]:
      inc_score += 1

    if report[i] > report[i + 1]:
      dec_score += 1

  if inc_score == (len(report) - 1) and dec_score == 0:
    return True
  elif dec_score == (len(report) - 1) and inc_score == 0:
    return True
  else: 
    return False
  
def test2(data):
  report = [int(num) for num in data.split()]

  flag = True

  for i in range(len(report) - 1):
    diff = abs(report[i] - report[i + 1])

    if diff > 3 or diff < 1:
      flag = False 

  return flag

for report in reports:
  if test1(report) and test2(report):
    safe_reports += 1

print(safe_reports)