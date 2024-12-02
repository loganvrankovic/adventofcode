with open('input.txt') as f: s = f.read()
data = s.splitlines()

left_side = [int(item.split()[0]) for item in data]
right_side = [int(item.split()[1]) for item in data]

scores = []

for a in left_side:
  count = 0

  for b in right_side:
    if b == a:
      count += 1
  
  scores.append(a * count)

print(sum(scores))