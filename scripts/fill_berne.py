import json, shutil, time

path = r'C:/Users/Dustina/Websites/church-directory/public/hymnal-data/confessions.json'
shutil.copy(path, path + f'.bak-{int(time.time())}')

with open(path, encoding='utf-8') as f:
    data = json.load(f)

theses = [
    "The holy Christian Church, whose only Head is Christ, is born of the Word of God, and abides in the same, and listens not to the voice of a stranger.",
    "The Church of Christ makes no laws and commandments without the Word of God; hence all human traditions are not binding upon us except so far as they are grounded upon or prescribed by the Word of God.",
    "Christ is the only wisdom, righteousness, redemption, and satisfaction for the sins of the whole world; hence to confess any other ground of salvation, or satisfaction for sins, is to deny Christ.",
    "The essential and corporal presence of the body and the blood of Christ cannot be demonstrated from the Holy Scripture.",
    "The Mass, as now in use, in which Christ is offered to God the Father for the sins of the living and the dead, is contrary to the Scripture, a blasphemy against the most holy sacrifice, passion, and death of Christ, and on account of its abuses an abomination before God.",
    "As Christ alone died for us, so He is also to be adored as the only Mediator and Advocate between God the Father and the believers. Therefore it is contrary to the Word of God to propose and invoke other mediators.",
    "Scripture knows nothing of a purgatory after this life. Hence all masses and other offices for the dead are useless.",
    "The worship of images is contrary to Scripture. Therefore images should be abolished when they are set up as objects of adoration.",
    "Matrimony is not forbidden in the Scripture to any class of men, but permitted to all. But all fornication and unchastity are forbidden to clergy and laity alike.",
    "Since, according to Scripture, an open fornicator must be excommunicated, it follows that unchastity and impure celibacy are more pernicious to the clergy than to any other class.",
]

short_titles = [
    "The Church Lives by the Word",
    "No Law Without Scripture",
    "Christ Alone Saves",
    "No Corporal Presence in the Supper",
    "The Mass Repudiated",
    "Christ the Only Mediator",
    "No Purgatory",
    "Image Worship Abolished",
    "Marriage Open to All",
    "Clerical Celibacy Rejected",
]

entries = []
for i, (txt, title) in enumerate(zip(theses, short_titles), start=1):
    entries.append({
        "id": f"thesis-{i}",
        "label": f"Thesis {i}",
        "question": title,
        "answer": txt,
        "proofs": [],
    })

for d in data['documents']:
    if d['id'] == 'berne-theses':
        d['authors'] = ["Berchtold Haller", "Franz Kolb"]
        d['alternativeTitles'] = ["Bernese Theses", "Ten Conclusions of Berne"]
        d['content'] = (
            "The Ten Theses of Berne (also called the Bernese Theses) were "
            "drafted by Berchtold Haller and Franz Kolb, revised by Huldrych "
            "Zwingli, and debated at the Bern Disputation of January 1528. "
            "Their acceptance led to the Reformation of the Canton of Bern.\n\n"
            "English translation by Peter Chapman, licensed under CC BY 4.0."
        )
        d['groups'] = [
            {
                "number": "1",
                "title": "The Ten Theses",
                "entries": entries,
            }
        ]
        print('Updated berne-theses with', len(entries), 'entries.')
        break

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print('Wrote', path)
