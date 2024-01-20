with open('input.txt') as f: s = f.read()

data = s.splitlines()

result = []
sub_array = []
for i in data:
  if i != '':
    sub_array.append(float(i))
  elif len(sub_array) > 0:
    result.append(sub_array)
    sub_array = []

calories = 0
for i in result:
  if calories < sum(i):
    calories = sum(i)

print(calories)