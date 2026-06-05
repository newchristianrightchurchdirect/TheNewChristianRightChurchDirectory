"""Manually-transcribed Cantus Christi lyrics from rendered PDF pages."""
import json, os

BASE = r'C:\Users\Dustina\Websites\church-directory'
PATH = os.path.join(BASE, 'public', 'hymnal-data', 'cantus_christi.json')
d = json.load(open(PATH, encoding='utf-8'))
by_n = {str(h['number']): h for h in d['hymns']}

# CC #481 "O Lord, We Praise Thee" (Luther / Gott Sei Gelobet)
by_n['481']['verses'] = [
    {'number': '1', 'isChorus': 'False', 'text': (
        "O Lord, we praise Thee, bless Thee, and adore Thee,\n"
        "In thanksgiving bow before Thee.\n"
        "Thou with Thy body and Thy blood didst nourish\n"
        "Our weak souls that they may flourish.\n"
        "O Lord, have mercy!\n"
        "May Thy body, Lord, born of Mary,\n"
        "That our sins and sorrows did carry,\n"
        "And Thy blood for us plead\n"
        "In all trial, fear, and need: O Lord, have mercy!")},
    {'number': '2', 'isChorus': 'False', 'text': (
        "Thy holy body into death was given,\n"
        "Life to win for us in heaven.\n"
        "No greater love than this to Thee could bind us;\n"
        "May this feast thereof remind us!\n"
        "O Lord, have mercy!\n"
        "Lord, Thy kindness did so constrain Thee\n"
        "That Thy blood should bless and sustain me.\n"
        "All our debt Thou hast paid;\n"
        "Peace with God once more is made: O Lord, have mercy!")},
    {'number': '3', 'isChorus': 'False', 'text': (
        "May God bestow on us His grace and favor\n"
        "To please Him with our behavior\n"
        "And live as brethren here in love and union\n"
        "Nor repent this blessed Communion.\n"
        "O Lord, have mercy!\n"
        "Let not Thy good Spirit forsake us;\n"
        "Grant that heav'nly minded He make us;\n"
        "Give Thy church, Lord, to see\n"
        "Days of peace and unity: O Lord, have mercy!")},
]

# CC #704 "Create in Me a Clean Heart, O God" (Ps. 51:10-12; Freylinghausen 1704)
by_n['704']['verses'] = [
    {'number': '', 'isChorus': 'False', 'text': (
        "Create in me a clean heart, O God;\n"
        "And renew a right spirit within me.\n"
        "Cast me not away from Thy presence;\n"
        "And take not Thy Holy Spirit from me.\n"
        "Restore unto me the joy of Thy salvation;\n"
        "And uphold me with Thy free Spirit.")},
]

# CC #724 "Isaiah, Mighty Seer, in Days of Old" (Jesaja, dem Propheten — Luther 1525)
by_n['724']['verses'] = [
    {'number': '', 'isChorus': 'False', 'text': (
        "Isaiah, mighty seer, in days of old\n"
        "The Lord of all in spirit did behold\n"
        "High on a lofty throne, in splendor bright,\n"
        "With flowing train that filled the Temple quite.\n"
        "Above the throne were stately seraphim;\n"
        "Six wings had they, these messengers of Him.\n"
        "With twain they veiled their faces, as was meet,\n"
        "With twain in rev'rent awe they hid their feet,\n"
        "And with the other twain aloft they soared;\n"
        "One to the other called and praised the Lord:\n"
        "\"Holy is God, the Lord of Sabaoth!\n"
        "Holy is God, the Lord of Sabaoth!\n"
        "Holy is God, the Lord of Sabaoth!\n"
        "Behold, His glory filleth all the earth!\"\n"
        "The beams and lintels trembled at the cry,\n"
        "And clouds of smoke enwrapped the throne on high.")},
]

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print('Patched CC #481, #724')
