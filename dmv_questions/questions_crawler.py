import os
import json

from collections import defaultdict
from bs4 import BeautifulSoup

files = ['test_2.html', 'test_3.html', 'test_4.html', 'test_5.html']
questions = []
answers = defaultdict(list)
question_index = 0

for _file in files:
	question_index = len(questions)
	with open(_file, 'r') as f:
		content = f.read()
		soup = BeautifulSoup(content)
		for item in soup.find_all('p', style="font-weight:bold;"):
			questions.append(item.get_text())

		for item in soup.find_all('div', class_="blockindent4"):
			question_id = item.input.attrs['name'].split('q')[1]
			is_correct_answer = not 'incorrect' in item.input.attrs['onclick']
			answers[question_index + int(question_id)].append((item.get_text(), is_correct_answer))

data = {}
for index, question in enumerate(questions):
	data[index] = {"question": question, "answers": answers[index+1]}

json_file = open('../class-c-questions.json', 'w+')
json_data = json.dumps(data, sort_keys=True, indent=2)
json_file.write(json_data)


