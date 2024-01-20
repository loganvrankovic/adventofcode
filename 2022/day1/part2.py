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

calories = []
for i in result:
  calories.append(sum(i))

sort_calories = sorted(calories, reverse=True)

answer = sort_calories[0] + sort_calories[1] + sort_calories[2]

print(answer)