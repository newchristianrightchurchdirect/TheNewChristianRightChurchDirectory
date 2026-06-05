"""Manual fixes for TH1990 lyrics that the OCR/agent pass got wrong:
- #44 'How Great Thou Art' was missing the refrain (rendered separately)
- #125 'Let All Things Now Living' chorus-only — needs proper 2 stanzas
- #640 'My Tribute' verse+refrain were truncated mid-line
- #680 'Consider the Lilies' refrain truncated mid-line"""
import json, os

BASE = r'C:\Users\Dustina\Websites\church-directory'
PATH = os.path.join(BASE, 'public', 'hymnal-data', 'trinity_hymnal_1990.json')
d = json.load(open(PATH, encoding='utf-8'))
by_n = {str(h['number']): h for h in d['hymns']}

# #44: append the refrain
by_n['44']['verses'].append({
    'number': '',
    'isChorus': 'True',
    'text': ("Then sings my soul, my Savior God, to thee:\n"
             "how great thou art, how great thou art!\n"
             "Then sings my soul, my Savior God, to thee:\n"
             "how great thou art, how great thou art!"),
})

# #125: replace with the proper 2 stanzas
by_n['125']['verses'] = [
    {'number': '1', 'isChorus': 'False', 'text': (
        "Let all things now living a song of thanksgiving\n"
        "to God the Creator triumphantly raise,\n"
        "who fashioned and made us, protected and stayed us,\n"
        "who guides us and leads to the end of our days.\n"
        "His banners are o'er us, his light goes before us,\n"
        "a pillar of fire shining forth in the night,\n"
        "'til shadows have vanished and darkness is banished,\n"
        "as forward we travel from light into light.")},
    {'number': '2', 'isChorus': 'False', 'text': (
        "His law he enforces: the stars in their courses,\n"
        "the sun in its orbit, obediently shine;\n"
        "the hills and the mountains, the rivers and fountains,\n"
        "the deeps of the ocean proclaim him divine.\n"
        "We too should be voicing our love and rejoicing;\n"
        "with glad adoration a song let us raise,\n"
        "'til all things now living unite in thanksgiving:\n"
        "to God in the highest, hosanna and praise!")},
]

# #640: replace with full verse + refrain + bridge
by_n['640']['verses'] = [
    {'number': '1', 'isChorus': 'False', 'text': (
        "How can I say thanks for the things you have done for me?\n"
        "Things so undeserved, yet you gave to prove your love for me;\n"
        "the voices of a million angels could not express my gratitude.\n"
        "All that I am, and ever hope to be, I owe it all to thee.")},
    {'number': '', 'isChorus': 'True', 'text': (
        "To God be the glory for the things he has done.\n"
        "With his blood he has saved me; with his pow'r he has raised me;\n"
        "to God be the glory for the things he has done.")},
    {'number': '2', 'isChorus': 'False', 'text': (
        "Just let me live my life — let it be pleasing, Lord, to thee;\n"
        "and if I gain any praise, let it go to Calvary.")},
]

# #680: fix the cut-off refrain
by_n['680']['verses'] = [v for v in by_n['680']['verses'] if v.get('isChorus') != 'True']
by_n['680']['verses'].append({
    'number': '',
    'isChorus': 'True',
    'text': ("Give God first place in your life;\n"
             "give him your joy, give him your sorrow.\n"
             "Give him your talents, your trust, and time,\n"
             "and God will take care of tomorrow."),
})

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print('Patched TH1990 #44, #125, #640, #680')
