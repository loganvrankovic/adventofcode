with open('input.txt') as f: s = f.read()
data = s.splitlines()

left_side = sorted([int(item.split()[0]) for item in data])
right_side = sorted([int(item.split()[1]) for item in data])

differences = sum(abs(a - b) for a, b in zip(left_side, right_side))

print(differences)